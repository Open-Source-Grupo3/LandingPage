document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const languageToggle = document.getElementById('languageToggle');

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar-container')) {
            navMenu.classList.remove('active');
        }
    });

    let currentLang = localStorage.getItem('lang') || 'en';
    loadLanguage(currentLang);

    languageToggle.addEventListener('click', function (e) {
        e.preventDefault();
        currentLang = currentLang === 'en' ? 'es' : 'en';
        localStorage.setItem('lang', currentLang);
        loadLanguage(currentLang);
    });

    async function loadLanguage(lang) {
        try {
            const res = await fetch(`./locales/${lang}.json`);
            const translations = await res.json();

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) {
                    el.innerHTML = translations[key];
                }
            });

            languageToggle.innerHTML = lang === 'en' ? '<i class="fas fa-globe"></i> ES' : '<i class="fas fa-globe"></i> EN';
            document.documentElement.lang = lang;

        } catch (err) {
            console.error('Error loading language:', err);
        }
    }
});