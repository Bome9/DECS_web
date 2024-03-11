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
            event.preventDefault();

            const postId = item.dataset.postId;
            likePost(postId);
        });
    });

    function likePost(postId) {
        fetch(`/like_post?post_id=${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById(`likes-count-${postId}`).innerText = data.num_of_likes;
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }})


