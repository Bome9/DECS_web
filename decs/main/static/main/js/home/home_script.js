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

    function closePopup() {
        uploadPopup.style.display = "none";
        body.style.overflow = "auto";
        clearImage();
    }


    uploadSubmitBtn.addEventListener("click", function (e) {
        document.getElementById("uploadForm").submit();
    });
});
