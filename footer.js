
// footer.js
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerHTML = `
        <footer>
            <div class="container">
                <p class="copyright">© ${currentYear} Um País, Muitas Crenças. Todos os direitos reservados.</p>
            </div>
        </footer>
    `;

    // Injeta o rodapé no final do body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
