
document.addEventListener('DOMContentLoaded', function() {
    // Só inicializa o mapa se o elemento #map existir
    if (document.getElementById('map')) {
        
        // Inicializar o mapa
        const map = L.map('map').setView([-18.665695, 35.529562], 5);
        
        // Camada base do OpenStreetMap
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Camada de satélite
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        // Controle de camadas
        const baseLayers = {
            "Mapa Padrão": osmLayer,
            "Vista de Satélite": satelliteLayer
        };
        L.control.layers(baseLayers).addTo(map);

        // Dados das províncias
        const provinceData = {
            "Cabo Delgado": { coords: [-12.5, 39.5], pop: "2.3M", data: {"Cristã":20, "Islâmica":60, "Tradicional":15, "Outras":5} },
            "Niassa": { coords: [-12.7, 36.5], pop: "1.8M", data: {"Cristã":40, "Islâmica":30, "Tradicional":25, "Outras":5} },
            "Nampula": { coords: [-15.1, 39.2], pop: "6.1M", data: {"Cristã":30, "Islâmica":50, "Tradicional":15, "Outras":5} },
            "Zambézia": { coords: [-17.0, 37.0], pop: "5.2M", data: {"Cristã":45, "Islâmica":25, "Tradicional":25, "Outras":5} },
            "Tete": { coords: [-15.5, 33.0], pop: "2.7M", data: {"Cristã":50, "Islâmica":20, "Tradicional":25, "Outras":5} },
            "Manica": { coords: [-19.0, 33.5], pop: "1.9M", data: {"Cristã":60, "Islâmica":15, "Tradicional":20, "Outras":5} },
            "Sofala": { coords: [-19.0, 34.9], pop: "2.2M", data: {"Cristã":55, "Islâmica":20, "Tradicional":20, "Outras":5} },
            "Inhambane": { coords: [-23.0, 34.5], pop: "1.5M", data: {"Cristã":60, "Islâmica":5, "Tradicional":30, "Outras":5} },
            "Gaza": { coords: [-23.5, 33.0], pop: "1.4M", data: {"Cristã":65, "Islâmica":10, "Tradicional":20, "Outras":5} },
            "Maputo Província": { coords: [-25.5, 32.2], pop: "2.5M", data: {"Cristã":70, "Islâmica":15, "Tradicional":10, "Outras":5} }
        };

        const religionColors = {
            "Cristã": "#4CAF50",
            "Islâmica": "#2196F3",
            "Tradicional": "#FF9800",
            "Outras": "#9C27B0"
        };

        // Função para mostrar detalhes da província
        function showProvinceDetails(provinceName) {
            const province = provinceData[provinceName];
            const infoDiv = document.getElementById('provinceInfo');
            
            let html = `<h3>${provinceName}</h3><p>Pop. aprox.: ${province.pop}</p>`;
            html += `<div class="religion-stats">`;
            
            for (const [religion, percentage] of Object.entries(province.data)) {
                html += `
                    <div class="stat-label">
                        <span>${religion}</span>
                        <span>${percentage}%</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${percentage}%; background-color: ${religionColors[religion]}"></div>
                    </div>
                `;
            }
            html += `</div>`;
            infoDiv.innerHTML = html;
        }

        // Adicionar marcadores
        for (const name in provinceData) {
            const province = provinceData[name];
            const marker = L.marker(province.coords).addTo(map);
            marker.bindPopup(`<b>${name}</b><br><button class="popup-btn" data-province="${name}">Ver detalhes</button>`);

            marker.on('popupopen', () => {
                document.querySelector('.popup-btn').addEventListener('click', (e) => {
                    showProvinceDetails(e.target.dataset.province);
                    map.closePopup();
                });
            });
        }

        // Controle de escala
        L.control.scale({metric: true, imperial: false}).addTo(map);
    }
});
