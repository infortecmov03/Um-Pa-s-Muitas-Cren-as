
document.addEventListener('DOMContentLoaded', () => {
    const denunciaForm = document.getElementById('denunciaForm');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('anexos');
    const fileList = document.getElementById('file-list');
    const feedbackDiv = document.getElementById('form-feedback');

    // Abrir o seletor de ficheiros ao clicar na área de upload
    uploadArea.addEventListener('click', () => fileInput.click());

    // Prevenir comportamentos padrão do browser para o drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    // Adicionar feedback visual ao arrastar ficheiros sobre a área
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
    });

    // Lidar com os ficheiros soltos na área
    uploadArea.addEventListener('drop', (e) => {
        fileInput.files = e.dataTransfer.files;
        updateFileList();
    }, false);
    
    // Lidar com os ficheiros selecionados através do clique
    fileInput.addEventListener('change', updateFileList);

    // Função para atualizar a lista de ficheiros visível para o utilizador
    function updateFileList() {
        fileList.innerHTML = ''; // Limpar a lista anterior
        if (fileInput.files.length > 0) {
            const list = document.createElement('ul');
            list.style.listStyleType = 'none';
            list.style.padding = '0';

            Array.from(fileInput.files).forEach(file => {
                const listItem = document.createElement('li');
                listItem.style.marginBottom = '5px';
                listItem.style.color = '#333';
                listItem.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                list.appendChild(listItem);
            });
            fileList.appendChild(list);
        }
    }

    // Intercetar o envio do formulário para o Netlify
    denunciaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(denunciaForm);
        const submitButton = denunciaForm.querySelector('.btn-submit');

        feedbackDiv.textContent = '';
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A Enviar de forma segura...';
        submitButton.disabled = true;

        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                feedbackDiv.innerHTML = '<p style="color: #16a085;"><strong>Denúncia Recebida!</strong><br>A sua submissão foi enviada de forma segura. Agradecemos a sua coragem em partilhar a informação.</p>';
                denunciaForm.reset();
                fileList.innerHTML = '';
            } else {
                 throw new Error('Falha no envio. A resposta do servidor não foi OK.');
            }
        })
        .catch(error => {
            feedbackDiv.innerHTML = '<p style="color: #c0392b;"><strong>Ocorreu um erro.</strong><br>Não foi possível enviar a sua denúncia. Por favor, verifique a sua ligação à internet e tente novamente.</p>';
            console.error('Erro no envio do formulário:', error);
        })
        .finally(() => {
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Denúncia de Forma Segura';
            submitButton.disabled = false;
        });
    });
});
