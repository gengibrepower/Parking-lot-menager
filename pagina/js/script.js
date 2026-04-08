/* ── Hamburguer + Drawer ── */

const menuBtn = document.getElementById('menuBtn');
const drawer  = document.getElementById('drawer');
const header  = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
});

// Fechar drawer ao clicar em link
drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ── Scroll: header + progress bar ── */

const hero          = document.querySelector('.fundo_header');
const scrollBar     = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Header scrolled
    if (hero) {
        const trigger = hero.offsetHeight - 500;
        header.classList.toggle('scrolled', window.scrollY > trigger);
    }

    // Barra de progresso
    const docH    = document.documentElement.scrollHeight - window.innerHeight;
    const percent  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    scrollBar.style.width = percent + '%';
});

// Página sem hero (ex: cadastro.html)
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

/* ── Cursor customizado ── */

const cursor         = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    // Follower com lag suave
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top  = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Esconder cursor ao sair da janela
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}
