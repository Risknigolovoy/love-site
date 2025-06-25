document.addEventListener('DOMContentLoaded', () => {

    // --- Настройки аудио ---
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');

    backgroundMusic.volume = 0.2; // Музыка стала еще тише
    purrSound.volume = 1.0;

    // --- Логика для кота ---
    const cat = document.getElementById('cat');
    const catBubble = document.getElementById('cat-bubble');
    let firstClick = true; // Флаг для отслеживания первого клика
    let phraseInterval; // Переменная для интервала с фразами

    const catPhrases = [
        "Хозяйка, я люблю тебя!",
        "Окак...",
        "Веришь нет, я забыл, когда в последний раз ел...",
        "Меня зовут Soul, но братан величает меня Пиздюк :)",
        "Мррр... Скучаю по тебе вместе с хозяином."
    ];

    // По клику на кота
    cat.addEventListener('click', () => {
        // Логика для самого первого клика
        if (firstClick) {
            catBubble.classList.remove('show'); // Прячем подсказку "Жмякни на меня"
            firstClick = false; // Меняем флаг, чтобы это больше не повторялось

            // Запускаем появление случайных фраз ТОЛЬКО ПОСЛЕ первого клика
            phraseInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * catPhrases.length);
                catBubble.textContent = catPhrases[randomIndex];
                catBubble.classList.add('show');
                setTimeout(() => {
                    catBubble.classList.remove('show');
                }, 5000);
            }, 15000);
        }

        // Логика мурчания (работает при каждом клике)
        if (!purrSound.paused) {
            purrSound.pause();
        } else {
            purrSound.currentTime = 0;
            purrSound.play();
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
            }).catch(error => {
                console.log("Воспроизведение музыки заблокировано. Нужно действие пользователя.");
            });
        }
    }
    document.body.addEventListener('click', playMusic);
    document.body.addEventListener('keydown', playMusic);
});
