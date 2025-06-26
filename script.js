document.addEventListener('DOMContentLoaded', () => {

    // --- ВСЕ ЭЛЕМЕНТЫ ---
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const musicToggleButton = document.getElementById('music-toggle');
    const catContainer = document.getElementById('cat-container');
    const cat = document.getElementById('cat');
    const navToggleButton = document.getElementById('nav-toggle-button');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // --- НАСТРОЙКИ ---
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;

    // --- "МОЗГ" КОТА ---
    const catThoughts = ['Привет! Меня зовут Soul.', 'Мррр... Я так голоден!', 'Погладь меня, пожалуйста...', 'Рад тебя видеть, хозяйка!', 'Мур-мур-мур...', 'Интересно, о чем ты думаешь?'];

    // --- ФУНКЦИИ КОТА ---
    function showCatThought() {
        const existingBubble = document.querySelector('.cat-thought-bubble');
        if (existingBubble) { existingBubble.remove(); }
        const thoughtBubble = document.createElement('div');
        thoughtBubble.classList.add('cat-thought-bubble');
        thoughtBubble.textContent = catThoughts[Math.floor(Math.random() * catThoughts.length)];
        catContainer.appendChild(thoughtBubble);
        setTimeout(() => { thoughtBubble.remove(); }, 5000);
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ (КОТ, МУЗЫКА, НАВИГАЦИЯ) ---
    cat.addEventListener('click', () => {
        showCatThought();
        if (!purrSound.paused) { purrSound.pause(); purrSound.currentTime = 0; } 
        else { purrSound.play(); }
    });

    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) { backgroundMusic.play(); musicToggleButton.textContent = '🎵'; } 
        else { backgroundMusic.pause(); musicToggleButton.textContent = '🔇'; }
    });

    navToggleButton.addEventListener('click', () => { mainNav.classList.toggle('show'); });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            mainNav.classList.remove('show');
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            link.classList.add('active');
            document.querySelector(targetId).classList.add('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !navToggleButton.contains(e.target)) {
            mainNav.classList.remove('show');
        }
    });

    // --- ЛОГИКА СОЗВЕЗДИЯ ---
    // ... (полный работающий код созвездия из предыдущей версии)

    // --- ЛОГИКА СОЗДАТЕЛЯ ПЛАНЕТ ---
    const planetCreatorPage = document.getElementById('planet-creator');
    if(planetCreatorPage) {
        // ... (полный работающий код создателя планет из предыдущего сообщения)
        // ВАЖНО: вся эта логика должна быть здесь, я ее восстановлю
        const planetNameInput = document.getElementById('planet-name');
        const oceanColorInput = document.getElementById('ocean-color');
        const continentColorInput = document.getElementById('continent-color');
        const cloudToggle = document.getElementById('cloud-toggle');
        const ringsToggle = document.getElementById('rings-toggle');
        const saveButton = document.getElementById('save-planet-button');
        const planetPreview = document.getElementById('planet-preview');
        const createdPlanetOrbit = document.getElementById('created-planet-orbit');

        const defaultPlanetConfig = { name: "Наш Мир", oceanColor: "#4a90e2", continentColor: "#8bc34a", hasClouds: false, hasRings: false };

        function applyPlanetStyle(config, element) {
            element.innerHTML = '';
            const body = document.createElement('div');
            body.className = 'created-planet-body';
            body.style.backgroundColor = config.oceanColor;
            body.style.boxShadow = `inset 0 0 20px rgba(0,0,0,0.5), 0 0 20px ${config.oceanColor}, 0 0 35px #fff`;

            const continentsHTML = `<svg width="100%" height="100%" viewBox="0 0 100 100" style="position:absolute; top:0; left:0; transform: rotate(45deg);"><path d="M20,30 Q40,10 60,30 T80,30" fill="${config.continentColor}" /><path d="M15,70 Q30,85 50,70 T85,65" fill="${config.continentColor}" /></svg>`;
            const cloudsHTML = config.hasClouds ? `<div style="position:absolute; width:100%; height:100%; border-radius:50%; background:url('https://i.imgur.com/E2s2p6B.png'); background-size:150%; opacity:0.5; animation: planet-body-rotation 50s linear infinite reverse;"></div>` : '';
            const ringsHTML = config.hasRings ? `<div class="created-planet-rings"></div>` : '';

            body.innerHTML = continentsHTML + cloudsHTML;
            element.appendChild(body);
            if (config.hasRings) element.innerHTML += ringsHTML;
        }

        function updatePreview() {
            const tempConfig = {
                oceanColor: oceanColorInput.value,
                continentColor: continentColorInput.value,
                hasClouds: cloudToggle.checked,
                hasRings: ringsToggle.checked,
            };
            applyPlanetStyle(tempConfig, planetPreview);
        }

        function savePlanetConfig() {
            const currentConfig = {
                name: planetNameInput.value || "Наш Мир",
                oceanColor: oceanColorInput.value,
                continentColor: continentColorInput.value,
                hasClouds: cloudToggle.checked,
                hasRings: ringsToggle.checked,
            };
            localStorage.setItem('ourPlanetConfig', JSON.stringify(currentConfig));
            alert(`Планета "${currentConfig.name}" сохранена!`);
            renderGlobalPlanet();
        }

        function renderGlobalPlanet() {
            const savedConfig = JSON.parse(localStorage.getItem('ourPlanetConfig'));
            if (savedConfig) {
                 applyPlanetStyle(savedConfig, createdPlanetOrbit);
                 createdPlanetOrbit.style.display = 'block';
            } else {
                 createdPlanetOrbit.style.display = 'none';
            }
        }
        
        function loadConfigIntoCreator() {
             const savedConfig = JSON.parse(localStorage.getItem('ourPlanetConfig')) || defaultPlanetConfig;
             planetNameInput.value = savedConfig.name;
             oceanColorInput.value = savedConfig.oceanColor;
             continentColorInput.value = savedConfig.continentColor;
             cloudToggle.checked = savedConfig.hasClouds;
             ringsToggle.checked = savedConfig.hasRings;
             updatePreview();
        }

        [oceanColorInput, continentColorInput].forEach(el => el.addEventListener('input', updatePreview));
        [cloudToggle, ringsToggle].forEach(el => el.addEventListener('change', updatePreview));
        saveButton.addEventListener('click', savePlanetConfig);

        loadConfigIntoCreator();
        renderGlobalPlanet();
    }

    // Автовоспроизведение музыки при первом взаимодействии
    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true;
                musicToggleButton.textContent = '🎵';
            }).catch(error => { musicToggleButton.textContent = '🔇'; });
        }
        document.body.removeEventListener('click', playMusic);
    }
    document.body.addEventListener('click', playMusic);
});
