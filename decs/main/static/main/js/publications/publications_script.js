const gallery = document.getElementById('gallery');
const accessKey = '6wQO4Y0Vab7FB1Xpt31oaJHs3mH5h9itprBc8FKQS5w';
let page = 1; // Номер страницы для загрузки новых фотографий

// Функция для загрузки фотографий из Unsplash API
const loadPhotos = () => {
  fetch(`https://api.unsplash.com/photos/random?count=24&query=Moscow&client_id=${accessKey}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((photo) => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('image');
        imageElement.style.setProperty('--bg', `url(${photo.urls.regular})`);
        gallery.appendChild(imageElement);
      });
      page++; // Увеличиваем номер страницы для следующего запроса
    })
    .catch((error) => {
      console.error('Ошибка при загрузке изображений:', error);
    });
};

// Функция для определения, достигли ли мы конца страницы
const isAtEndOfPage = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  return scrollY + windowHeight >= bodyHeight;
};

// Обработчик события прокрутки страницы
window.addEventListener('scroll', () => {
  if (isAtEndOfPage()) {
    loadPhotos(); // Загрузить новые фотографии при достижении конца страницы
  }
});

// Начальная загрузка фотографий при загрузке страницы
loadPhotos();




const categoriesButton = document.getElementById('categories-button');
const categoriesDropdown = document.getElementById('categories-dropdown');

if (categoriesButton && categoriesDropdown) {
    const arrowIcon = categoriesButton.querySelector('.arrow__icon');
    let isOpen = false;

    categoriesButton.addEventListener('click', function (event) {
        if (isOpen) {
            categoriesDropdown.style.opacity = '0';
            categoriesDropdown.style.transform = 'translateY(-10px)';
            arrowIcon.style.transform = 'rotate(0deg)';
        } else {
            categoriesDropdown.style.display = 'block';
            setTimeout(function () {
                categoriesDropdown.style.opacity = '1';
                categoriesDropdown.style.transform = 'translateY(0)';
            }, 0);
            arrowIcon.style.transform = 'rotate(180deg)';
        }

        isOpen = !isOpen;
        event.stopPropagation();
    });

    document.addEventListener('click', function () {
        categoriesDropdown.style.opacity = '0';
        categoriesDropdown.style.transform = 'translateY(-10px)';
        arrowIcon.style.transform = 'rotate(0deg)';
        isOpen = false;
    });

    // Остановка распространения события для кнопки
    categoriesButton.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Остановка распространения события для меню
    categoriesDropdown.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}




// Находим элементы кнопки и выпадающего меню
const profileButton = document.getElementById('profile-button');
const profileDropdown = document.getElementById('profile-dropdown');

// Добавляем обработчики событий для открытия меню
profileButton.addEventListener('click', function (event) {
    // Переключаем видимость выпадающего меню с анимацией
    if (profileDropdown.style.display === 'block') {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.transform = 'translateY(-10px)';
        setTimeout(function () {
            profileDropdown.style.display = 'none';
        }, 300); // 300 миллисекунд - это время анимации (зависит от CSS-анимации)
    } else {
        profileDropdown.style.display = 'block';
        setTimeout(function () {
            profileDropdown.style.opacity = '1';
            profileDropdown.style.transform = 'translateY(0)';
        }, 0); // Запускаем анимацию после небольшой задержки (0 миллисекунд), чтобы она применилась
    }

    // Остановите распространение события, чтобы оно не достигло документа и не закрыло меню сразу после открытия
    event.stopPropagation();
});

// Добавляем обработчик события клика на документ
document.addEventListener('click', function () {
    // Закрываем меню с анимацией
    profileDropdown.style.opacity = '0';
    profileDropdown.style.transform = 'translateY(-10px)';
    setTimeout(function () {
        profileDropdown.style.display = 'none';
    }, 300); // 300 миллисекунд - это время анимации (зависит от CSS-анимации)
});