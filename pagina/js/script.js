/* ── Hamburguer + Drawer ── */

const menuBtn = document.getElementById('menuBtn');
const drawer  = document.getElementById('drawer');
const header  = document.querySelector('.header');

const overlay = document.createElement('div');
overlay.classList.add('drawer-overlay');
document.body.appendChild(overlay);

function openDrawer() {
    menuBtn.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    menuBtn.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});

overlay.addEventListener('click', closeDrawer);

drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

/* ── Scroll: header ── */

const hero = document.querySelector('.fundo_header');

window.addEventListener('scroll', () => {
    if (hero) {
        const trigger = hero.offsetHeight - 500;
        header.classList.toggle('scrolled', window.scrollY > trigger);
    }
});

if (window.location.pathname.includes('cadastro.html')) {
    header.classList.add('scrolled');
}

/* ── Intersection Observer: módulos ── */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.modulo').forEach(m => observer.observe(m));