// kiosk-start.js — only for index.php (start screen)

// --- Background image slideshow ---
const slides = document.querySelectorAll('.background-slider img');
let current = 0;

if (slides.length > 1) {
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 4000);
}

// --- Tap/click anywhere to go to order type screen ---
const wrap = document.getElementById('kioskWrap');
const flash = document.getElementById('flash');

wrap.addEventListener('click', function (e) {
    // Ripple effect (uses .ripple from style.css)
    const rect = wrap.getBoundingClientRect();
    const size = 120;
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width  = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
    wrap.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Flash white then navigate
    flash.style.opacity = '1';
    setTimeout(() => window.location.href = 'order-type.php', 300);
});