
document.addEventListener('DOMContentLoaded', function() {
    // 1. Create the HTML structure for the menu
    const menuHTML = `
        <!-- Menu Hambúrguer -->
        <div class="hamburger-menu">
            <i class="fas fa-bars"></i>
        </div>
        
        <!-- Menu Lateral -->
        <div class="sidebar">
            <div class="sidebar-header">
                <h3><i class="fas fa-hands-praying"></i> Navegação</h3>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li><a href="index.html"><i class="fas fa-home nav-icon"></i> Início</a></li>
                    <li><a href="Cristianismo.html"><i class="fas fa-church nav-icon"></i> Cristianismo</a></li>
                    <li><a href="islamismo.html"><i class="fas fa-mosque nav-icon"></i> Islamismo</a></li>
                    <li><a href="Religião e Independência.html"><i class="fas fa-flag nav-icon"></i> Religião e Independência</a></li>
                    <li><a href="Sincretismo Religioso.html"><i class="fas fa-circle-nodes nav-icon"></i> Sincretismo Religioso</a></li>
                    <li><a href="Guerras Religiosas em Moçambique.html"><i class="fas fa-hand-fist nav-icon"></i> Religião e Conflito</a></li>
                    <li><a href="Mulheres nas Religiões.html"><i class="fas fa-venus nav-icon"></i> Mulheres nas Religiões</a></li>
                    <li><a href="testemunhos.html"><i class="fas fa-comment-dots nav-icon"></i> Testemunhos</a></li>
                    <li><a href="debate.html"><i class="fas fa-bible nav-icon"></i> Debate Bíblico</a></li>
                    <li><a href="estudos.html"><i class="fas fa-book nav-icon"></i> Area de estudos</a></li>
                    <li><a href="Biblioteca Digital.html"><i class="fas fa-book-open nav-icon"></i> Biblioteca</a></li>
                    <li><a href="Distribuição Religiosa em Moçambique.html"><i class="fas fa-map-marked-alt nav-icon"></i> Mapas Interativos</a></li>
                    <li><a href="sobre.html"><i class="fas fa-info-circle nav-icon"></i> Sobre o Projeto</a></li>
                    <li><a href="contato.html"><i class="fas fa-envelope nav-icon"></i> Contato</a></li>
                    <li><a href="denuncia.html" style="color: #e63946; font-weight: bold;"><i class="fas fa-user-secret nav-icon"></i> Canal de Denúncia</a></li>
                    <li><a href="update.html"><i class="fas fa-code-branch nav-icon"></i> Versão</a></li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                Um País Muitas Crenças © 2025
            </div>
        </div>
        
        <!-- Overlay para fechar o menu -->
        <div class="overlay"></div>
    `;

    // 2. Inject the HTML into the body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    // 3. Get references to the newly created elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    let isMenuOpen = false;

    // 4. Add the event listener logic
    function openMenu() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        if (hamburgerMenu) {
            const icon = hamburgerMenu.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-bars', 'fa-times');
            }
        }
        isMenuOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        if (hamburgerMenu) {
            const icon = hamburgerMenu.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
        isMenuOpen = false;
        document.body.style.overflow = '';
    }
    
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // No need to close menu for external links, browser will navigate away
            if (link.getAttribute('href').startsWith('#')) {
                closeMenu();
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Highlight active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const activeLink = Array.from(sidebarLinks).find(link => link.getAttribute('href') === currentPage);

    if (currentPage === '' || currentPage === 'index.html') {
         document.querySelector('.sidebar-nav a[href="index.html"]').classList.add('active');
    } else if (activeLink) {
        activeLink.classList.add('active');
        // Special style for the denuncia link if it's active
        if (activeLink.getAttribute('href') === 'denuncia.html') {
            activeLink.style.color = '#c82333';
            activeLink.style.fontWeight = 'bold';
        }
    }
});
