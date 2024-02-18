const textarea = document.getElementById('comment');
const clearButton = document.querySelector('.clear__button')


textarea.addEventListener('input', function() {
    const { scrollHeight, clientHeight } = this;

    if (scrollHeight > clientHeight) {
        this.rows += 1;
        clearButton.style.display = 'block';
    }
    if(this.value===''){
        textarea.rows = 1;
        clearButton.style.display = 'none';
    }
});

clearButton.addEventListener('click', function() {
    textarea.value = '';
    textarea.rows = 1;
    clearButton.style.display = 'none';
});

textarea.addEventListener('focus', function() {
    clearButton.style.display = 'block';
});

clearButton.addEventListener('click', function() {
    clearButton.style.display = 'none';
});


const image = document.querySelector('.fullscreen-image');

image.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (image.requestFullscreen) {
            image.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}