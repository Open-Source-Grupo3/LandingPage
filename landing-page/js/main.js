// main.js - PlatoX Landing Page

let currentLang = 'es';

function setLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) {
                    el.textContent = translations[key];
                }
            });

            // Actualizar clase activa en los botones
            document.querySelectorAll('.btn-lang').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`btn-${lang}`).classList.add('active');

            currentLang = lang;
        })
        .catch(error => console.error(`Error cargando ${lang}.json`, error));
}

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);

    document.getElementById("btn-es").addEventListener("click", () => setLanguage("es"));
    document.getElementById("btn-en").addEventListener("click", () => setLanguage("en"));
});