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

// ===== NAVBAR INTERATIVIDADE =====
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Fecha menu em mobile se estiver aberto
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    });
});

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

// ===== FORM VALIDAÇÃO E ENVIO =====
const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pega os valores do formulário
    const inputs = formulario.querySelectorAll('input, textarea');
    let isValid = true;
    
    // Valida campos
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#28a745';
        }
    });
    
    if (isValid) {
        // Simula envio de mensagem
        alert('Obrigado! Sua mensagem foi enviada com sucesso! 🎉');
        formulario.reset();
        
        // Reseta cores dos inputs
        inputs.forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});

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
