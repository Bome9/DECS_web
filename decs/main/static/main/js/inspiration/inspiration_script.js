const gallery = document.getElementById('gallery');
const accessKey = 'qcr8SIfIW9E3qKJDFF1m1b8Z5Phpu97_YnVI2aq7pvk';
let page = 1;

const loadPhotos = () => {
  fetch(`https://api.unsplash.com/photos/random?count=24&query=Art_Design&client_id=${accessKey}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((photo) => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('image');
        imageElement.style.setProperty('--bg', `url(${photo.urls.regular})`);
        gallery.appendChild(imageElement);
      });
      page++;
    })
    .catch((error) => {
      console.error('Ошибка при загрузке изображений:', error);
    });
};


const isAtEndOfPage = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  return scrollY + windowHeight >= bodyHeight;
};

window.addEventListener('scroll', () => {
  if (isAtEndOfPage()) {
    loadPhotos();
  }
});

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

    categoriesButton.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    categoriesDropdown.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}




const profileButton = document.getElementById('profile-button');
const profileDropdown = document.getElementById('profile-dropdown');


profileButton.addEventListener('click', function (event) {
    if (profileDropdown.style.display === 'block') {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.transform = 'translateY(-10px)';
        setTimeout(function () {
            profileDropdown.style.display = 'none';
        }, 300);
    } else {
        profileDropdown.style.display = 'block';
        setTimeout(function () {
            profileDropdown.style.opacity = '1';
            profileDropdown.style.transform = 'translateY(0)';
        }, 0);
    }

    event.stopPropagation();
});


document.addEventListener('click', function () {
    profileDropdown.style.opacity = '0';
    profileDropdown.style.transform = 'translateY(-10px)';
    setTimeout(function () {
        profileDropdown.style.display = 'none';
    }, 300);
});