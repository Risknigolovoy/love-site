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

    // --- ФУНКЦИИ ---
    function showCatThought() {
        const existingBubble = document.querySelector('.cat-thought-bubble');
        if (existingBubble) { existingBubble.remove(); }
        const thoughtBubble = document.createElement('div');
        thoughtBubble.classList.add('cat-thought-bubble');
        thoughtBubble.textContent = catThoughts[Math.floor(Math.random() * catThoughts.length)];
        catContainer.appendChild(thoughtBubble);
        setTimeout(() => { thoughtBubble.remove(); }, 5000);
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---
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
    const connectButton = document.getElementById('connect-stars-button');

    if (constellationSVG) {
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
        
        // Новые, более точные координаты Большой Медведицы
        const starCoords = [
            { x: 680, y: 150 }, { x: 550, y: 120 }, { x: 410, y: 180 }, { x: 270, y: 220 },
            { x: 150, y: 350 }, { x: 300, y: 400 }, { x: 420, y: 320 }
        ];
        const lineConnections = [ [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3] ];
        let visitedStars = new Set();
        let lines = [];

        lineConnections.forEach((conn, index) => {
            const p1 = starCoords[conn[0]];
            const p2 = starCoords[conn[1]];
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', p1.x);
            line.setAttribute('y1', p1.y);
            line.setAttribute('x2', p2.x);
            line.setAttribute('y2', p2.y);
            line.classList.add('constellation-line');
            constellationSVG.appendChild(line);
            lines.push(line);
        });

        starCoords.forEach((coord, index) => {
            const group = document.createElementNS(svgNS, 'g');
            group.classList.add('star-group');
            
            const star = document.createElementNS(svgNS, 'circle');
            star.setAttribute('cx', coord.x);
            star.setAttribute('cy', coord.y);
            star.setAttribute('r', 8);
            star.classList.add('star');
            star.id = `star-${index}`;
            
            const hitbox = document.createElementNS(svgNS, 'circle');
            hitbox.setAttribute('cx', coord.x);
            hitbox.setAttribute('cy', coord.y);
            hitbox.setAttribute('r', 20); // Увеличенная область клика
            hitbox.classList.add('star-hitbox');
            
            group.appendChild(star);
            group.appendChild(hitbox);
            
            group.addEventListener('click', () => {
                if(star.classList.contains('visited')) return; // Не показывать снова, если уже посещена
                
                showNote(memories[index]);
                star.classList.add('visited');
                visitedStars.add(index);
                
                if (visitedStars.size === memories.length) {
                    connectButton.disabled = false;
                }
            });
            constellationSVG.appendChild(group);
        });

        function showNote(text, isSecret = false) {
            modalText.innerHTML = text;
            modalText.style.textAlign = isSecret ? "left" : "center";
            noteModal.classList.remove('modal-hidden');
        }

        function closeNote() { noteModal.classList.add('modal-hidden'); }

        modalCloseButton.addEventListener('click', closeNote);
        noteModal.addEventListener('click', (e) => {
            if (e.target === noteModal) { closeNote(); }
        });

        connectButton.addEventListener('click', () => {
            connectButton.disabled = true;
            let totalDelay = 0;
            const lineDrawDuration = 2000; // 2 секунды на линию

            lines.forEach((line, index) => {
                setTimeout(() => {
                    const length = Math.sqrt(Math.pow(line.x2.baseVal.value - line.x1.baseVal.value, 2) + Math.pow(line.y2.baseVal.value - line.y1.baseVal.value, 2));
                    line.style.strokeDasharray = length;
                    line.style.strokeDashoffset = length;
                    line.classList.add('drawing');
                    // Запускаем анимацию
                    setTimeout(() => line.style.strokeDashoffset = 0, 50);
                }, totalDelay);
                totalDelay += lineDrawDuration;
            });
            
            // Показываем секретное письмо после анимации последней линии
            setTimeout(() => {
                showNote(secretLetter, true);
            }, totalDelay);
        });
    }

    // Автовоспроизведение музыки
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
