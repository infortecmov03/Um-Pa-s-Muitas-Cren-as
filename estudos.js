document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('no-results');
    
    // Seleciona TODOS os elementos que podem ser filtrados.
    const allSearchableItems = document.querySelectorAll('.card-estudo, .card-religiao, .analysis-item, .special-report');

    // Função que garante que um elemento está visível.
    const show = (element) => {
        if (element) element.style.display = ''; // Reseta para o display padrão do CSS
    };

    // Função que esconde um elemento.
    const hide = (element) => {
        if (element) element.style.display = 'none';
    };

    // Garante que tudo começa visível.
    allSearchableItems.forEach(show);
    hide(noResults);

    // Função de filtragem principal.
    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let itemsFound = 0;

        allSearchableItems.forEach(item => {
            const tags = item.dataset.tags || '';
            const textContent = item.textContent.toLowerCase();
            const isMatch = textContent.includes(searchTerm) || tags.toLowerCase().includes(searchTerm);

            if (isMatch) {
                show(item);
                itemsFound++;
            } else {
                hide(item);
            }
        });

        // Mostra ou esconde a mensagem de "nenhum resultado".
        if (itemsFound > 0) {
            hide(noResults);
        } else {
            show(noResults);
        }
        
        // Lógica para esconder os títulos das secções se estiverem vazias.
        document.querySelectorAll('.section-title').forEach(title => {
            const sectionContainer = title.nextElementSibling;
            if (sectionContainer) {
                // Procura por itens visíveis DENTRO da secção.
                const visibleItemsInSection = sectionContainer.querySelectorAll('.card-estudo:not([style*="display: none"]), .card-religiao:not([style*="display: none"]), .analysis-item:not([style*="display: none"]), .special-report:not([style*="display: none"])');
                
                if(visibleItemsInSection.length > 0) {
                    show(title);
                    show(title.nextElementSibling); // Mostra o subtítulo também
                } else {
                    hide(title);
                    hide(title.nextElementSibling); // Esconde o subtítulo também
                }
            }
        });
    };

    searchInput.addEventListener('keyup', handleSearch);
});
