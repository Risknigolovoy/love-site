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
    
    // Элементы для созвездий
    const constellationsContainer = document.getElementById('constellations-container');
    const modal = document.getElementById('memory-modal');
    const modalCloseButton = document.querySelector('.modal-close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // --- НАСТРОЙКИ ---
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;

    // --- "МОЗГ" КОТА ---
    const catThoughts = [
        'Привет! Меня зовут Soul.',
        'Мррр... Я так голоден!',
        'Погладь меня, пожалуйста...',
        'Рад тебя видеть, хозяйка!',
        'Мур-мур-мур...',
        'Интересно, о чем ты думаешь?'
    ];

    // --- ВАШИ НОВЫЕ ВОСПОМИНАНИЯ ---
    const memories = [
        {
            id: 1,
            name: "Созвездие Квеста",
            description: "Наша первая встреча на квесте.",
            stars: [ { x: 15, y: 25 }, { x: 20, y: 20 }, { x: 25, y: 28 }, { x: 30, y: 22 } ]
        },
        {
            id: 2,
            name: "Созвездие Диалога",
            description: "Тут мы с тобой впервые списались.",
            stars: [ { x: 70, y: 15 }, { x: 78, y: 18 }, { x: 85, y: 14 } ]
        },
        {
            id: 3,
            name: "Созвездие Волнения",
            description: "Тут я очень, ну очень нервничал прийти к тебе впервые.",
            stars: [ { x: 45, y: 50 }, { x: 50, y: 55 }, { x: 55, y: 50 }, { x: 50, y: 45 }, { x: 45, y: 50 } ]
        },
        {
            id: 4,
            name: "Созвездие 'Мистер Серьезность'",
            description: "Тут я впервые пришел к тебе и строил из себя мистера серьезность.",
            stars: [ { x: 20, y: 80 }, { x: 25, y: 80 }, { x: 30, y: 80 }, { x: 35, y: 80 } ]
        },
        {
            id: 5,
            name: "Созвездие Нашего Секрета",
            description: "Тут я уже твой парень, но об этом знала только ты.",
            stars: [ { x: 80, y: 70 }, { x: 85, y: 75 }, { x: 90, y: 70 } ]
        },
        {
            id: 6,
            name: "Созвездие Трех Слов",
            description: "Тут я, дрожа, словно маленький мальчик, говорю тебе, что я тебя люблю.",
            stars: [ { x: 50, y: 85 }, { x: 45, y: 90 }, { x: 55, y: 90 }, { x: 50, y: 85 } ]
        }
    ];


    // --- ФУНКЦИИ ---

    function showCatThought() {
        const existingBubble = document.querySelector('.cat-thought-bubble');
        if (existingBubble) existingBubble.remove();
        const thoughtBubble = document.createElement('div');
        thoughtBubble.classList.add('cat-thought-bubble');
        const randomThought = catThoughts[Math.floor(Math.random() * catThoughts.length)];
        thoughtBubble.textContent = randomThought;
        catContainer.appendChild(thoughtBubble);
        setTimeout(() => { thoughtBubble.remove(); }, 5000);
    }

    // --- ФУНКЦИИ ДЛЯ СОЗВЕЗДИЙ ---
    function showModal(memory) {
        modalTitle.textContent = memory.name;
        modalDescription.textContent = memory.description;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        const oldLines = document.querySelectorAll('.constellation-line');
        oldLines.forEach(line => line.remove());
    }
    
    function drawConstellation(memory) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.zIndex = '-1';
        svg.classList.add('constellation-line'); // Добавляем класс для удаления

        for (let i = 0; i < memory.stars.length - 1; i++) {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', `${memory.stars[i].x}%`);
            line.setAttribute('y1', `${memory.stars[i].y}%`);
            line.setAttribute('x2', `${memory.stars[i+1].x}%`);
            line.setAttribute('y2', `${memory.stars[i+1].y}%`);
            svg.appendChild(line);
        }
        constellationsContainer.appendChild(svg);
    }
    
    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---
    cat.addEventListener('click', () => {
        showCatThought();
        if (!purrSound.paused) { purrSound.pause(); } 
        else { purrSound.currentTime = 0; purrSound.play(); }
    });
    
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) { backgroundMusic.play(); musicToggleButton.textContent = '🎵'; } 
        else { backgroundMusic.pause(); musicToggleButton.textContent = '🔇'; }
    });

    navToggleButton.addEventListener('click', () => {
        mainNav.classList.toggle('show');
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
    
    document.addEventListener('click', (e) => {
        if (!navToggleButton.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('show');
        }
    });

    // СОБЫТИЯ ДЛЯ СОЗВЕЗДИЙ
    memories.forEach(memory => {
        memory.stars.forEach((starCoords) => {
            const starElement = document.createElement('div');
            starElement.classList.add('star-point');
            starElement.style.left = `${starCoords.x}%`;
            starElement.style.top = `${starCoords.y}%`;
            starElement.dataset.memoryId = memory.id;
            constellationsContainer.appendChild(starElement);

            starElement.addEventListener('click', () => {
                const clickedMemory = memories.find(m => m.id === memory.id);
                const oldLines = document.querySelectorAll('.constellation-line');
                oldLines.forEach(line => line.remove());
                drawConstellation(clickedMemory);
                setTimeout(() => { showModal(clickedMemory); }, 1000);
            });
        });
    });
    
    modalCloseButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) { closeModal(); }
    });

    // АВТОВОСПРОИЗВЕДЕНИЕ МУЗЫКИ
    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true; musicToggleButton.textContent = '🎵';
            }).catch(error => { musicToggleButton.textContent = '🔇'; });
        }
    }
    document.body.addEventListener('click', playMusic, { once: true });
});
