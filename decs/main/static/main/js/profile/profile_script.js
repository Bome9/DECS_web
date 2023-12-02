document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.user_bar__nav a');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault(); // предотвращаем стандартное действие
            var targetId = this.getAttribute('href').substring(1); // получаем идентификатор из href
            var targetTab = document.getElementById(targetId);
            hideAllTabs();
            targetTab.style.display = 'flex';
        });
    });

    function hideAllTabs() {
        var tabs = document.querySelectorAll('.profile__bio__info');
        tabs.forEach(function (tab) {
            tab.style.display = 'none';
        });
    }
});
