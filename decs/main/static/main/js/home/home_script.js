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
    const dropArea = document.getElementById("dropArea");
    const body = document.body;
    const uploadSubmitBtn = document.querySelector(".upload_btn");
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

    dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropArea.classList.add("drag-over");
    });

    dropArea.addEventListener("dragleave", function () {
        dropArea.classList.remove("drag-over");
    });

    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dropArea.classList.remove("drag-over");

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            displayImage(files[0]);
        }
    });

    function closePopup() {
        uploadPopup.style.display = "none";
        body.style.overflow = "auto";
        clearImage();
    }

    function handleFileSelect(event) {
        event.preventDefault();

        const files = event.target.files;
        if (files.length > 0) {
            displayImage(files[0]);
        }
    }

    function displayImage(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.style.width = "100%";
            img.style.height = "100%";
            dropArea.innerHTML = "";
            dropArea.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    function clearImage() {
        dropArea.innerHTML = '<span class="material-icons cloud-upload">cloud_upload</span><p>Перетащите файл сюда</p><p>или</p><input type="file" id="fileInput" /><label for="fileInput" class="choose_file">Выберите файл</label>';

        document.getElementById("fileInput").addEventListener("change", handleFileSelect);
        document.getElementById("fileInput").value = ""; // Clear the input value

        document.getElementById("photoTitle").value = "";
        document.getElementById("photoDescription").value = "";
    }

    document.getElementById("fileInput").addEventListener("change", handleFileSelect);

    uploadSubmitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closePopup();
    });
});
