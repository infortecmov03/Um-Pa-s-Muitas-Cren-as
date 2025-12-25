document.addEventListener('DOMContentLoaded', function() {
    // Só executa o script da biblioteca se estivermos na página certa
    if (document.querySelector('.library-section')) {
        initializeApp();
    }
});

function initializeApp() {
    let booksData = []; // Irá armazenar os livros do JSON
    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'default';
    let groupByCategory = true;

    const categories = {
        'cristianismo': 'Cristianismo',
        'islamismo': 'Islamismo',
        'tradicionais': 'Religiões Tradicionais',
        'outras': 'Outros e Sincretismo'
    };

    const booksGrid = document.querySelector('.books-grid');
    const featuredGrid = document.querySelector('.featured-books .books-grid');
    const loadingElement = document.querySelector('.loading');
    const searchInput = document.querySelector('.search-input');
    const clearSearchBtn = document.getElementById('clearSearch');
    const sortSelect = document.getElementById('sortSelect');
    const groupToggle = document.getElementById('groupByCategory');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close-modal');

    async function fetchBooks() {
        loadingElement.style.display = 'block';
        booksGrid.style.display = 'none';
        try {
            const response = await fetch('books.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            booksData = await response.json();
            renderAll();
        } catch (error) {
            console.error('Falha ao carregar os livros:', error);
            loadingElement.textContent = 'Erro ao carregar o acervo. Tente novamente mais tarde.';
        } finally {
            loadingElement.style.display = 'none';
            booksGrid.style.display = 'grid'; // Ou 'block', dependendo do CSS
        }
    }

    function normalizeText(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function renderAll() {
        renderBooks();
        renderFeatured();
    }

    function renderBooks() {
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
            return;
        }

        if (groupByCategory && currentFilter === 'all' && !currentSearch) {
            // 3. Agrupar
            const grouped = filteredBooks.reduce((acc, book) => {
                (acc[book.category] = acc[book.category] || []).push(book);
                return acc;
            }, {});

            Object.keys(grouped).sort().forEach(category => {
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-group-title';
                categoryTitle.textContent = categories[category] || 'Outros';
                booksGrid.appendChild(categoryTitle);
                const categoryGrid = document.createElement('div');
                categoryGrid.className = 'books-grid-inner';
                grouped[category].forEach(book => categoryGrid.appendChild(createBookElement(book)));
                booksGrid.appendChild(categoryGrid);
            });
        } else {
            filteredBooks.forEach(book => booksGrid.appendChild(createBookElement(book)));
        }
    }

    function renderFeatured() {
        const featuredBooks = booksData.filter(book => book.featured);
        featuredGrid.innerHTML = '';
        if (featuredBooks.length > 0) {
            featuredBooks.forEach(book => featuredGrid.appendChild(createBookElement(book)));
            document.querySelector('.featured-books').style.display = 'block';
        } else {
            document.querySelector('.featured-books').style.display = 'none';
        }
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
        document.getElementById('confirmDownload').download = book.title; // Adiciona o atributo de download
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

    // Inicia o carregamento dos dados
    fetchBooks();
}
