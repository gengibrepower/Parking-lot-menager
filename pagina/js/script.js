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

/* ── Funcionalidades: slides ── */

const wrapper  = document.querySelector('.funcionalidades-wrapper');
const slides   = document.querySelectorAll('.func-slide');
const dots     = document.querySelectorAll('.func-dot');
const total    = slides.length;
let atual      = 0;
let bloqueado  = false;

function irParaSlide(index) {
    if (index === atual) return;

    slides[atual].classList.remove('ativo');
    slides[atual].classList.add('saindo');
    setTimeout(() => slides[atual].classList.remove('saindo'), 500);
    dots[atual].classList.remove('ativo');

    atual = index;

    slides[atual].classList.add('ativo');
    dots[atual].classList.add('ativo');
}

slides[0].classList.add('ativo');
dots[0].classList.add('ativo');

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        if (!wrapper) return;
        const alturaSlide = (wrapper.offsetHeight - window.innerHeight) / total;
        const topo = wrapper.offsetTop;
        scrollAlvo = topo + i * alturaSlide;
        scrollAlvo = Math.max(0, Math.min(scrollAlvo, document.documentElement.scrollHeight - window.innerHeight));
    });
});

/* ── Scroll suavizado global ── */

let scrollAlvo   = window.scrollY;
let scrollAtual  = window.scrollY;
let headerFixado = false;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (bloqueado) return;

    const forca   = Math.min(Math.abs(e.deltaY), 300);
    const direcao = e.deltaY > 0 ? 1 : -1;
    scrollAlvo += direcao * forca * 1.8;
    scrollAlvo = Math.max(0, Math.min(scrollAlvo, document.documentElement.scrollHeight - window.innerHeight));
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    const delta = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    scrollAlvo += delta * 1.5;
    scrollAlvo = Math.max(0, Math.min(scrollAlvo, document.documentElement.scrollHeight - window.innerHeight));
}, { passive: true });

const hero = document.querySelector('.fundo_header');

function loopScroll() {
    scrollAtual = lerp(scrollAtual, scrollAlvo, 0.08);

    if (Math.abs(scrollAlvo - scrollAtual) > 0.5) {
        window.scrollTo(0, scrollAtual);
    }

    if (!headerFixado && hero) {
        const trigger = hero.offsetHeight - 500;
        if (scrollAtual > trigger) {
            header.classList.add('scrolled');
            headerFixado = true;
        }
    }

    if (wrapper) {
        const rect   = wrapper.getBoundingClientRect();
        const dentro = rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (dentro && !bloqueado) {
            const progresso  = Math.abs(rect.top) / (wrapper.offsetHeight - window.innerHeight);
            const index      = Math.min(Math.floor(progresso * total), total - 1);

            if (index !== atual) {
                // Só avança um slide por vez
                const proximo = index > atual ? atual + 1 : atual - 1;
                bloqueado = true;

                // Trava o scroll no ponto exato do slide atual+1
                const alturaSlide = (wrapper.offsetHeight - window.innerHeight) / total;
                scrollAlvo = wrapper.offsetTop + proximo * alturaSlide;

                irParaSlide(proximo);
                setTimeout(() => { bloqueado = false; }, 800);
            }
        }
    }

    requestAnimationFrame(loopScroll);
}

loopScroll();

/* ── Auth: Modal de Login + localStorage ── */

const loginModal      = document.getElementById('loginModal');
const loginModalClose = document.getElementById('loginModalClose');
const loginModalBtn   = document.getElementById('loginModalBtn');
const loginErro       = document.getElementById('loginErro');
const cadastroArea    = document.getElementById('cadastroArea');

function getUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

function getLogado() {
    return JSON.parse(localStorage.getItem('amps_logado') || 'null');
}

function abrirModal() {
    loginModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('modalEmail').focus(), 350);
}

function fecharModal() {
    loginModal.classList.remove('open');
    document.body.style.overflow = '';
    loginErro.textContent = '';
}

function renderizarHeader() {
    const logado = getLogado();

    if (logado) {
        cadastroArea.innerHTML = `
            <div class="user-pill" tabindex="0">
                <div class="user-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                </div>
                <span class="user-nome">${logado.nome.split(' ')[0]}</span>
                <div class="user-dropdown">
                    <a href="#">Minha conta</a>
                    ${logado.tipoConta === 'p_admin' ? '<a href="/editor">Área do dono</a>' : ''}
                    <button id="logoutBtn">Sair</button>
                </div>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('amps_logado');
            renderizarHeader();
        });
    } else {
        cadastroArea.innerHTML = `
            <a href="#" id="btnAbrirLogin">login</a>
            <a href="cadastro.html">cadastro</a>
        `;
        document.getElementById('btnAbrirLogin').addEventListener('click', (e) => {
            e.preventDefault();
            abrirModal();
        });
    }
}

loginModalClose.addEventListener('click', fecharModal);
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) fecharModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
});

loginModalBtn.addEventListener('click', () => {
    const email = document.getElementById('modalEmail').value.trim();
    const senha = document.getElementById('modalSenha').value;

    if (!email || !senha) {
        loginErro.textContent = 'Preencha e-mail e senha.';
        return;
    }

    const usuarios = getUsuarios();
    const usuario  = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        loginErro.textContent = 'E-mail ou senha incorretos.';
        return;
    }

    localStorage.setItem('amps_logado', JSON.stringify(usuario));
    fecharModal();
    renderizarHeader();
});

['modalEmail', 'modalSenha'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', (e) => {
        if (e.key === 'Enter') loginModalBtn.click();
    });
});

renderizarHeader();