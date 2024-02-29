document.addEventListener("DOMContentLoaded", function () {
    const downloadButtons = document.querySelectorAll('.downloadBtn');

    downloadButtons.forEach(function(button) {
        button.addEventListener('click', function () {
            const publication = button.closest('.publication');
            const imgSrc = publication.querySelector('.img-overlay img').src;
            const downloadLink = document.createElement('a');

            downloadLink.href = imgSrc;
            downloadLink.download = 'downloaded_image.jpg';

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    });


    document.querySelectorAll('.like-btn').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault(); // Предотвращаем переход по ссылке

            const postId = item.dataset.postId; // Получаем ID поста из атрибута data-post-id
            likePost(postId); // Вызываем функцию для отправки запроса на сервер
        });
    });

        // Функция для отправки асинхронного запроса на сервер
    function likePost(postId) {
        fetch(`/like_post?post_id=${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' // Этот заголовок указывает Django, что это AJAX-запрос
            }
        })
        .then(response => response.json())
        .then(data => {
                // Обновляем количество лайков на странице
            document.getElementById(`likes-count-${postId}`).innerText = data.num_of_likes;
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }})


