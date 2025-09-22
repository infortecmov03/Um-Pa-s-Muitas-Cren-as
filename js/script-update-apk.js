// Configurações do GitHub para APK
        const GITHUB_CONFIG = {
            username: 'infortecmov03',
            repository: 'Um-Pa-s-Muitas-Cren-as',
            branch: 'main',
            apkFolder: 'apk',
            manifestFile: 'apk_manifest.json'
        };

        // Estado do atualizador
        let apkState = {
            currentVersion: '1.0.0',
            availableVersion: null,
            updateAvailable: false,
            isOnline: navigator.onLine,
            apkDownloaded: false,
            downloadedAPKPath: null
        };

        // Inicializar quando o DOM estiver pronto
        document.addEventListener('DOMContentLoaded', function() {
            initializeAPKUpdater();
        });

        // Inicializar o sistema de atualização
        async function initializeAPKUpdater() {
            await loadCurrentAPKVersion();
            setupNetworkListeners();
            
            if (apkState.isOnline) {
                setTimeout(() => checkForAPKUpdates(), 3000); // Verificar após 3 segundos
            }
            
            updateUI();
        }

        // Carregar versão atual do APK
        async function loadCurrentAPKVersion() {
            try {
                const savedVersion = localStorage.getItem('apkCurrentVersion');
                if (savedVersion) {
                    apkState.currentVersion = savedVersion;
                } else {
                    // Tentar detectar automaticamente
                    if (window.cordova && cordova.getAppVersion) {
                        cordova.getAppVersion.getVersionNumber().then(function(version) {
                            apkState.currentVersion = version;
                            localStorage.setItem('apkCurrentVersion', version);
                            updateUI();
                        });
                    }
                }
            } catch (error) {
                console.log('Erro ao carregar versão:', error);
            }
        }

        // Verificar atualizações
        async function checkForAPKUpdates() {
            if (!apkState.isOnline) {
                showAlert('Sem conexão com a internet', 'error');
                return;
            }

            showAlert('Verificando atualizações...', 'info');
            setAPKStatus('Verificando...');

            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.apkFolder}/${GITHUB_CONFIG.manifestFile}`
                );

                if (!response.ok) throw new Error('Erro ao buscar informações');

                const manifest = await response.json();
                
                if (compareVersions(manifest.version, apkState.currentVersion) > 0) {
                    apkState.availableVersion = manifest.version;
                    apkState.updateAvailable = true;
                    
                    showAlert(`Nova versão ${manifest.version} disponível!`, 'success');
                    setAPKStatus(`Nova versão: ${manifest.version}`);
                    
                    // Mostrar seção de atualizações
                    document.getElementById('atualizacoes').style.display = 'block';
                    document.getElementById('update-nav-item').style.display = 'block';
                    document.getElementById('apkDownloadBtn').disabled = false;
                } else {
                    showAlert('Seu aplicativo está atualizado', 'info');
                    setAPKStatus('Atualizado');
                }
                
                updateUI();
            } catch (error) {
                showAlert('Erro ao verificar atualizações', 'error');
                setAPKStatus('Erro na verificação');
            }
        }

        // Baixar APK
        async function downloadAPK() {
            if (!apkState.updateAvailable) return;

            showAlert('Iniciando download...', 'info');
            setAPKStatus('Download iniciado...');

            try {
                const manifestResponse = await fetch(
                    `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.apkFolder}/${GITHUB_CONFIG.manifestFile}`
                );
                const manifest = await manifestResponse.json();
                
                const apkUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.apkFolder}/${manifest.filename}`;
                
                const response = await fetch(apkUrl);
                if (!response.ok) throw new Error('Erro no download');

                const contentLength = response.headers.get('content-length');
                const total = parseInt(contentLength, 10);
                let loaded = 0;

                const reader = response.body.getReader();
                const chunks = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    chunks.push(value);
                    loaded += value.length;
                    
                    // Atualizar barra de progresso
                    const progress = (loaded / total) * 100;
                    document.getElementById('apkProgressBar').style.width = `${progress}%`;
                    setAPKStatus(`Download: ${Math.round(progress)}%`);
                }

                // Finalizar download
                const blob = new Blob(chunks, { type: 'application/vnd.android.package-archive' });
                apkState.downloadedAPKPath = URL.createObjectURL(blob);
                apkState.apkDownloaded = true;

                document.getElementById('apkInstallBtn').disabled = false;
                document.getElementById('apkDownloadBtn').disabled = true;
                
                showAlert('Download concluído! Pronto para instalar.', 'success');
                setAPKStatus('Download concluído');

            } catch (error) {
                showAlert('Erro no download: ' + error.message, 'error');
                setAPKStatus('Erro no download');
            }
        }

        // Instalar APK
        function installAPK() {
            if (!apkState.apkDownloaded) return;

            if (confirm(`Instalar versão ${apkState.availableVersion}?`)) {
                if (isAndroid()) {
                    // Tentar instalação automática no Android
                    const link = document.createElement('a');
                    link.href = apkState.downloadedAPKPath;
                    link.download = `UmPaisMuitasCrencas-${apkState.availableVersion}.apk`;
                    link.click();
                    
                    showAlert('APK baixado. Abra o arquivo para instalar.', 'info');
                } else {
                    // Download tradicional para outros dispositivos
                    const link = document.createElement('a');
                    link.href = apkState.downloadedAPKPath;
                    link.download = `UmPaisMuitasCrencas-${apkState.availableVersion}.apk`;
                    link.click();
                    
                    showAlert('APK baixado. Instale manualmente.', 'info');
                }
            }
        }

        // Funções auxiliares
        function compareVersions(v1, v2) {
            const parts1 = v1.split('.').map(Number);
            const parts2 = v2.split('.').map(Number);
            
            for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
                const part1 = parts1[i] || 0;
                const part2 = parts2[i] || 0;
                if (part1 > part2) return 1;
                if (part1 < part2) return -1;
            }
            return 0;
        }

        function isAndroid() {
            return /android/i.test(navigator.userAgent);
        }

        function setAPKStatus(message) {
            document.getElementById('apkStatus').textContent = message;
            document.getElementById('miniStatus').textContent = message;
        }

        function showAlert(message, type) {
            const alert = document.getElementById('apkAlert');
            const alertText = document.getElementById('apkAlertText');
            
            alertText.textContent = message;
            alert.style.display = 'block';
            
            // Cor baseada no tipo
            const colors = {
                info: '#fff3cd',
                success: '#d4edda',
                error: '#f8d7da'
            };
            alert.style.background = colors[type] || colors.info;
        }

        function showUpdateSection() {
            document.getElementById('atualizacoes').scrollIntoView({ behavior: 'smooth' });
        }

        function setupNetworkListeners() {
            window.addEventListener('online', () => {
                apkState.isOnline = true;
                checkForAPKUpdates();
            });

            window.addEventListener('offline', () => {
                apkState.isOnline = false;
                setAPKStatus('Offline');
            });
        }

        function updateUI() {
            document.getElementById('apkCurrentVersion').textContent = apkState.currentVersion;
            document.getElementById('apkAvailableVersion').textContent = 
                apkState.availableVersion || 'Nenhuma';
                
            // Mostrar/ocultar mini atualizador
            document.getElementById('miniUpdater').classList.toggle('active', 
                apkState.updateAvailable || !apkState.isOnline);
        }
