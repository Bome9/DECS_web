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
});
