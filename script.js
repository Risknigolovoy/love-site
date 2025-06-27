document.addEventListener('DOMContentLoaded', () => {

    // --- ИНИЦИАЛИЗАЦИЯ ВСЕХ МОДУЛЕЙ ---
    setupNavigation();
    setupCat();
    setupMusic();
    setupModal();
    setupConstellation();
    setupPlanetCreator();

    // --- МОДУЛЬ НАВИГАЦИИ ---
    function setupNavigation() {
        const navToggleButton = document.getElementById('nav-toggle-button');
        const mainNav = document.getElementById('main-nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        navToggleButton.addEventListener('click', () => mainNav.classList.toggle('show'));
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !navToggleButton.contains(e.target)) mainNav.classList.remove('show');
        });
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
    }

    // --- МОДУЛЬ КОТА (С ПЕРЕТАСКИВАНИЕМ) ---
    function setupCat() {
        const catContainer = document.getElementById('cat-container');
        const cat = document.getElementById('cat');
        const purrSound = document.getElementById('purr-sound');
        purrSound.volume = 1.0;
        const catThoughts = ['Привет! Меня зовут Soul.', 'Мррр... Я так голоден!', 'Погладь меня, пожалуйста...', 'Рад тебя видеть, хозяйка!', 'Мур-мур-мур...', 'Интересно, о чем ты думаешь?'];
        
        let isDragging = false;
        let offsetX, offsetY;

        const startDrag = (e) => {
            isDragging = true;
            catContainer.classList.add('dragging');
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            offsetX = clientX - catContainer.offsetLeft;
            offsetY = clientY - catContainer.offsetTop;
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', endDrag);
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            let newLeft = clientX - offsetX;
            let newTop = clientY - offsetY;

            // Ограничения, чтобы кот не ушел за экран
            const maxX = window.innerWidth - catContainer.offsetWidth;
            const maxY = window.innerHeight - catContainer.offsetHeight;
            newLeft = Math.max(0, Math.min(newLeft, maxX));
            newTop = Math.max(0, Math.min(newTop, maxY));
            
            catContainer.style.left = `${newLeft}px`;
            catContainer.style.top = `${newTop}px`;
        };

        const endDrag = () => {
            isDragging = false;
            catContainer.classList.remove('dragging');
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('touchend', endDrag);
        };

        catContainer.addEventListener('mousedown', startDrag);
        catContainer.addEventListener('touchstart', startDrag);
        
        function showCatThought() { /* ... */ }
        cat.addEventListener('click', (e) => {
            // Предотвращаем начало перетаскивания, если это был быстрый клик
            if (Math.abs(e.clientX - (offsetX + catContainer.offsetLeft)) < 5) {
                showCatThought();
                if (!purrSound.paused) { purrSound.pause(); purrSound.currentTime = 0; }
                else { purrSound.play(); }
            }
        }, true);
    }

    // --- МОДУЛЬ МУЗЫКИ ---
    function setupMusic() { /* ... код без изменений ... */ }
    
    // --- МОДУЛЬ МОДАЛЬНОГО ОКНА (С ИСПРАВЛЕНИЕМ) ---
    function setupModal() {
        const modal = document.getElementById('note-modal');
        const modalText = document.getElementById('modal-text');
        const modalCloseButton = document.getElementById('modal-close-button');
        
        window.showNote = (text, isSecret = false) => {
            modalText.innerHTML = text;
            modalText.parentElement.scrollTop = 0; // Сбрасываем скролл наверх
            modalText.classList.toggle('align-left', isSecret);
            modal.classList.add('active');
        };
        
        const closeNote = () => modal.classList.remove('active');
        modalCloseButton.addEventListener('click', closeNote);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeNote(); });
    }

    // --- МОДУЛЬ СОЗВЕЗДИЯ ---
    function setupConstellation() { /* ... полный код созвездия без изменений ... */ }

    // --- МОДУЛЬ РЕДАКТОРА ПЛАНЕТЫ (ПОЛНОСТЬЮ ПЕРЕПИСАННЫЙ) ---
    function setupPlanetCreator() {
        const planetCreatorPage = document.getElementById('planet-creator');
        if (!planetCreatorPage) return;
        const svgNS = "http://www.w3.org/2000/svg";
        const planetPreviewSVG = document.getElementById('planet-preview-svg');
        const planetNameInput = document.getElementById('planet-name');
        const oceanColorInput = document.getElementById('ocean-color');
        const continentColorInput = document.getElementById('continent-color');
        const glowColorInput = document.getElementById('glow-color');
        const moonCountSelect = document.getElementById('moon-count');
        const moonTypeGroup = document.getElementById('moon-type-group');
        const moonTypeSelect = document.getElementById('moon-type');
        const lightsToggle = document.getElementById('lights-toggle');
        const clearButton = document.getElementById('clear-continents-button');
        const saveButton = document.getElementById('save-planet-button');
        const createdPlanetOrbit = document.getElementById('created-planet-orbit');
        let currentContinentData = [];
        const defaultPlanetConfig = { name: "Наш Мир", oceanColor: "#4a90e2", continentColor: "#8bc34a", glowColor: "#ffffff", continents: [], moonCount: 0, moonType: 'ice', hasLights: false };

        function renderPlanet(container, config, isPreview) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'planet-body-wrapper';
            if (!isPreview) wrapper.style.boxShadow = `0 0 25px ${config.glowColor}`;
            const planetBodySVG = isPreview ? planetPreviewSVG : document.createElementNS(svgNS, 'svg');
            if (!isPreview) {
                planetBodySVG.setAttribute('viewBox', '0 0 250 250');
                wrapper.appendChild(planetBodySVG);
            }
            planetBodySVG.innerHTML = '';

            const ocean = document.createElementNS(svgNS, 'circle');
            ocean.setAttribute('cx', '125'); ocean.setAttribute('cy', '125'); ocean.setAttribute('r', '125');
            ocean.setAttribute('fill', config.oceanColor);
            planetBodySVG.appendChild(ocean);

            const continentsGroup = document.createElementNS(svgNS, 'g');
            if (config.continents) config.continents.forEach(p => {
                const plot = document.createElementNS(svgNS, 'circle');
                plot.setAttribute('cx', p.x); plot.setAttribute('cy', p.y); plot.setAttribute('r', p.r);
                plot.setAttribute('fill', config.continentColor);
                continentsGroup.appendChild(plot);
            });
            planetBodySVG.appendChild(continentsGroup);

            if (config.hasLights && !isPreview) {
                const lights = document.createElement('div');
                lights.className = 'civilization-lights';
                wrapper.appendChild(lights);
            }
            if(isPreview) container.appendChild(wrapper); else container.appendChild(wrapper);
            
            for (let i = 1; i <= config.moonCount; i++) {
                const orbit = document.createElement('div');
                orbit.className = `moon-orbit moon-orbit-${i}`;
                const satellite = document.createElement('div');
                satellite.className = `moon-satellite moon-satellite-${i} moon-type-${config.moonType}`;
                orbit.appendChild(satellite);
                container.appendChild(orbit);
            }
        }
        
        function updatePreview() {
            const tempConfig = {
                oceanColor: oceanColorInput.value, continentColor: continentColorInput.value, glowColor: glowColorInput.value,
                continents: currentContinentData, moonCount: parseInt(moonCountSelect.value, 10),
                moonType: moonTypeSelect.value, hasLights: lightsToggle.checked,
            };
            const previewWrapper = document.getElementById('planet-preview-wrapper');
            renderPlanet(previewWrapper, tempConfig, true);
            moonTypeGroup.style.display = tempConfig.moonCount > 0 ? 'block' : 'none';
        }

        function savePlanetConfig() {
            const configToSave = {
                name: planetNameInput.value || "Наш Мир", oceanColor: oceanColorInput.value, continentColor: continentColorInput.value,
                glowColor: glowColorInput.value, continents: currentContinentData, moonCount: parseInt(moonCountSelect.value, 10),
                moonType: moonTypeSelect.value, hasLights: lightsToggle.checked,
            };
            localStorage.setItem('ourPlanetConfig', JSON.stringify(configToSave));
            alert(`Планета "${configToSave.name}" сохранена!`);
            renderGlobalPlanet();
        }

        function renderGlobalPlanet() {
            const savedConfig = JSON.parse(localStorage.getItem('ourPlanetConfig'));
            if (savedConfig) { renderPlanet(createdPlanetOrbit, savedConfig, false); createdPlanetOrbit.style.display = 'block'; }
            else { createdPlanetOrbit.style.display = 'none'; }
        }
        
        function loadConfigIntoCreator() {
             const savedConfig = JSON.parse(localStorage.getItem('ourPlanetConfig')) || defaultPlanetConfig;
             planetNameInput.value = savedConfig.name;
             oceanColorInput.value = savedConfig.oceanColor;
             continentColorInput.value = savedConfig.continentColor;
             glowColorInput.value = savedConfig.glowColor;
             moonCountSelect.value = savedConfig.moonCount;
             moonTypeSelect.value = savedConfig.moonType;
             lightsToggle.checked = savedConfig.hasLights;
             currentContinentData = savedConfig.continents || [];
             updatePreview();
        }

        planetPreviewSVG.addEventListener('click', (e) => {
            const rect = planetPreviewSVG.getBoundingClientRect();
            const scaleX = 250 / rect.width; const scaleY = 250 / rect.height;
            const x = (e.clientX - rect.left) * scaleX; const y = (e.clientY - rect.top) * scaleY;
            if (Math.hypot(x - 125, y - 125) > 125) return;
            currentContinentData.push({ x: x, y: y, r: Math.random() * 8 + 8 });
            updatePreview();
        });
        clearButton.addEventListener('click', () => { currentContinentData = []; updatePreview(); });
        saveButton.addEventListener('click', savePlanetConfig);
        [oceanColorInput, continentColorInput, glowColorInput, moonCountSelect, moonTypeSelect, lightsToggle].forEach(el => {
            el.addEventListener('input', updatePreview); el.addEventListener('change', updatePreview);
        });
        
        loadConfigIntoCreator();
        renderGlobalPlanet();
    }
});
