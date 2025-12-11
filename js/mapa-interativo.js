
// Inicialização do mapa de Moçambique
document.addEventListener('DOMContentLoaded', function() {
    // Coordenadas centrais de Moçambique
    const mapCenter = [-18.6657, 35.5296];
    const mapZoom = 5.5;
    
    // Inicializar o mapa
    const map = L.map('map').setView(mapCenter, mapZoom);
    
    // Adicionar camada de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Moçambique',
        maxZoom: 10,
        minZoom: 4
    }).addTo(map);
    
    // Dados das províncias de Moçambique
    const provinceData = [
        {
            name: "Maputo (Cidade)",
            shortName: "MPM",
            coordinates: [-25.9692, 32.5732],
            capital: "Maputo",
            population: "1.2 milhões",
            area: "347 km²",
            religions: [
                {name: "Cristianismo", percentage: 75, color: "#4CAF50"},
                {name: "Islã", percentage: 15, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 5, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 4, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Capital do país com maior diversidade religiosa."
        },
        {
            name: "Maputo (Província)",
            shortName: "MPT",
            coordinates: [-25.3833, 32.3333],
            capital: "Matola",
            population: "2.5 milhões",
            area: "22.693 km²",
            religions: [
                {name: "Cristianismo", percentage: 70, color: "#4CAF50"},
                {name: "Islã", percentage: 18, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 8, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 3, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Província com forte influência cristã e islâmica."
        },
        {
            name: "Gaza",
            shortName: "G",
            coordinates: [-23.0222, 32.7181],
            capital: "Xai-Xai",
            population: "1.5 milhões",
            area: "75.709 km²",
            religions: [
                {name: "Cristianismo", percentage: 65, color: "#4CAF50"},
                {name: "Islã", percentage: 20, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 12, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 2, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Predominância cristã com significativa presença islâmica."
        },
        {
            name: "Inhambane",
            shortName: "I",
            coordinates: [-23.8650, 35.3833],
            capital: "Inhambane",
            population: "1.6 milhões",
            area: "68.615 km²",
            religions: [
                {name: "Cristianismo", percentage: 60, color: "#4CAF50"},
                {name: "Islã", percentage: 25, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 12, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 2, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Região costeira com influência islâmica significativa."
        },
        {
            name: "Sofala",
            shortName: "S",
            coordinates: [-19.2033, 34.8625],
            capital: "Beira",
            population: "2.3 milhões",
            area: "68.018 km²",
            religions: [
                {name: "Cristianismo", percentage: 58, color: "#4CAF50"},
                {name: "Islã", percentage: 22, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 15, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 3, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 2, color: "#F44336"}
            ],
            description: "Diversidade religiosa equilibrada entre cristianismo e crenças tradicionais."
        },
        {
            name: "Manica",
            shortName: "M",
            coordinates: [-19.5057, 33.2567],
            capital: "Chimoio",
            population: "2.1 milhões",
            area: "61.661 km²",
            religions: [
                {name: "Cristianismo", percentage: 55, color: "#4CAF50"},
                {name: "Crenças Tradicionais", percentage: 30, color: "#FF9800"},
                {name: "Islã", percentage: 10, color: "#2196F3"},
                {name: "Outras Religiões", percentage: 3, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 2, color: "#F44336"}
            ],
            description: "Forte presença de crenças tradicionais africanas."
        },
        {
            name: "Tete",
            shortName: "T",
            coordinates: [-16.1564, 33.5864],
            capital: "Tete",
            population: "2.8 milhões",
            area: "100.724 km²",
            religions: [
                {name: "Cristianismo", percentage: 50, color: "#4CAF50"},
                {name: "Crenças Tradicionais", percentage: 40, color: "#FF9800"},
                {name: "Islã", percentage: 7, color: "#2196F3"},
                {name: "Outras Religiões", percentage: 2, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Alta proporção de praticantes de crenças tradicionais."
        },
        {
            name: "Zambézia",
            shortName: "Z",
            coordinates: [-16.8397, 36.8217],
            capital: "Quelimane",
            population: "5.1 milhões",
            area: "103.478 km²",
            religions: [
                {name: "Cristianismo", percentage: 45, color: "#4CAF50"},
                {name: "Islã", percentage: 35, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 17, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 2, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Província mais populosa com diversidade religiosa acentuada."
        },
        {
            name: "Nampula",
            shortName: "N",
            coordinates: [-15.1167, 39.2667],
            capital: "Nampula",
            population: "6.1 milhões",
            area: "81.606 km²",
            religions: [
                {name: "Islã", percentage: 60, color: "#2196F3"},
                {name: "Cristianismo", percentage: 35, color: "#4CAF50"},
                {name: "Crenças Tradicionais", percentage: 3, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 1, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Única província com maioria islâmica em Moçambique."
        },
        {
            name: "Cabo Delgado",
            shortName: "CD",
            coordinates: [-12.9608, 40.5078],
            capital: "Pemba",
            population: "2.9 milhões",
            area: "82.625 km²",
            religions: [
                {name: "Islã", percentage: 55, color: "#2196F3"},
                {name: "Cristianismo", percentage: 40, color: "#4CAF50"},
                {name: "Crenças Tradicionais", percentage: 3, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 1, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Região norte com forte presença islâmica."
        },
        {
            name: "Niassa",
            shortName: "NS",
            coordinates: [-13.2933, 36.0542],
            capital: "Lichinga",
            population: "1.9 milhões",
            area: "129.056 km²",
            religions: [
                {name: "Cristianismo", percentage: 50, color: "#4CAF50"},
                {name: "Islã", percentage: 25, color: "#2196F3"},
                {name: "Crenças Tradicionais", percentage: 22, color: "#FF9800"},
                {name: "Outras Religiões", percentage: 2, color: "#9C27B0"},
                {name: "Sem Religião", percentage: 1, color: "#F44336"}
            ],
            description: "Província menos densamente povoada com diversidade religiosa."
        }
    ];
    
    // Array para armazenar os marcadores
    const markers = [];
    
    // Adicionar marcadores para cada província
    provinceData.forEach(province => {
        // Determinar a religião predominante
        const dominantReligion = province.religions.reduce((prev, current) => 
            (prev.percentage > current.percentage) ? prev : current
        );
        
        // Criar marcador personalizado com ícone
        const markerIcon = L.divIcon({
            html: `
                <div class="custom-marker pulse" style="background-color:${dominantReligion.color};">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
            `,
            className: 'custom-div-icon',
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
        });
        
        // Criar marcador
        const marker = L.marker(province.coordinates, { icon: markerIcon });
        
        // Tooltip
        marker.bindTooltip(`
            <div style="text-align:center; padding:5px;">
                <strong>${province.name}</strong><br>
                <small>${dominantReligion.name}: ${dominantReligion.percentage}%</small>
            </div>
        `);
        
        // Popup
        const popupContent = `
            <div style="min-width:280px; padding:10px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                    <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,${dominantReligion.color},#fff); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:14px;">
                        ${province.shortName}
                    </div>
                    <div>
                        <h3 style="margin:0; color:${dominantReligion.color};">${province.name}</h3>
                        <p style="margin:5px 0 0; font-size:0.9em; color:#666;">${province.capital}</p>
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
                    <div style="background:#f8f9fa; padding:8px; border-radius:5px;">
                        <div style="font-size:0.8em; color:#666;">População</div>
                        <div style="font-weight:bold;">${province.population}</div>
                    </div>
                    <div style="background:#f8f9fa; padding:8px; border-radius:5px;">
                        <div style="font-size:0.8em; color:#666;">Área</div>
                        <div style="font-weight:bold;">${province.area}</div>
                    </div>
                </div>
                
                <h4 style="margin:15px 0 10px; border-bottom:1px solid #eee; padding-bottom:5px;">Distribuição Religiosa</h4>
                ${province.religions.map(religion => `
                    <div style="margin-bottom:8px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.9em;">
                            <span>${religion.name}</span>
                            <span style="font-weight:bold;">${religion.percentage}%</span>
                        </div>
                        <div style="height:6px; background:#eee; border-radius:3px; overflow:hidden; margin-top:2px;">
                            <div style="height:100%; width:${religion.percentage}%; background-color:${religion.color};"></div>
                        </div>
                    </div>
                `).join('')}
                
                <div style="margin-top:15px; padding-top:10px; border-top:1px solid #eee; font-size:0.85em; color:#666;">
                    <i class="fas fa-info-circle"></i> ${province.description}
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Evento de clique
        marker.on('click', function() {
            updateProvinceInfo(province);
            highlightProvince(province.name);
        });
        
        // Adicionar ao mapa
        marker.addTo(map);
        markers.push(marker);
    });
    
    // Função para atualizar informações da província
    function updateProvinceInfo(province) {
        document.getElementById('provinceName').textContent = province.name;
        document.getElementById('provinceFlag').textContent = province.shortName;
        document.getElementById('provinceCapital').textContent = province.capital;
        document.getElementById('provincePopulation').textContent = province.population;
        document.getElementById('provinceArea').textContent = province.area;
        
        const detailsContainer = document.getElementById('provinceDetails');
        detailsContainer.innerHTML = '';
        
        // Adicionar gráfico de barras para cada religião
        province.religions.forEach(religion => {
            const chartItem = document.createElement('div');
            chartItem.className = 'chart-item';
            
            const chartLabel = document.createElement('div');
            chartLabel.className = 'chart-label';
            chartLabel.innerHTML = `
                <span>${religion.name}</span>
                <span>${religion.percentage}%</span>
            `;
            
            const chartBar = document.createElement('div');
            chartBar.className = 'chart-bar';
            
            const chartFill = document.createElement('div');
            chartFill.className = 'chart-fill';
            chartFill.style.backgroundColor = religion.color;
            chartFill.style.width = '0%'; // Começa em 0 para animação
            chartFill.textContent = religion.percentage + '%';
            
            chartBar.appendChild(chartFill);
            
            detailsContainer.appendChild(chartLabel);
            detailsContainer.appendChild(chartBar);
            
            // Animar a barra
            setTimeout(() => {
                chartFill.style.width = religion.percentage + '%';
            }, 100);
        });
        
        // Mostrar a seção de estatísticas
        document.getElementById('provinceStats').style.display = 'block';
        
        // Atualizar legenda ativa
        updateActiveLegend(province);
    }
    
    // Função para destacar província na legenda
    function updateActiveLegend(province) {
        document.querySelectorAll('.legend-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const dominantReligion = province.religions.reduce((prev, current) => 
            (prev.percentage > current.percentage) ? prev : current
        );
        
        let religionClass = '';
        if (dominantReligion.name.includes('Cristianismo')) religionClass = 'cristianismo';
        else if (dominantReligion.name.includes('Islã')) religionClass = 'islam';
        else if (dominantReligion.name.includes('Tradicionais')) religionClass = 'tradicional';
        else if (dominantReligion.name.includes('Outras')) religionClass = 'outras';
        else religionClass = 'nenhuma';
        
        const legendItem = document.querySelector(`.legend-item[data-religion="${religionClass}"]`);
        if (legendItem) {
            legendItem.classList.add('active');
        }
    }
    
    // Função para destacar província (simulação)
    function highlightProvince(provinceName) {
        // Adicionar efeito visual nos marcadores
        markers.forEach(marker => {
            const markerElement = marker.getElement();
            if (markerElement) {
                if (marker.getTooltip() && marker.getTooltip().getContent().includes(provinceName)) {
                    markerElement.classList.add('pulse');
                } else {
                    markerElement.classList.remove('pulse');
                }
            }
        });
    }
    
    // Eventos para a legenda interativa
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', function() {
            const religion = this.getAttribute('data-religion');
            
            // Alternar estado ativo
            this.classList.toggle('active');
            
            // Filtrar marcadores (simulação)
            markers.forEach(marker => {
                const markerElement = marker.getElement();
                if (markerElement) {
                    if (this.classList.contains('active')) {
                        markerElement.style.opacity = '1';
                    } else {
                        markerElement.style.opacity = '0.5';
                    }
                }
            });
            
            // Atualizar texto de ajuda
            const activeCount = document.querySelectorAll('.legend-item.active').length;
            const infoText = document.querySelector('#provinceInfo p');
            if (activeCount === 5) {
                infoText.textContent = 'Selecione uma província no mapa para visualizar as estatísticas detalhadas.';
            } else {
                infoText.textContent = `Mostrando ${activeCount} de 5 categorias religiosas. Clique em uma província para detalhes.`;
            }
        });
    });
    
    // Adicionar controle de escala
    L.control.scale({imperial: false}).addTo(map);
    
    // Ajustar mapa ao redimensionar
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
    
    // Adicionar camada de fronteiras (opcional - simulado)
    const bounds = L.latLngBounds(
        L.latLng(-26.9, 30.2), // sudoeste
        L.latLng(-10.5, 41.0)  // nordeste
    );
    
    // Centralizar no país
    map.fitBounds(bounds);
});
