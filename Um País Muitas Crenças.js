document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const backToTopButton = document.querySelector('.back-to-top');
    
    let isMenuOpen = false;
    
    // Função para abrir o menu
    function openMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        hamburgerMenu.querySelector('i').classList.replace('fa-bars', 'fa-times');
        isMenuOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o menu
    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        hamburgerMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
        isMenuOpen = false;
        document.body.style.overflow = '';
    }
    
    // Alternar entre abrir e fechar o menu
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Event listeners para o menu hambúrguer
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    overlay.addEventListener('click', closeMenu);
    
    // Fechar o menu ao clicar em qualquer link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Fechar o menu com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Mostrar/ocultar botão de voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Voltar ao topo suavemente
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !sidebar.contains(e.target) && e.target !== hamburgerMenu) {
            closeMenu();
        }
    });
    
    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Funcionalidade das abas na seção de tópicos
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove a classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// 1. Desabilitar menu de contexto (clique direito)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Menu de contexto desabilitado para proteção de conteúdo.');
});

// 2. Desabilitar teclas de atalho (F12, Ctrl+Shift+I, Ctrl+U, etc.)
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        alert('Tecla F12 desabilitada para proteção de conteúdo.');
        return false;
    }
    
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        alert('Atalho Ctrl+Shift+I desabilitado para proteção de conteúdo.');
        return false;
    }
    
    // Ctrl+U
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        alert('Atalho Ctrl+U desabilitado para proteção de conteúdo.');
        return false;
    }
    
    // Ctrl+S
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        alert('Atalho Ctrl+S desabilitado para proteção de conteúdo.');
        return false;
    }
});

// 3. Detectar abertura do DevTools (método baseado em diferença de performance)
let devToolsOpen = false;
const threshold = 160;

setInterval(() => {
    const start = performance.now();
    debugger;
    const end = performance.now();
    
    if (end - start > threshold) {
        if (!devToolsOpen) {
            alert('Ferramentas do desenvolvedor detectadas. Esta página não permite inspeção de código.');
            devToolsOpen = true;
        }
    } else {
        devToolsOpen = false;
    }
}, 1000);