// ===== TEMA ESCURO/CLARO =====
const btnTema = document.getElementById('btn-tema');
const iconTema = document.querySelector('.icon-tema');

// Verifica preferência salva
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
    document.body.classList.add('dark-mode');
    iconTema.textContent = '☀️';
}

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        iconTema.textContent = '☀️';
        localStorage.setItem('tema', 'dark');
    } else {
        iconTema.textContent = '🌙';
        localStorage.setItem('tema', 'light');
    }
});

// ===== NAVBAR (MENU HAMBÚRGUER) =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navOverlay = document.getElementById('nav-overlay');

const setMenuOpen = (open) => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (navOverlay) navOverlay.classList.toggle('active', open);
};

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        setMenuOpen(!isOpen);
    });

    // Fecha ao clicar em um link
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    // Fecha ao clicar fora
    if (navOverlay) {
        navOverlay.addEventListener('click', () => setMenuOpen(false));
    }

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
    });

    // Fecha ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) setMenuOpen(false);
    });
}

// ===== MODAL INTERATIVIDADE =====
function abrirModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal ao clicar no overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        const modal = this.parentElement;
        const modalId = modal.id.replace('modal-', '');
        fecharModal(modalId);
    });
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            const modalId = modal.id.replace('modal-', '');
            fecharModal(modalId);
        });
    }
});

// ===== FORM CONTATO (EMAILJS) =====
const formulario = document.getElementById('contact-form');

// EmailJS config
const EMAILJS_PUBLIC_KEY = 'W_Qgp9K-0vtoOzucG';
const EMAILJS_SERVICE_ID = 'service_7ajvvyx';
const EMAILJS_TEMPLATE_ID = 'template_hkin8zx';

const initEmailJs = () => {
    if (!window.emailjs) {
        console.warn('EmailJS SDK não carregou. Verifique o script no index.html.');
        return false;
    }

    try {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        return true;
    } catch (err) {
        console.error('Falha ao inicializar EmailJS:', err);
        return false;
    }
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const resetFieldStyles = (fields) => {
    fields.forEach((field) => {
        field.style.borderColor = '#e0e0e0';
    });
};

if (formulario) {
    initEmailJs();

    formulario.addEventListener('submit', async function (e) {
        e.preventDefault();

        const fields = formulario.querySelectorAll('input:not([type="hidden"]), textarea');
        let isValid = true;

        fields.forEach((field) => {
            const value = (field.value ?? '').trim();

            if (value === '') {
                isValid = false;
                field.style.borderColor = '#dc3545';
                return;
            }

            if (field.type === 'email' && !isValidEmail(value)) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                return;
            }

            field.style.borderColor = '#28a745';
        });

        if (!isValid) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const timeInput = document.getElementById('contact-time');
        if (timeInput) {
            timeInput.value = new Date().toLocaleString('pt-BR');
        }

        const btnSubmit = document.getElementById('contact-submit');
        const originalBtnText = btnSubmit?.textContent;

        if (!window.emailjs) {
            alert('Não foi possível enviar agora (EmailJS não carregou).');
            return;
        }

        try {
            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.textContent = 'Enviando...';
            }

            await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formulario);

            alert('Obrigado! Sua mensagem foi enviada com sucesso!');
            formulario.reset();
            resetFieldStyles(fields);
        } catch (err) {
            console.error('Erro ao enviar email:', err);
            alert('Ops! Não foi possível enviar sua mensagem agora. Tente novamente em instantes.');
        } finally {
            if (btnSubmit) {
                btnSubmit.disabled = false;
                btnSubmit.textContent = originalBtnText || 'Enviar Mensagem';
            }
        }
    });
}

// ===== SCROLL SUAVE (Já está no CSS com scroll-behavior) =====
// Fallback/controle extra para garantir navegação suave por âncoras
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
    });
});

// ===== ANIMAÇÃO AO DESCER A PÁGINA =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa elementos para animação
document.querySelectorAll('.projeto-card, .skill-category, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== BOTÃO VOLTAR AO TOPO =====
const criarBotaoTopo = () => {
    const botaoTopo = document.createElement('button');
    botaoTopo.innerHTML = '↑';
    botaoTopo.className = 'btn-topo';
    botaoTopo.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    `;
    
    document.body.appendChild(botaoTopo);
    
    // Mostra/esconde botão ao rolar
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            botaoTopo.style.display = 'block';
        } else {
            botaoTopo.style.display = 'none';
        }
    });
    
    // Volta ao topo ao clicar
    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efeito hover
    botaoTopo.addEventListener('mouseover', () => {
        botaoTopo.style.transform = 'translateY(-5px)';
        botaoTopo.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.4)';
    });
    
    botaoTopo.addEventListener('mouseout', () => {
        botaoTopo.style.transform = 'translateY(0)';
        botaoTopo.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
    });
};

// Cria botão ao carregar página
document.addEventListener('DOMContentLoaded', criarBotaoTopo);

console.log('Portfólio carregado com sucesso! ✨');
