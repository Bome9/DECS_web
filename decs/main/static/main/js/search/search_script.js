document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.search_tabs a');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetTab = document.getElementById(targetId);

            hideAllTabs();
            targetTab.style.display = 'block'; // Показываем выбранный таб
        });
    });

    function hideAllTabs() {
        var tabs = document.querySelectorAll('.tab_results');
        tabs.forEach(function (tab) {
            tab.style.display = 'none'; // Скрываем все табы
        });
    }

    // По умолчанию активируем первый таб
    var defaultTabId = document.querySelector('.search_tabs a').getAttribute('href').substring(1);
    document.getElementById(defaultTabId).style.display = 'block'; // Показываем первый таб
});
