document.addEventListener('DOMContentLoaded', () => {

    function setupNavigation() {
        const navToggleButton = document.getElementById('nav-toggle-button');
        const mainNav = document.getElementById('main-nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');

        navToggleButton.addEventListener('click', () => mainNav.classList.toggle('show'));

        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !navToggleButton.contains(e.target)) {
                mainNav.classList.remove('show');
            }
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

    function setupCat() {
        const catContainer = document.getElementById('cat-container');
        const cat = document.getElementById('cat');
        const purrSound = document.getElementById('purr-sound');
        const catThoughts = ['Привет! Меня зовут Soul.', 'Мррр... Я так голоден!', 'Погладь меня, пожалуйста...', 'Рад тебя видеть, хозяйка!', 'Мур-мур-мур...', 'Интересно, о чем ты думаешь?'];

        function showCatThought() {
            const existingBubble = document.querySelector('.cat-thought-bubble');
            if (existingBubble) existingBubble.remove();
            const thoughtBubble = document.createElement('div');
            thoughtBubble.classList.add('cat-thought-bubble');
            thoughtBubble.textContent = catThoughts[Math.floor(Math.random() * catThoughts.length)];
            catContainer.appendChild(thoughtBubble);
            setTimeout(() => thoughtBubble.remove(), 5000);
        }

        cat.addEventListener('click', () => {
            showCatThought();
            if (!purrSound.paused) { purrSound.pause(); purrSound.currentTime = 0; }
            else { purrSound.play(); }
        });
    }

    function setupMusic() {
        const backgroundMusic = document.getElementById('background-music');
        const musicToggleButton = document.getElementById('music-toggle');
        backgroundMusic.volume = 0.15;
        
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.paused) { backgroundMusic.play(); musicToggleButton.textContent = '🎵'; }
            else { backgroundMusic.pause(); musicToggleButton.textContent = '🔇'; }
        });

        let musicStarted = false;
        function playMusicOnClick() {
            if (!musicStarted) {
                backgroundMusic.play().then(() => { musicStarted = true; musicToggleButton.textContent = '🎵'; })
                .catch(() => musicToggleButton.textContent = '🔇');
            }
            document.body.removeEventListener('click', playMusicOnClick);
        }
        document.body.addEventListener('click', playMusicOnClick);
    }
    
    function setupModal() {
        const modal = document.getElementById('note-modal');
        const modalText = document.getElementById('modal-text');
        const modalCloseButton = document.getElementById('modal-close-button');
        
        window.showNote = (text, isSecret = false) => {
            modalText.innerHTML = text;
            modalText.classList.toggle('align-left', isSecret);
            modal.classList.remove('modal-hidden');
        };
        
        const closeNote = () => modal.classList.add('modal-hidden');
        modalCloseButton.addEventListener('click', closeNote);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeNote();
        });
    }

    function setupConstellation() {
        const svgNS = "http://www.w3.org/2000/svg";
        const constellationSVG = document.getElementById('constellation-svg');
        const connectButton = document.getElementById('connect-stars-button');
        if (!constellationSVG) return;

        const memories = [
            "Ты пришла на квест и мы играли в гляделки", "Я написал тебе и трусил, нервничал и думал, как же ты отреагируешь",
            "Ты пригласила меня домой и тут я тоже трусил прийти, надумал всякое", "Я пришел к тебе и вел себя, ох, какой важный курица",
            "Я стал твоим парнем, не зная об этом", "Тут я очень долго подводил, но все же наконец сказал тебе: я тебя люблю",
            "Я счастлив по сей день, зная, что ты моя прелесть и мы с тобой вместе, несмотря ни на что"
        ];
        const secretLetter = `Милая моя девочка, моя принцесса... (полный текст письма)`;
        
        const starCoords = [{ x: 120, y: 150 }, { x: 250, y: 120 }, { x: 390, y: 180 }, { x: 530, y: 220 }, { x: 650, y: 350 }, { x: 500, y: 400 }, { x: 380, y: 320 }];
        const lineConnections = [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3] ];
        let visitedStars = new Set();
        let lines = [];

        function createStarPoints(cx, cy, spikes, outerRadius, innerRadius) {
            let points = ""; let rot = Math.PI / 2 * 3; let x = cx; let y = cy; let step = Math.PI / spikes;
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius; y = cy + Math.sin(rot) * outerRadius; points += x + "," + y + " "; rot += step;
                x = cx + Math.cos(rot) * innerRadius; y = cy + Math.sin(rot) * innerRadius; points += x + "," + y + " "; rot += step;
            }
            return points;
        }

        lineConnections.forEach(conn => {
            const p1 = starCoords[conn[0]]; const p2 = starCoords[conn[1]];
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', p1.x); line.setAttribute('y1', p1.y); line.setAttribute('x2', p2.x); line.setAttribute('y2', p2.y);
            line.classList.add('constellation-line'); constellationSVG.appendChild(line); lines.push(line);
        });

        starCoords.forEach((coord, index) => {
            const group = document.createElementNS(svgNS, 'g'); group.classList.add('star-group');
            const star = document.createElementNS(svgNS, 'polygon');
            star.setAttribute('points', createStarPoints(coord.x, coord.y, 5, 12, 5)); star.classList.add('star-polygon');
            const hitbox = document.createElementNS(svgNS, 'circle');
            hitbox.setAttribute('cx', coord.x); hitbox.setAttribute('cy', coord.y); hitbox.setAttribute('r', 20); hitbox.classList.add('star-hitbox');
            group.append(star, hitbox);
            group.addEventListener('click', () => {
                if (star.classList.contains('visited')) return;
                window.showNote(memories[index]);
                star.classList.add('visited'); visitedStars.add(index);
                if (visitedStars.size === memories.length) connectButton.disabled = false;
            });
            constellationSVG.appendChild(group);
        });

        connectButton.addEventListener('click', () => {
            connectButton.disabled = true; let totalDelay = 0; const lineDrawDuration = 2500;
            lines.forEach(line => {
                setTimeout(() => {
                    const length = Math.hypot(line.x2.baseVal.value - line.x1.baseVal.value, line.y2.baseVal.value - line.y1.baseVal.value);
                    line.style.strokeDasharray = length; line.style.strokeDashoffset = length; line.classList.add('drawing');
                    setTimeout(() => line.style.strokeDashoffset = 0, 50);
                }, totalDelay);
                totalDelay += lineDrawDuration;
            });
            setTimeout(() => { window.showNote(secretLetter, true); }, totalDelay);
        });
    }

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

        function renderPlanet(container, config) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'planet-body-wrapper';
            wrapper.style.boxShadow = `0 0 25px ${config.glowColor}`;
            const planetBodySVG = document.createElementNS(svgNS, 'svg');
            planetBodySVG.setAttribute('viewBox', '0 0 250 250');
            const ocean = document.createElementNS(svgNS, 'circle');
            ocean.setAttribute('cx', '125'); ocean.setAttribute('cy', '125'); ocean.setAttribute('r', '125');
            ocean.setAttribute('fill', config.oceanColor);
            planetBodySVG.appendChild(ocean);
            const continentsGroup = document.createElementNS(svgNS, 'g');
            if (config.continents) {
                config.continents.forEach(p => {
                    const plot = document.createElementNS(svgNS, 'circle');
                    plot.setAttribute('cx', p.x); plot.setAttribute('cy', p.y); plot.setAttribute('r', p.r);
                    plot.setAttribute('fill', config.continentColor);
                    continentsGroup.appendChild(plot);
                });
            }
            planetBodySVG.appendChild(continentsGroup);
            wrapper.appendChild(planetBodySVG);
            if (config.hasLights) {
                const lights = document.createElement('div');
                lights.className = 'civilization-lights';
                wrapper.appendChild(lights);
            }
            container.appendChild(wrapper);
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
            renderPlanet(previewWrapper, tempConfig);
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
            if (savedConfig) { renderPlanet(createdPlanetOrbit, savedConfig); createdPlanetOrbit.style.display = 'block'; }
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
            currentContinentData.push({ x: x, y: y, r: Math.random() * 10 + 10 });
            updatePreview();
        });
        clearButton.addEventListener('click', () => { currentContinentData = []; updatePreview(); });
        saveButton.addEventListener('click', savePlanetConfig);
        [oceanColorInput, continentColorInput, glowColorInput, moonCountSelect, moonTypeSelect, lightsToggle].forEach(el => {
            el.addEventListener('change', updatePreview);
        });
        
        loadConfigIntoCreator();
        renderGlobalPlanet();
    }

    // Инициализация всех модулей
    setupNavigation();
    setupCat();
    setupMusic();
    setupModal();
    setupConstellation();
    setupPlanetCreator();
});
