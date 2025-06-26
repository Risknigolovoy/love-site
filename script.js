document.addEventListener('DOMContentLoaded', () => {

    // --- ВСЕ ЭЛЕМЕНТЫ ---
    // ... (существующие переменные для навигации, кота, музыки, созвездия)

    // --- ЛОГИКА СОЗДАТЕЛЯ ПЛАНЕТ ---
    const planetCreatorPage = document.getElementById('planet-creator');
    if(planetCreatorPage) {
        // Элементы управления
        const planetNameInput = document.getElementById('planet-name');
        const oceanColorInput = document.getElementById('ocean-color');
        const continentColorInput = document.getElementById('continent-color');
        const cloudToggle = document.getElementById('cloud-toggle');
        const cloudColorInput = document.getElementById('cloud-color');
        const ringsToggle = document.getElementById('rings-toggle');
        const saveButton = document.getElementById('save-planet-button');

        // Элементы предпросмотра
        const previewOcean = document.querySelector('.preview-ocean');
        const previewContinents = document.querySelectorAll('.preview-continent');
        const previewClouds = document.querySelector('.preview-clouds');
        const previewRings = document.querySelector('.preview-rings');

        // Глобальная планета на орбите
        const createdPlanetOrbit = document.getElementById('created-planet-orbit');

        const defaultPlanetConfig = {
            name: "Наш Мир",
            oceanColor: "#4a90e2",
            continentColor: "#8bc34a",
            hasClouds: false,
            cloudColor: "#ffffff",
            hasRings: false,
        };

        // Функция для применения конфига к любому элементу планеты (предпросмотр или глобальная)
        function applyPlanetStyle(config, planetElement) {
            planetElement.innerHTML = ''; // Очищаем
            const body = document.createElement('div');
            body.className = 'created-planet-body';
            
            let continentSVG = `<svg width="100%" height="100%" viewBox="0 0 100 100" style="position:absolute; top:0; left:0;"><path d="M20,30 Q40,10 60,30 T80,30" fill="${config.continentColor}" /><path d="M15,70 Q30,85 50,70 T85,65" fill="${config.continentColor}" /></svg>`;
            let cloudsSVG = config.hasClouds ? `<div style="width:100%; height:100%; border-radius:50%; background:url('https://i.imgur.com/E2s2p6B.png'); background-size:cover; opacity:0.5; filter: contrast(150%) brightness(150%) hue-rotate(${Math.random()*360}deg);"></div>` : '';
            let ringsDiv = config.hasRings ? `<div class="created-planet-rings"></div>` : '';

            body.style.backgroundColor = config.oceanColor;
            body.innerHTML = continentSVG + cloudsSVG;
            
            planetElement.appendChild(body);
            if (ringsDiv) planetElement.innerHTML += ringsDiv;

            planetElement.style.boxShadow = `0 0 20px ${config.oceanColor}, 0 0 40px #fff`;
        }
        
        // Функция для обновления предпросмотра в реальном времени
        function updatePreview() {
            previewOcean.style.backgroundColor = oceanColorInput.value;
            previewContinents.forEach(c => c.style.backgroundColor = continentColorInput.value);
            previewClouds.style.backgroundColor = cloudColorInput.value;
            previewClouds.classList.toggle('active', cloudToggle.checked);
            previewRings.classList.toggle('active', ringsToggle.checked);
        }

        // Функция для сохранения конфигурации
        function savePlanetConfig() {
            const currentConfig = {
                name: planetNameInput.value || "Наш Мир",
                oceanColor: oceanColorInput.value,
                continentColor: continentColorInput.value,
                hasClouds: cloudToggle.checked,
                cloudColor: cloudColorInput.value,
                hasRings: ringsToggle.checked,
            };
            localStorage.setItem('ourPlanetConfig', JSON.stringify(currentConfig));
            alert(`Планета "${currentConfig.name}" сохранена!`);
            renderGlobalPlanet(); // Обновляем глобальную планету
        }

        // Функция для отрисовки глобальной планеты
        function renderGlobalPlanet() {
            const savedConfig = JSON.parse(localStorage.getItem('ourPlanetConfig')) || null;
            if (savedConfig) {
                 applyPlanetStyle(savedConfig, createdPlanetOrbit);
                 createdPlanetOrbit.style.display = 'block';
            } else {
                 createdPlanetOrbit.style.display = 'none';
            }
        }
        
        // Функция для загрузки и установки значений в контролы редактора
        function loadConfigIntoCreator() {
             const savedConfig = JSON.parse(localStorage.getItem('ourPlanetConfig')) || defaultPlanetConfig;
             planetNameInput.value = savedConfig.name;
             oceanColorInput.value = savedConfig.oceanColor;
             continentColorInput.value = savedConfig.continentColor;
             cloudToggle.checked = savedConfig.hasClouds;
             cloudColorInput.value = savedConfig.cloudColor;
             ringsToggle.checked = savedConfig.hasRings;
             updatePreview();
        }

        // Назначаем обработчики событий
        planetNameInput.addEventListener('input', updatePreview);
        oceanColorInput.addEventListener('input', updatePreview);
        continentColorInput.addEventListener('input', updatePreview);
        cloudToggle.addEventListener('change', updatePreview);
        cloudColorInput.addEventListener('input', updatePreview);
        ringsToggle.addEventListener('change', updatePreview);
        saveButton.addEventListener('click', savePlanetConfig);

        // Инициализация
        loadConfigIntoCreator();
        renderGlobalPlanet();
    }
    
    // ... (остальной JS код для кота, музыки, созвездия, который у вас уже есть)

});
