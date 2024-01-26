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

    const publicationImages = document.querySelectorAll('.publication-img.open-fullscreen');
    publicationImages.forEach(function(imageContainer) {
            imageContainer.addEventListener('click', function() {
                openFullscreen(imageContainer.querySelector('img').src);
            });
        });

        function openFullscreen(imageUrl) {
            const overlay = document.createElement('div');
            overlay.classList.add('fullscreen-overlay');

            const img = document.createElement('img');
            img.src = imageUrl;

            const container = document.createElement('div');
            container.classList.add('image-container');
            container.appendChild(img);

            overlay.appendChild(container);
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        }
});


