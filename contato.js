
const form = document.getElementById('contatoForm');
const feedbackDiv = document.getElementById('form-feedback');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('.btn-submit-contato');
    
    feedbackDiv.textContent = '';
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A Enviar...';
    submitButton.disabled = true;

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            feedbackDiv.textContent = 'Obrigado! A sua mensagem foi enviada com sucesso.';
            feedbackDiv.style.color = '#16a085';
            form.reset();
        } else {
            throw new Error('Falha no envio do formulário.');
        }
    })
    .catch(error => {
        feedbackDiv.textContent = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
        feedbackDiv.style.color = '#c0392b';
        console.error(error);
    })
    .finally(() => {
        submitButton.innerHTML = 'Enviar Mensagem';
        submitButton.disabled = false;
    });
});
