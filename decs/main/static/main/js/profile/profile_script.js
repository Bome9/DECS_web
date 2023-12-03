document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.user_bar__nav a');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetTab = document.getElementById(targetId);

            hideAllTabs();
            targetTab.classList.add('active');
        });
    });

    function hideAllTabs() {
        var tabs = document.querySelectorAll('.profile__bio__info');
        tabs.forEach(function (tab) {
            tab.classList.remove('active');
        });
    }

    // По умолчанию активируйте первый таб
    document.getElementById('tab_02').classList.add('active');
});
