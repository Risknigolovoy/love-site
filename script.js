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
        // Удалить старую мысль, если она есть
        const existingBubble = document.querySelector('.cat-thought-bubble');
        if (existingBubble) {
            existingBubble.remove();
        }

        // Создать новую мысль
        const thoughtBubble = document.createElement('div');
        thoughtBubble.classList.add('cat-thought-bubble');
        const randomThought = catThoughts[Math.floor(Math.random() * catThoughts.length)];
        thoughtBubble.textContent = randomThought;
        
        catContainer.appendChild(thoughtBubble);

        // Мысль исчезнет сама через 5 секунд (анимация в CSS)
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
        } else {
            purrSound.currentTime = 0;
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
            
            // Скрыть меню после выбора
            mainNav.classList.remove('show');

            // Управление активными классами
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

    // Автовоспроизведение музыки при первом взаимодействии
    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true;
                musicToggleButton.textContent = '🎵';
            }).catch(error => {
                musicToggleButton.textContent = '🔇';
            });
        }
    }
    document.body.addEventListener('click', playMusic, { once: true });
});
