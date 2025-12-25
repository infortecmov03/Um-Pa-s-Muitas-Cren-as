
document.addEventListener("DOMContentLoaded", function() {
    // Define os contentores onde o menu e o rodapé serão carregados.
    const menuContainer = document.getElementById('menu-container');
    const footerContainer = document.getElementById('footer-container');

    // Carrega o menu se o contentor existir.
    if (menuContainer) {
        fetch('menu.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for menu.html');
                }
                return response.text();
            })
            .then(data => {
                menuContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Erro ao carregar o menu:', error);
                menuContainer.innerHTML = '<p style="color:red; text-align:center;">Erro ao carregar o menu. Verifique se o ficheiro menu.html existe.</p>';
            });
    }

    // Carrega o rodapé se o contentor existir.
    if (footerContainer) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for footer.html');
                }
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Erro ao carregar o rodapé:', error);
                footerContainer.innerHTML = '<p style="color:red; text-align:center;">Erro ao carregar o rodapé. Verifique se o ficheiro footer.html existe.</p>';
            });
    }
});
