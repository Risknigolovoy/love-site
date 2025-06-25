document.addEventListener('DOMContentLoaded', () => {
    // --- ЭЛЕМЕНТЫ ---
    const body = document.body;
    const backgroundMusic = document.getElementById('background-music');
    const stormSound = document.getElementById('storm-sound');
    const purrSound = document.getElementById('purr-sound');
    const weatherButtons = document.querySelectorAll('.weather-btn');
    const weatherEffectsContainer = document.getElementById('weather-effects');
    const musicToggleButton = document.getElementById('music-toggle');
    // ... (остальные элементы без изменений)

    // --- НАСТРОЙКИ ---
    let rainInterval; // Переменная для интервала создания капель

    // --- ФУНКЦИИ ---

    // Создание одной капли дождя
    function createRainDrop() {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${Math.random() * 100}vw`;
        
        const duration = Math.random() * 0.5 + 0.3; // Случайная скорость падения
        drop.style.animationDuration = `${duration}s`;
        
        weatherEffectsContainer.appendChild(drop);
        
        // Удаляем каплю после того, как она упала, чтобы не засорять DOM
        setTimeout(() => {
            drop.remove();
        }, duration * 1000);
    }

    // Включение/выключение дождя
    function setWeather(weatherType) {
        if (weatherType === 'storm') {
            body.classList.add('storm-active');
            if (!rainInterval) {
                rainInterval = setInterval(createRainDrop, 50); // Создаем капли каждые 50мс
            }
            // Включаем звук шторма, выключаем фоновую музыку
            backgroundMusic.pause();
            stormSound.play();
        } else { // 'clear'
            body.classList.remove('storm-active');
            clearInterval(rainInterval);
            rainInterval = null;
            // Включаем фоновую музыку, выключаем звук шторма
            stormSound.pause();
            if (musicToggleButton.textContent === '🎵') { // Включаем, только если она не была на паузе
                backgroundMusic.play();
            }
        }
    }

    // --- ОБРАБОТЧИКИ ---

    // Кнопки погоды
    weatherButtons.forEach(button => {
        button.addEventListener('click', () => {
            setWeather(button.dataset.weather);
        });
    });

    // Кнопка музыки (исправленная логика)
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            // Если включаем музыку, погода всегда становится ясной
            setWeather('clear');
            backgroundMusic.play();
            musicToggleButton.textContent = '🎵';
        } else {
            backgroundMusic.pause();
            musicToggleButton.textContent = '🔇';
        }
    });

    // ... (весь остальной код для кота и навигации остается таким же) ...
});
