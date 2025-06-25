document.addEventListener('DOMContentLoaded', () => {

    // --- Настройки аудио ---
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const musicToggleButton = document.getElementById('music-toggle');

    backgroundMusic.volume = 0.15; // Музыка стала еще тише
    purrSound.volume = 1.0;

    // --- Логика для кота ---
    const cat = document.getElementById('cat');
    const catBubble = document.getElementById('cat-bubble');
    let firstClick = true;
    let phraseInterval;

    const catPhrases = [
        "Хозяйка, я люблю тебя!", "Окак...", "Веришь нет, я забыл, когда в последний раз ел...",
        "Меня зовут Soul, но братан величает меня Пиздюк :)", "Мррр... Скучаю по тебе вместе с хозяином."
    ];

    cat.addEventListener('click', () => {
        if (firstClick) {
            catBubble.classList.remove('show');
            firstClick = false;
            phraseInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * catPhrases.length);
                catBubble.textContent = catPhrases[randomIndex];
                catBubble.classList.add('show');
                setTimeout(() => { catBubble.classList.remove('show'); }, 5000);
            }, 15000);
        }
        if (!purrSound.paused) { purrSound.pause(); } 
        else { purrSound.currentTime = 0; purrSound.play(); }
    });
    
    // --- НОВАЯ ЛОГИКА: Управление музыкой ---
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicToggleButton.textContent = '🔇';
        }
    });

    // --- Логика навигации по вкладкам ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            link.classList.add('active');
            document.querySelector(targetId).classList.add('active');
        });
    });

    // --- Автоматическое включение фоновой музыки ---
    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true;
                musicToggleButton.textContent = '🎵'; // Обновляем иконку, если музыка включилась
            }).catch(error => {
                console.log("Воспроизведение музыки заблокировано. Нужно действие пользователя.");
                musicToggleButton.textContent = '🔇'; // Показываем, что музыка выключена
            });
        }
    }
    document.body.addEventListener('click', playMusic);
    document.body.addEventListener('keydown', playMusic);
});
