// Dados dos livros (substitua com seus próprios dados e links do Google Drive)
const booksData = [
    {
        id: 1,
        title: "Cristianismo em Moçambique: História e Influência",
        author: "Por João M. Silva",
        description: "Uma análise profunda da chegada e desenvolvimento do Cristianismo em Moçambique, desde os primeiros missionários até os dias atuais.",
        category: "cristianismo",
        size: "5.2MB",
        rating: 4.8,
        cover: "https://via.placeholder.com/250x350/4CAF50/FFFFFF?text=Cristianismo+em+Moçambique",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: false
    },
    {
        id: 2,
        title: "Islão na Costa Suaíli: A Presença em Moçambique",
        author: "Por Amina Saleh",
        description: "Estudo detalhado sobre a história do Islão nas regiões costeiras de Moçambique e sua influência na cultura e sociedade local.",
        category: "islamismo",
        size: "4.7MB",
        rating: 4.6,
        cover: "https://via.placeholder.com/250x350/2196F3/FFFFFF?text=Islão+na+Costa+Suaíli",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: false
    },
    {
        id: 3,
        title: "Religiões Tradicionais Africanas em Moçambique",
        author: "Por Carlos Ngunga",
        description: "Exploração das crenças, rituais e práticas das religiões tradicionais africanas nas diferentes etnias moçambicanas.",
        category: "tradicionais",
        size: "6.1MB",
        rating: 4.9,
        cover: "https://via.placeholder.com/250x350/FF9800/FFFFFF?text=Religiões+Tradicionais+Africanas",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: false
    },
    {
        id: 4,
        title: "Religiões Minoritárias em Moçambique",
        author: "Por Maria José & Hassan Farouk",
        description: "Panorama das religiões com menor expressão demográfica em Moçambique, incluindo Hinduísmo, Judaísmo e Fé Bahá'í.",
        category: "outras",
        size: "3.8MB",
        rating: 4.5,
        cover: "https://via.placeholder.com/250x350/9C27B0/FFFFFF?text=Religiões+Minoritárias+em+Moçambique",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: false
    },
    {
        id: 5,
        title: "Igrejas Independentes Africanas: O Caso de Moçambique",
        author: "Por Eduardo Mondlane Jr.",
        description: "Análise do surgimento e crescimento das igrejas independentes de matriz africana no contexto moçambicano.",
        category: "cristianismo",
        size: "4.2MB",
        rating: 4.7,
        cover: "https://via.placeholder.com/250x350/4CAF50/FFFFFF?text=Igrejas+Independentes+Africanas",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: false
    },
    {
        id: 6,
        title: "Islão no Norte de Moçambique: Tradição e Modernidade",
        author: "Por Abdul Kamal",
        description: "Estudo sobre as comunidades islâmicas nas províncias do norte de Moçambique e sua adaptação aos tempos modernos.",
        category: "islamismo",
        size: "5.5MB",
        rating: 4.8,
        cover: "https://via.placeholder.com/250x350/2196F3/FFFFFF?text=Islão+no+Norte+de+Moçambique",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: false
    },
    {
        id: 7,
        title: "Ritos de Iniciação nas Culturas Moçambicanas",
        author: "Por Luisa Chivite",
        description: "Análise comparativa dos ritos de passagem em diferentes grupos étnicos de Moçambique e seu significado cultural e espiritual.",
        category: "tradicionais",
        size: "7.2MB",
        rating: 5.0,
        cover: "https://via.placeholder.com/250x350/FF9800/FFFFFF?text=Ritos+de+Iniciação",
        downloadUrl: "https://drive.google.com/uc?export=download&id=SEU_ID_DO_DRIVE_AQUI",
        featured: true
    },
    {
        id: 8,
        title: "Sincretismo Religioso em Moçambique",
        author: "Por Ana Muchanga",
        description: "Estudo sobre a mistura de elementos de diferentes tradições religiosas na prática espiritual dos moçambicanos.",
        category: "outras",
        size: "4.9MB",
        rating: 4.9,
        cover: "https://via.placeholder.com/250x350/9C27B0/FFFFFF?text=Sincretismo+Religioso",
        downloadUrl: "https://drive.google.com/file/d/12vRvnD6FfmoEsTk2MVO8R76XOaRJZaTh/view?usp=sharing",
        featured: true
    }
];

// Categorias para os filtros
const categories = {
    'all': 'Todos',
    'cristianismo': 'Cristianismo',
    'islamismo': 'Islamismo',
    'tradicionais': 'Tradicionais',
    'outras': 'Outras'
};

// Estado da aplicação
let currentFilter = 'all';
let currentSearch = '';

// Helper: normalize text (remove accents) for accent-insensitive search
function normalizeText(str) {
    const s = str == null ? '' : String(str);
    // Use Unicode property escape when available, fallback to common diacritic range otherwise
    try {
        return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    } catch (e) {
        // Fallback for environments that don't support \p{Diacritic}
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderBooks();
    setupEventListeners();
    initializeAnimations();
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            
            currentFilter = button.getAttribute('data-filter');
            renderBooks();
        });
    });
    
    // Modal de download
    const modal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        showNotification(`Obrigado por se inscrever com o email: ${email}. Você receberá notificações sobre novas publicações.`, 'success');
        newsletterForm.reset();
    });
    
    // Busca
    const searchForm = document.querySelector('.search-box');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = searchForm.querySelector('input');
        currentSearch = normalizeText(searchInput.value.trim());
        renderBooks();
    });

    // Live search while typing (more responsive)
    const searchInputLive = document.querySelector('.search-box input');
    if (searchInputLive) {
        searchInputLive.addEventListener('input', (e) => {
            currentSearch = normalizeText(e.target.value.trim());
            renderBooks();
        });
    }
    
    // Limpar busca
    const clearSearchBtn = document.getElementById('clearSearch');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-box input');
            searchInput.value = '';
            currentSearch = '';
            renderBooks();
        });
    }
}

// Renderizar livros com base nos filtros atuais
function renderBooks() {
    const booksGrid = document.querySelector('.books-grid');
    const featuredGrid = document.querySelector('.featured-books .books-grid');
    const loadingElement = document.querySelector('.loading');
    
    // Mostrar loading
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    
    // Filtrar livros
    let filteredBooks = booksData.filter(book => {
        const matchesFilter = currentFilter === 'all' || book.category === currentFilter;
        const normalizedTitle = normalizeText(book.title);
        const normalizedAuthor = normalizeText(book.author);
        const normalizedDescription = normalizeText(book.description);
        const matchesSearch = !currentSearch || 
                            normalizedTitle.includes(currentSearch) || 
                            normalizedAuthor.includes(currentSearch) ||
                            normalizedDescription.includes(currentSearch);
        return matchesFilter && matchesSearch;
    });
    
    // Separar livros em destaque
    const featuredBooks = filteredBooks.filter(book => book.featured);
    const regularBooks = filteredBooks.filter(book => !book.featured);
    
    // Limpar grids
    booksGrid.innerHTML = '';
    if (featuredGrid) {
        featuredGrid.innerHTML = '';
    }
    
    // Adicionar mensagem se não houver resultados
    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;"></i>
                <h3>Nenhum livro encontrado</h3>
                <p>Tente ajustar os filtros ou termos de busca.</p>
            </div>
        `;
        
        if (featuredGrid) {
            featuredGrid.innerHTML = '';
        }
        
        // Esconder loading
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        return;
    }
    
    // Renderizar livros regulares
    regularBooks.forEach(book => {
        const bookElement = createBookElement(book);
        booksGrid.appendChild(bookElement);
    });
    
    // Renderizar livros em destaque
    if (featuredBooks.length > 0 && featuredGrid) {
        featuredBooks.forEach(book => {
            const bookElement = createBookElement(book);
            featuredGrid.appendChild(bookElement);
        });
    } else if (featuredGrid) {
        featuredGrid.innerHTML = '';
        document.querySelector('.featured-books').style.display = 'none';
    }
    
    // Esconder loading
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    // Inicializar animações
    initializeBookAnimations();
}

// Criar elemento HTML para um livro
function createBookElement(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-category', book.category);
    bookCard.setAttribute('data-id', book.id);
    
    const categoryName = categories[book.category] || book.category;
    
    bookCard.innerHTML = `
        <div class="book-cover">
            <img src="${book.cover}" alt="Capa do livro: ${book.title}" loading="lazy">
            <span class="category-badge">${categoryName}</span>
        </div>
        <div class="book-info">
            <h3>${book.title}</h3>
            <div class="book-author">${book.author}</div>
            <div class="book-description">
                <p>${book.description}</p>
            </div>
            <div class="book-meta">
                <span><i class="fas fa-file-pdf"></i> PDF, ${book.size}</span>
                <span><i class="fas fa-star"></i> ${book.rating}</span>
            </div>
            <a href="#" class="book-download" data-id="${book.id}">
                <i class="fas fa-download"></i> Baixar Livro
            </a>
        </div>
    `;
    
    // Adicionar evento de download
    const downloadBtn = bookCard.querySelector('.book-download');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showDownloadModal(book);
    });
    
    return bookCard;
}

// Mostrar modal de download
function showDownloadModal(book) {
    const modal = document.getElementById('downloadModal');
    const bookTitle = document.getElementById('bookTitle');
    const confirmDownload = document.getElementById('confirmDownload');
    
    bookTitle.textContent = book.title;
    confirmDownload.setAttribute('href', book.downloadUrl);
    confirmDownload.setAttribute('download', `${book.title.replace(/\s+/g, '_')}.pdf`);
    
    modal.style.display = 'flex';
    
    // Iniciar download automaticamente após 3 segundos
    const timeout = setTimeout(() => {
        confirmDownload.click();
    }, 3000);
    
    // Cancelar download automático se o modal for fechado
    const closeModal = document.querySelector('.close-modal');
    const closeHandler = () => {
        clearTimeout(timeout);
        closeModal.removeEventListener('click', closeHandler);
        window.removeEventListener('click', outsideHandler);
    };
    
    const outsideHandler = (e) => {
        if (e.target === modal) {
            clearTimeout(timeout);
            window.removeEventListener('click', outsideHandler);
            closeModal.removeEventListener('click', closeHandler);
        }
    };
    
    closeModal.addEventListener('click', closeHandler);
    window.addEventListener('click', outsideHandler);
}

// Inicializar animações
function initializeAnimations() {
    initializeBookAnimations();
    window.addEventListener('scroll', animateOnScroll);
}

// Animações para os cards de livro
function initializeBookAnimations() {
    const elements = document.querySelectorAll('.book-card:not(.visible)');
    
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Anima os elementos no scroll
    animateOnScroll();
}

// Animação ao scrollar
function animateOnScroll() {
    const elements = document.querySelectorAll('.book-card:not(.visible)');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="close-notification">&times;</button>
    `;
    
    // Estilos para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Botão de fechar
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Adicionar estilos para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .close-notification {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin: 0;
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #666;
    }
`;
document.head.appendChild(notificationStyles);

// --- PWA: Service Worker registration and update/version checking ---
// Register service worker if supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(reg => {
            console.log('ServiceWorker registered', reg);

            // Listen for updates from the service worker
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // new content available
                        showUpdateNotification();
                    }
                });
            });
        }).catch(err => console.warn('ServiceWorker registration failed:', err));
    });
}

// Periodically check remote version.json to trigger cache update when online
const REMOTE_VERSION_URLS = [
    'https://<your-github-username>.github.io/<repo>/version.json',
    'https://<your-netlify-site>.netlify.app/version.json'
];

async function checkForRemoteVersion() {
    if (!navigator.onLine) return;
    try {
        const responses = await Promise.allSettled(REMOTE_VERSION_URLS.map(u => fetch(u, {cache: 'no-store'})));
        for (const res of responses) {
            if (res.status === 'fulfilled' && res.value.ok) {
                const data = await res.value.json();
                const remoteVersion = data.version;
                const local = await fetch('/version.json', {cache: 'no-store'}).then(r => r.json()).catch(() => null);
                const localVersion = local && local.version ? local.version : null;
                if (remoteVersion && remoteVersion !== localVersion) {
                    // ask service worker to skip waiting and then reload
                    const reg = await navigator.serviceWorker.getRegistration();
                    if (reg && reg.waiting) {
                        reg.waiting.postMessage({type: 'SKIP_WAITING'});
                        showNotification('Nova versão disponível. Reinicie a aplicação para atualizar.', 'success');
                    } else if (reg && reg.installing) {
                        // will become waiting when installed
                        showNotification('Baixando atualização em segundo plano...', 'info');
                    } else {
                        // Force reload to get latest assets
                        showNotification('Atualização encontrada. Recarregando para aplicar.', 'info');
                        window.location.reload(true);
                    }
                    return;
                }
            }
        }
    } catch (e) {
        console.warn('Version check failed', e);
    }
}

// Run check on load and then every 15 minutes
window.addEventListener('load', () => {
    checkForRemoteVersion();
    setInterval(checkForRemoteVersion, 15 * 60 * 1000);
});

function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification update-available';
    notification.innerHTML = `
        <p>Nova versão disponível.</p>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <button id="refreshApp" style="background:#4CAF50;color:#fff;border-radius:4px;padding:8px;border:0;cursor:pointer;">Recarregar</button>
          <button id="dismissUpdate" style="background:#999;color:#fff;border-radius:4px;padding:8px;border:0;cursor:pointer;">Fechar</button>
        </div>
    `;
    document.body.appendChild(notification);

    document.getElementById('refreshApp').addEventListener('click', async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.waiting) {
            reg.waiting.postMessage({type: 'SKIP_WAITING'});
            // Give SW a moment to activate
            setTimeout(() => location.reload(), 500);
        } else {
            location.reload();
        }
    });

    document.getElementById('dismissUpdate').addEventListener('click', () => {
        if (document.body.contains(notification)) document.body.removeChild(notification);
    });
}
