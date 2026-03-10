// js/kiosk-start.js

// --- Background image slideshow ---
const slides = document.querySelectorAll('.background-slider img');
let current = 0;

if (slides.length > 1) {
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 3000);
}

// --- Language selector ---
const translations = {
    nl: { tap: 'Tik op het scherm om te beginnen' },
    en: { tap: 'Touch screen to start'            },
    de: { tap: 'Bildschirm berühren zum Starten'  }
};

const tapText  = document.getElementById('tapText');
const langBtns = document.querySelectorAll('.lang-btn');

function applyLanguage(lang) {
    const t = translations[lang] || translations.nl;
    tapText.textContent = t.tap;
    langBtns.forEach(btn =>
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang)
    );
}

applyLanguage(sessionStorage.getItem('lang') || 'nl');

langBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        sessionStorage.setItem('lang', lang);
        applyLanguage(lang);
    });
});

// --- Tap anywhere (except flags) to navigate ---
const wrap  = document.getElementById('kioskWrap');
const flash = document.getElementById('flash');

wrap.addEventListener('click', function(e) {
    if (e.target.closest('.lang-btn')) return;

    const rect   = wrap.getBoundingClientRect();
    const size   = 120;
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width  = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
    wrap.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    flash.style.opacity = '1';
    setTimeout(() => window.location.href = 'orders/order-type.php', 300);
});