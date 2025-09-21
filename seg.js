 // 1. Desabilitar menu de contexto (clique direito)
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert('Menu de contexto desabilitado para proteção de conteúdo.');
        });
        
        // 2. Desabilitar teclas de atalho (F12, Ctrl+Shift+I, Ctrl+U, etc.)
        document.addEventListener('keydown', function(e) {
            // F12
            if (e.keyCode === 123) {
                e.preventDefault();
                alert('Tecla F12 desabilitada para proteção de conteúdo.');
                return false;
            }
            
            // Ctrl+Shift+I
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                alert('Atalho Ctrl+Shift+I desabilitado para proteção de conteúdo.');
                return false;
            }
            
            // Ctrl+U
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                alert('Atalho Ctrl+U desabilitado para proteção de conteúdo.');
                return false;
            }
            
            // Ctrl+S
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                alert('Atalho Ctrl+S desabilitado para proteção de conteúdo.');
                return false;
            }
        });
        
        // 3. Detectar abertura do DevTools (método baseado em diferença de performance)
        let devToolsOpen = false;
        const threshold = 160;
        
        setInterval(() => {
            const start = performance.now();
            debugger;
            const end = performance.now();
            
            if (end - start > threshold) {
                if (!devToolsOpen) {
                    alert('Ferramentas do desenvolvedor detectadas. Esta página não permite inspeção de código.');
                    devToolsOpen = true;
                }
            } else {
                devToolsOpen = false;
            }
        }, 1000);
        
        