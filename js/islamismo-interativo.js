
// Funcionalidade para bibliografia expansível
document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.querySelector('.btn-expandir-bibliografia');
    const bibliografiaContent = document.querySelector('.conteudo-bibliografia');
    
    if (expandBtn && bibliografiaContent) {
        const chevron = expandBtn.querySelector('.fa-chevron-down');
        
        expandBtn.addEventListener('click', function() {
            const isExpanded = bibliografiaContent.classList.contains('expandido');
            
            if (isExpanded) {
                bibliografiaContent.classList.remove('expandido');
                expandBtn.querySelector('span').textContent = 'Mostrar Bibliografia Completa';
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
                
                // Scroll suave para o topo da bibliografia
                expandBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                bibliografiaContent.classList.add('expandido');
                expandBtn.querySelector('span').textContent = 'Ocultar Bibliografia';
                if (chevron) {
                    chevron.style.transform = 'rotate(180deg)';
                }
            }
        });
    }
    
    // Animar elementos da história ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const historiaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                historiaObserver.unobserve(entry.target); // Opcional: para a animação acontecer apenas uma vez
            }
        });
    }, observerOptions);
    
    // Observar elementos das etapas
    document.querySelectorAll('.etapa-historia').forEach(etapa => {
        etapa.style.opacity = '0';
        etapa.style.transform = 'translateY(20px)';
        etapa.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        historiaObserver.observe(etapa);
    });
    
    // Sistema de citações rápidas
    const citacoes = document.querySelectorAll('.categoria-biblio li');
    citacoes.forEach(citacao => {
        citacao.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) return; // Não fazer nada se clicar num link
            
            const autor = this.querySelector('strong')?.textContent || '';
            const titulo = this.querySelector('span')?.textContent || '';
            
            const citacaoText = `${autor}. ${titulo}`.trim();
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(citacaoText).then(() => {
                    // Feedback visual
                    let feedback = document.querySelector('.citation-feedback');
                    if (!feedback) {
                        feedback = document.createElement('div');
                        feedback.className = 'citation-feedback';
                        document.body.appendChild(feedback);
                    }
                    feedback.textContent = 'Citação copiada!';
                    feedback.classList.add('visible');

                    setTimeout(() => {
                        feedback.classList.remove('visible');
                    }, 2000);
                });
            }
        });
    });

    // Interatividade para os cards de província
    const cards = document.querySelectorAll('.provincia-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expandido');
        });
    });
});

// CSS para animações injetado dinamicamente
const style = document.createElement('style');
style.textContent = `
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
    
    .citation-feedback {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2e8b57;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(120%);
        transition: transform 0.4s ease;
    }

    .citation-feedback.visible {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// PWA Service Worker (deve estar no seu próprio ficheiro, mas por enquanto aqui)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
