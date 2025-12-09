
document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos ---
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('no-results');

    // Secção de Destaques
    const destaquesSection = document.getElementById('destaques-grid');
    const cards = destaquesSection.getElementsByClassName('card-estudo');
    const destaquesTitle = document.getElementById('destaques-title');

    // Secção do Índice Completo
    const indiceCompletoSection = document.querySelector('.indice-completo');
    const indiceList = indiceCompletoSection.querySelector('.lista-indice');
    const indiceItems = indiceList.querySelectorAll('li');
    const indiceTitle = indiceCompletoSection.querySelector('.section-title');

    // --- Função de Pesquisa ---
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase().trim();

        // Se a pesquisa estiver vazia, remove todas as classes .is-hidden para restaurar a página
        if (searchTerm === "") {
            destaquesTitle.classList.remove('is-hidden');
            destaquesSection.classList.remove('is-hidden');
            Array.from(cards).forEach(card => card.classList.remove('is-hidden'));
            
            indiceCompletoSection.classList.remove('is-hidden');
            indiceTitle.classList.remove('is-hidden');
            Array.from(indiceItems).forEach(item => item.classList.remove('is-hidden'));
            
            noResults.classList.add('is-hidden');
            return;
        }

        // --- Lógica de Filtragem ---

        // 1. Filtra os cards de destaque
        let foundInDestaques = 0;
        for (const card of cards) {
            const content = (card.textContent + (card.dataset.tags || '')).toLowerCase();
            const isMatch = content.includes(searchTerm);
            card.classList.toggle('is-hidden', !isMatch);
            if (isMatch) {
                foundInDestaques++;
            }
        }

        // 2. Filtra os itens do índice
        let foundInIndice = 0;
        for (const item of indiceItems) {
            const isMatch = item.textContent.toLowerCase().includes(searchTerm);
            item.classList.toggle('is-hidden', !isMatch);
            if (isMatch) {
                foundInIndice++;
            }
        }

        // 3. Atualiza a visibilidade das secções e títulos
        destaquesTitle.classList.toggle('is-hidden', foundInDestaques === 0);
        destaquesSection.classList.toggle('is-hidden', foundInDestaques === 0);
        
        indiceCompletoSection.classList.toggle('is-hidden', foundInIndice === 0);

        // 4. Mostra ou esconde a mensagem de "nenhum resultado"
        const totalFound = foundInDestaques + foundInIndice;
        noResults.classList.toggle('is-hidden', totalFound > 0);
    });
});
