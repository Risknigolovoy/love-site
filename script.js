document.addEventListener('DOMContentLoaded', () => {

    // --- ОБЪЯВЛЕНИЕ ВСЕХ ЭЛЕМЕНТОВ ---
    const body = document.body;
    // Аудио
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const stormSound = document.getElementById('storm-sound');
    const allAmbientSounds = [backgroundMusic, stormSound]; // Массив фоновых звуков
    // Кнопки
    const musicToggleButton = document.getElementById('music-toggle');
    const weatherButtons = document.querySelectorAll('.weather-btn');
    // Остальные элементы
    const cat = document.getElementById('cat');
    const catBubble = document.getElementById('cat-bubble');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // --- НАСТРОЙКИ ---
    let firstClick = true;
    let phraseInterval;
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;
    stormSound.volume = 0.4;

    // --- ФУНКЦИИ ---

    // Функция для переключения фонового звука
    function playAmbientSound(soundToPlay) {
        allAmbientSounds.forEach(sound => sound.pause()); // Глушим все фоновые звуки
        if (soundToPlay) {
            soundToPlay.play().catch(e => console.log("Не удалось запустить аудио:", e));
        }
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // Обработчик для кнопок погоды
    weatherButtons.forEach(button => {
        button.addEventListener('click', () => {
            const weather = button.dataset.weather;
            
            if (weather === 'storm') {
                body.classList.add('storm-active');
                playAmbientSound(stormSound);
            } else { // 'clear'
                body.classList.remove('storm-active');
                playAmbientSound(backgroundMusic);
            }
        });
    });

    // ИСПРАВЛЕННАЯ ЛОГИКА для кнопки управления музыкой 🎵/🔇
    musicToggleButton.addEventListener('click', () => {
        // Если включаем основную музыку, погода всегда становится "Ясной"
        if (backgroundMusic.paused) {
            body.classList.remove('storm-active'); // Отключаем шторм
            playAmbientSound(backgroundMusic); // Включаем основную музыку
            musicToggleButton.textContent = '🎵';
        } else {
            // Просто выключаем основную музыку, не трогая погоду
            backgroundMusic.pause();
            musicToggleButton.textContent = '🔇';
        }
    });

    // Логика кота
    cat.addEventListener('click', () => {
        if (firstClick) {
            // ... (здесь без изменений) ...
        }
        if (!purrSound.paused) { purrSound.pause(); } 
        else { purrSound.currentTime = 0; purrSound.play(); }
    });
    
    // Логика навигации по вкладкам
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // ... (здесь без изменений) ...
        });
    });

    // Автоматическое включение основной музыки при первом взаимодействии
    let hasInteracted = false;
    function startMusicOnFirstInteraction() {
        if (!hasInteracted) {
            hasInteracted = true;
            backgroundMusic.play().then(() => {
                musicToggleButton.textContent = '🎵';
            }).catch(error => {
                console.log("Воспроизведение музыки заблокировано.");
                musicToggleButton.textContent = '🔇';
            });
        }
    }
    body.addEventListener('click', startMusicOnFirstInteraction, { once: true });
});
