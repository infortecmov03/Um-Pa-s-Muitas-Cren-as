
document.addEventListener('DOMContentLoaded', function() {
    const botoesDenominacao = document.querySelectorAll('.denominacao-btn');
    const analises = document.querySelectorAll('.secao-analise');
    
    // Inicializar: mostrar apenas análise católica
    analises.forEach((analise, index) => {
        if (index !== 0) {
            analise.style.display = 'none';
        } else {
            analise.classList.add('ativo');
        }
    });
    
    botoesDenominacao.forEach(botao => {
        botao.addEventListener('click', function() {
            // Atualizar botões
            botoesDenominacao.forEach(b => {
                b.classList.remove('ativo');
                b.style.background = 'white';
                b.style.color = getComputedStyle(b).borderColor;
            });
            
            // Ativar botão clicado
            this.classList.add('ativo');
            const denominacao = this.getAttribute('data-denominacao');
            const color = getComputedStyle(this).borderColor;
            
            this.style.background = color;
            this.style.color = 'white';
            
            // Ocultar todas as análises
            analises.forEach(analise => {
                analise.style.display = 'none';
                analise.classList.remove('ativo');
            });
            
            // Mostrar análise correspondente
            const analiseAlvo = document.getElementById(`analise-${denominacao}`);
            if (analiseAlvo) {
                analiseAlvo.style.display = 'block';
                setTimeout(() => {
                    analiseAlvo.classList.add('ativo');
                    analiseAlvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 10);
            }
        });
    });
    
    // Função para expandir conteúdo
    window.expandirConteudo = function(id) {
        const conteudo = document.getElementById(id);
        const btn = event.currentTarget;
        
        if (conteudo.style.display === 'block') {
            conteudo.style.display = 'none';
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> ' + btn.textContent.replace('Ocultar', 'Ver');
        } else {
            conteudo.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-chevron-up"></i> ' + btn.textContent.replace('Ver', 'Ocultar');
            conteudo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    // Suavizar scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar efeito de impressão responsável
    window.addEventListener('beforeprint', function() {
        alert('IMPRIMIR ANÁLISE: Esta análise contém dados atualizados até Dezembro 2024. Por favor, cite a fonte completa.');
    });
});

// Simular carregamento de dados
setTimeout(() => {
    console.log('Análise do Cristianismo em Moçambique carregada com sucesso.');
    console.log('Dados atualizados: Dezembro 2024');
    console.log('Fontes primárias: Censo 2017, MICS 2019, relatórios institucionais');
}, 1000);
