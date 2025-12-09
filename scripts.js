document.addEventListener('DOMContentLoaded', function() {
    // --- Botão Voltar ao Topo ---
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Funcionalidade de Pesquisa (da estudos.html) ---
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const elementsToSearch = document.querySelectorAll('.topic-item, .topic-card');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            elementsToSearch.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // --- Scripts de Proteção de Conteúdo ---
    const isProduction = true; 
    if (isProduction) {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 's')) {
                e.preventDefault();
            }
        });
    }
});

// --- Lógica PWA: Service Worker e Atualizações ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(reg => {
            console.log('ServiceWorker registered', reg);
            // Ouve por atualizações encontradas pelo SW
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // Mostra uma notificação de que há conteúdo novo
                        showUpdateNotification();
                    }
                });
            });
        }).catch(err => console.warn('ServiceWorker registration failed:', err));

        // Lida com mensagens do SW para recarregar a página
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'RELOAD_PAGE') {
                window.location.reload();
            }
        });
    });
}

// Função para mostrar notificação de atualização
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification update-available';
    notification.innerHTML = `
        <p>Uma nova versão do site está disponível.</p>
        <div class="update-actions">
            <button id="refreshApp">Recarregar</button>
            <button id="dismissUpdate">Fechar</button>
        </div>
    `;
    document.body.appendChild(notification);

    document.getElementById('refreshApp').addEventListener('click', () => {
        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg && reg.waiting) {
                reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        });
    });

    document.getElementById('dismissUpdate').addEventListener('click', () => {
        document.body.removeChild(notification);
    });
}
