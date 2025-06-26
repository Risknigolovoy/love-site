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
    const catThoughts = [
        'Привет! Меня зовут Soul.',
        'Мррр... Я так голоден!',
        'Погладь меня, пожалуйста...',
        'Рад тебя видеть, хозяйка!',
        'Мур-мур-мур...',
        'Интересно, о чем ты думаешь?'
    ];

    // --- ФУНКЦИИ ---

    // Показать всплывающую мысль кота
    function showCatThought() {
        const existingBubble = document.querySelector('.cat-thought-bubble');
        if (existingBubble) {
            existingBubble.remove();
        }
        const thoughtBubble = document.createElement('div');
        thoughtBubble.classList.add('cat-thought-bubble');
        const randomThought = catThoughts[Math.floor(Math.random() * catThoughts.length)];
        thoughtBubble.textContent = randomThought;
        catContainer.appendChild(thoughtBubble);
        setTimeout(() => {
            thoughtBubble.remove();
        }, 5000);
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // Клик по коту
    cat.addEventListener('click', () => {
        showCatThought();
        if (!purrSound.paused) {
            purrSound.pause();
            purrSound.currentTime = 0;
        } else {
            purrSound.play();
        }
    });
    // Кнопка музыки
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicToggleButton.textContent = '🔇';
        }
    });

    // Кнопка выпадающего меню навигации
    navToggleButton.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Ссылки навигации
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
    // Закрыть меню, если кликнуть вне его
    document.addEventListener('click', (e) => {
        if (!navToggleButton.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('show');
        }
    });
    
    // --- ЛОГИКА СОЗВЕЗДИЯ ---
    
    const svgNS = "http://www.w3.org/2000/svg";
    const constellationSVG = document.getElementById('constellation-svg');
    const noteModal = document.getElementById('note-modal');
    const modalText = document.getElementById('modal-text');
    const modalCloseButton = document.getElementById('modal-close-button');

    const memories = [
        "Ты пришла на квест и мы играли в гляделки",
        "Я написал тебе и трусил, нервничал и думал, как же ты отреагируешь",
        "Ты пригласила меня домой и тут я тоже трусил прийти, надумал всякое",
        "Я пришел к тебе и вел себя, ох, какой важный курица",
        "Я стал твоим парнем, не зная об этом",
        "Тут я очень долго подводил, но все же наконец сказал тебе: я тебя люблю",
        "Я счастлив по сей день, зная, что ты моя прелесть и мы с тобой вместе, несмотря ни на что"
    ];

    const secretLetter = `Милая моя девочка, моя принцесса.<br><br>Я часто бываю невнимательным к тебе и грубым, сухим и без эмпатии. Время в моих глазах утекает, так как я в своих мыслях 24/7 летаю, и я не замечаю, как мало внимания, любви, чуткости к тебе проявляю. Прости за это.<br><br>Прости за то, что оставил тебя одну со всеми проблемами, что теперь не рядом, когда так сильно нужен тебе, за то, что далеко.<br><br>Прошу тебя, котенок мой милый, не опускай руки, не вреди себе, не режь, не царапай, не бей, не пей. Я очень беспокоюсь о тебе. Я могу мало писать, но очень часто думаю о тебе (понимаю, это не то, что тебе нужно). Я волнуюсь за тебя, ты ведь стала моей, моей частью души и сердца.<br><br>Я люблю тебя, солнце. Очень жду встречи с тобой, точнее, стараюсь ускорить время до встречи с тобой.`;

    // Координаты звезд Большой Медведицы
    const starCoords = [
        { x: 100, y: 150 }, { x: 250, y: 120 }, { x: 350, y: 200 },
        { x: 500, y: 250 }, { x: 600, y: 220 }, { x: 700, y: 300 },
        { x: 650, y: 100 }
    ];
    
    // Соединения линий
    const lineConnections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [2, 6]
    ];

    let visitedStars = new Set();

    // Создаем линии
    lineConnections.forEach((conn, index) => {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', starCoords[conn[0]].x);
      line.setAttribute('y1', starCoords[conn[0]].y);
      line.setAttribute('x2', starCoords[conn[1]].x);
      line.setAttribute('y2', starCoords[conn[1]].y);
      line.classList.add('constellation-line');
      line.id = `line-${index}`;
      constellationSVG.appendChild(line);
    });

    // Создаем звезды
    starCoords.forEach((coord, index) => {
        const star = document.createElementNS(svgNS, 'circle');
        star.setAttribute('cx', coord.x);
        star.setAttribute('cy', coord.y);
        star.setAttribute('r', 6);
        star.classList.add('star');
        star.dataset.index = index;
        
        star.addEventListener('click', () => {
            showNote(memories[index]);
            star.classList.add('visited');
            visitedStars.add(index);

            // "Рисуем" линии, связанные с этой звездой
            lineConnections.forEach((conn, lineIndex) => {
              if(conn.includes(index)) {
                document.getElementById(`line-${lineIndex}`).classList.add('drawn');
              }
            });

            if (visitedStars.size === memories.length) {
                // Устанавливаем небольшую задержку перед показом финального письма
                setTimeout(() => showNote(secretLetter, true), 1000);
            }
        });

        constellationSVG.appendChild(star);
    });

    function showNote(text, isSecret = false) {
        modalText.innerHTML = text; // Используем innerHTML для поддержки <br>
        if (isSecret) {
            modalText.style.textAlign = "left";
        } else {
            modalText.style.textAlign = "center";
        }
        noteModal.classList.remove('modal-hidden');
    }

    function closeNote() {
        noteModal.classList.add('modal-hidden');
    }

    modalCloseButton.addEventListener('click', closeNote);
    noteModal.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            closeNote();
        }
    });

    // Автовоспроизведение музыки при первом взаимодействии
    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true;
                musicToggleButton.textContent = '🎵';
            }).catch(error => {
                console.log("Autoplay was prevented.");
                musicToggleButton.textContent = '🔇';
            });
        }
        document.body.removeEventListener('click', playMusic);
    }
    document.body.addEventListener('click', playMusic);
});
