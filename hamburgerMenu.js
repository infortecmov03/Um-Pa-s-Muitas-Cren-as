 document.addEventListener('DOMContentLoaded', function() {
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.overlay');
            const body = document.body;
            const content = document.querySelector('.content');
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            
            let isMenuOpen = false;
            
            // Função para abrir o menu
            function openMenu() {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                hamburgerMenu.querySelector('i').classList.replace('fa-bars', 'fa-times');
                isMenuOpen = true;
                body.classList.add('menu-open');
                
                // Em dispositivos móveis, prevenir scroll do body
                if (window.innerWidth <= 768) {
                    document.body.style.overflow = 'hidden';
                }
            }
            
            // Função para fechar o menu
            function closeMenu() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                hamburgerMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
                isMenuOpen = false;
                body.classList.remove('menu-open');
                
                // Restaurar scroll do body
                document.body.style.overflow = '';
            }
            
            // Função para alternar o menu
            function toggleMenu() {
                if (isMenuOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }
            
            // Event listeners
            hamburgerMenu.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu();
            });
            
            // Fechar menu ao clicar no overlay (apenas mobile)
            overlay.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
            
            // Fechar menu ao clicar em um link
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Em mobile, fechar menu após um delay
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        let targetUrl = this.getAttribute('href');
                        
                        closeMenu();
                        
                        // Navegar para o destino após a transição do menu
                        setTimeout(() => {
                            window.location.href = targetUrl;
                        }, 400);
                    }
                });
            });
            
            // Fechar menu com a tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isMenuOpen) {
                    closeMenu();
                }
            });
            
            // Fechar menu ao clicar fora (apenas para desktop)
            document.addEventListener('click', function(e) {
                if (isMenuOpen && window.innerWidth > 768) {
                    // Verificar se o clique foi fora do menu e do botão hamburguer
                    if (!sidebar.contains(e.target) && e.target !== hamburgerMenu && !hamburgerMenu.contains(e.target)) {
                        closeMenu();
                    }
                }
            });
            
            // Prevenir que cliques dentro do menu fechem-no
            sidebar.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Ajustar comportamento no redimensionamento da janela
            window.addEventListener('resize', function() {
                // Fechar menu se a janela for redimensionada para um tamanho maior
                if (window.innerWidth > 768 && isMenuOpen) {
                    closeMenu();
                }
                
                // Garantir que o overlay não está visível em desktop
                if (window.innerWidth > 768) {
                    overlay.classList.remove('active');
                }
            });
        });