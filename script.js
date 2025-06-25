document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const musicToggleButton = document.getElementById('music-toggle');
    const cat = document.getElementById('cat');
    const catBubble = document.getElementById('cat-bubble');
    let firstClick = true;
    let phraseInterval;
    const catPhrases = [
        "Хозяйка, я люблю тебя!", "Окак...", "Веришь нет, я забыл, когда в последний раз ел...",
        "Меня зовут Soul, но братан величает меня Пиздюк :)", "Мррр... Скучаю по тебе вместе с хозяином."
    ];
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;

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
    
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggleButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicToggleButton.textContent = '🔇';
        }
    });

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

    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true;
                musicToggleButton.textContent = '🎵';
            }).catch(error => {
                console.log("Воспроизведение музыки заблокировано. Нужно действие пользователя.");
                musicToggleButton.textContent = '🔇';
            });
        }
    }
    document.body.addEventListener('click', playMusic);
    document.body.addEventListener('keydown', playMusic);
});
