document.addEventListener("DOMContentLoaded", function () {

    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
        loop: true,
    });

    const uploadBtn = document.getElementById("uploadBtn");
    const uploadPopup = document.getElementById("uploadPopup");
    const closeBtn = document.getElementById("closeBtn");


    uploadBtn.addEventListener("click", function (e) {
        e.preventDefault();
        uploadPopup.style.display = "flex";
    });

    uploadPopup.addEventListener("click", function (e) {
        if (e.target === uploadPopup || e.target === closeBtn) {
            closePopup();
        }
    });

    function closePopup() {
        uploadPopup.style.display = "none";
        body.style.overflow = "auto";
        clearImage();
    }


    const uploadForm = document.getElementById("uploadForm");
    const errorMessages = document.getElementById("errorMessages");

    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Создаем объект FormData для отправки данных формы на сервер
        const formData = new FormData(uploadForm);

        // Отправляем запрос на сервер с помощью Fetch API
        fetch(uploadForm.action, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json()) // Преобразуем ответ в формат JSON
        .then(data => {
            // Проверяем наличие сообщений об ошибках в ответе от сервера
            if (data.error_messages) {
                // Очищаем поле для сообщений об ошибках
                errorMessages.innerHTML = "";

                // Создаем список сообщений об ошибках и добавляем их на страницу
                const ul = document.createElement("ul");
                data.error_messages.forEach(message => {
                    const li = document.createElement("li");
                    li.textContent = message;
                    ul.appendChild(li);
                });
                errorMessages.appendChild(ul);

                // Показываем поле для сообщений об ошибках
                errorMessages.style.display = "block";
            } else {
                // Если нет сообщений об ошибках, перенаправляем пользователя на другую страницу
                window.location.href = data.redirect_url;
            }
        })
        .catch(error => console.error("Error:", error));
    });




    const usersTab = document.getElementById('usersTab');
    const postsTab = document.getElementById('postsTab');
    const usersContainer = document.getElementById('usersContainer');
    const postsContainer = document.getElementById('postsContainer');

    // По умолчанию скрываем контейнер для работ
    postsContainer.style.display = 'none';

    // Функция для переключения между табами
    function switchTab(tab) {
        if (tab === 'users') {
            usersTab.classList.add('active');
            postsTab.classList.remove('active');
            usersContainer.style.display = 'block';
            postsContainer.style.display = 'none';
        } else if (tab === 'posts') {
            usersTab.classList.remove('active');
            postsTab.classList.add('active');
            usersContainer.style.display = 'none';
            postsContainer.style.display = 'block';
        }
    }

    // Обработчики событий для переключения между табами
    usersTab.addEventListener('click', function() {
        switchTab('users');
    });

    postsTab.addEventListener('click', function() {
        switchTab('posts');
    });
});
