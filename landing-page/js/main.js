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

    // Carrusel automático y manual
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("nextSlide");
    const prevBtn = document.getElementById("prevSlide");

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        currentSlide = index;
    }

    if (slides.length > 0) {
        showSlide(currentSlide);

        setInterval(() => {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }, 5000);

        nextBtn.addEventListener("click", () => {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        });

        prevBtn.addEventListener("click", () => {
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const index = parseInt(dot.getAttribute("data-index"));
                showSlide(index);
            });
        });
    }
});