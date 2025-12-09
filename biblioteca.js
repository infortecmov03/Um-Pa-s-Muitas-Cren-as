// Dados dos livros (idealmente, viria de um JSON)
const booksData = [
    {
        id: 1,
        title: "Cristianismo em Moçambique: História e Influência",
        author: "Por João M. Silva",
        description: "Uma análise profunda da chegada e desenvolvimento do Cristianismo em Moçambique, desde os primeiros missionários até os dias atuais.",
        category: "cristianismo",
        size: "5.2MB",
        rating: 4.8,
        cover: "https://via.placeholder.com/250x350/5E35B1/FFFFFF?text=Cristianismo+em+Moçambique",
        downloadUrl: "#",
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
        cover: "https://via.placeholder.com/250x350/00897B/FFFFFF?text=Islão+na+Costa+Suaíli",
        downloadUrl: "#",
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
        cover: "https://via.placeholder.com/250x350/E65100/FFFFFF?text=Religiões+Tradicionais",
        downloadUrl: "#",
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
        cover: "https://via.placeholder.com/250x350/E65100/FFFFFF?text=Ritos+de+Iniciação",
        downloadUrl: "#",
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
        downloadUrl: "#",
        featured: true
    }
];


document.addEventListener('DOMContentLoaded', function() {
    // Só executa o script da biblioteca se estivermos na página certa
    if (document.querySelector('.library-section')) {
        initializeApp();
    }
});

function initializeApp() {
    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'default';
    let groupByCategory = true;

    const categories = {
        'cristianismo': 'Cristianismo',
        'islamismo': 'Islamismo',
        'tradicionais': 'Tradicionais',
        'outras': 'Outras'
    };

    const booksGrid = document.querySelector('.books-grid');
    const featuredGrid = document.querySelector('.featured-books .books-grid');
    const loadingElement = document.querySelector('.loading');
    const searchInput = document.querySelector('.search-box input');
    const clearSearchBtn = document.getElementById('clearSearch');
    const sortSelect = document.getElementById('sortSelect');
    const groupToggle = document.getElementById('groupByCategory');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close-modal');
    const newsletterForm = document.querySelector('.newsletter-form');

    function normalizeText(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function renderBooks() {
        loadingElement.style.display = 'block';

        // 1. Filtrar
        let filteredBooks = booksData.filter(book => {
            const matchesFilter = currentFilter === 'all' || book.category === currentFilter;
            const matchesSearch = !currentSearch || 
                                normalizeText(book.title).includes(currentSearch) || 
                                normalizeText(book.author).includes(currentSearch) || 
                                normalizeText(book.description).includes(currentSearch);
            return matchesFilter && matchesSearch;
        });

        // 2. Ordenar
        if (currentSort === 'title') {
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (currentSort === 'author') {
            filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
        } else if (currentSort === 'rating') {
            filteredBooks.sort((a, b) => b.rating - a.rating);
        }

        booksGrid.innerHTML = '';

        if (filteredBooks.length === 0) {
            booksGrid.innerHTML = `<div class="no-results"><h3>Nenhum livro encontrado</h3><p>Tente ajustar os filtros ou a busca.</p></div>`;
            loadingElement.style.display = 'none';
            return;
        }

        if (groupByCategory && currentFilter === 'all' && !currentSearch) {
            // 3. Agrupar
            const grouped = filteredBooks.reduce((acc, book) => {
                (acc[book.category] = acc[book.category] || []).push(book);
                return acc;
            }, {});

            Object.keys(grouped).forEach(category => {
                const categoryTitle = document.createElement('h3');
                categoryTitle.className = 'category-group-title';
                categoryTitle.textContent = categories[category] || 'Outros';
                booksGrid.appendChild(categoryTitle);
                grouped[category].forEach(book => booksGrid.appendChild(createBookElement(book)));
            });
        } else {
            // Renderização normal
            filteredBooks.forEach(book => booksGrid.appendChild(createBookElement(book)));
        }

        loadingElement.style.display = 'none';
    }

    function createBookElement(book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover"><img src="${book.cover}" alt="Capa: ${book.title}" loading="lazy"></div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <div class="book-author">${book.author}</div>
                <p class="book-description">${book.description}</p>
                <div class="book-meta">
                    <span><i class="fas fa-file-pdf"></i> ${book.size}</span>
                    <span><i class="fas fa-star"></i> ${book.rating}</span>
                </div>
                <a href="#" class="book-download" data-id="${book.id}"><i class="fas fa-download"></i> Baixar</a>
            </div>
        `;
        bookCard.querySelector('.book-download').addEventListener('click', (e) => {
            e.preventDefault();
            showDownloadModal(book);
        });
        return bookCard;
    }

    function showDownloadModal(book) {
        document.getElementById('bookTitle').textContent = book.title;
        document.getElementById('confirmDownload').href = book.downloadUrl;
        modal.style.display = 'flex';
    }

    // Event Listeners
    filterButtons.forEach(button => button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        renderBooks();
    }));

    searchInput.addEventListener('input', () => {
        currentSearch = normalizeText(searchInput.value);
        renderBooks();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        renderBooks();
    });

    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderBooks();
    });

    groupToggle.addEventListener('change', () => {
        groupByCategory = groupToggle.checked;
        renderBooks();
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aqui iria a lógica de notificação
        newsletterForm.reset();
        alert('Obrigado por se inscrever!');
    });

    // Renderização inicial
    renderBooks();
}
