document.addEventListener('DOMContentLoaded', () => {

    // --- ВСЕ ЭЛЕМЕНТЫ ---
    // ... (все ваши обычные элементы)
    
    // Элементы для звезд и воспоминаний
    const constellationsContainer = document.getElementById('constellations-container');
    const modal = document.getElementById('memory-modal');
    const modalCloseButton = document.querySelector('.modal-close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');


    // --- ВАШИ ВОСПОМИНАНИЯ (ТЕПЕРЬ С КООРДИНАТАМИ ОДНОЙ ЗВЕЗДЫ) ---
    const memories = [
        {
            id: 1,
            name: "Созвездие Квеста",
            description: "Наша первая встреча на квесте.",
            position: { x: 15, y: 25 }
        },
        {
            id: 2,
            name: "Созвездие Диалога",
            description: "Тут мы с тобой впервые списались.",
            position: { x: 80, y: 18 }
        },
        {
            id: 3,
            name: "Созвездие Волнения",
            description: "Тут я очень, ну очень нервничал прийти к тебе впервые.",
            position: { x: 50, y: 50 }
        },
        {
            id: 4,
            name: "Созвездие 'Мистер Серьезность'",
            description: "Тут я впервые пришел к тебе и строил из себя мистера серьезность.",
            position: { x: 20, y: 80 }
        },
        {
            id: 5,
            name: "Созвездие Нашего Секрета",
            description: "Тут я уже твой парень, но об этом знала только ты.",
            position: { x: 85, y: 75 }
        },
        {
            id: 6,
            name: "Созвездие Трех Слов",
            description: "Тут я, дрожа, словно маленький мальчик, говорю тебе, что я тебя люблю.",
            position: { x: 50, y: 88 }
        }
    ];


    // --- ФУНКЦИИ ---
    
    // Новая функция для создания случайных фоновых звезд
    function createStarrySky(numberOfStars) {
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            const sizeClass = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
            
            star.classList.add('star', sizeClass);
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            // Случайная задержка анимации для более естественного мерцания
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            constellationsContainer.appendChild(star);
        }
    }

    // Новая функция для создания звезд с воспоминаниями
    function createMemoryStars() {
        memories.forEach(memory => {
            const starElement = document.createElement('div');
            // Делаем звезды с воспоминаниями покрупнее, чтобы их было легче найти
            starElement.classList.add('star', 'large', 'memory-star');
            starElement.style.left = `${memory.position.x}%`;
            starElement.style.top = `${memory.position.y}%`;
            
            starElement.dataset.memoryId = memory.id;

            // Вешаем обработчик события только на эти звезды
            starElement.addEventListener('click', (e) => {
                // Останавливаем "всплытие" события, чтобы не сработали другие клики
                e.stopPropagation(); 
                const clickedMemory = memories.find(m => m.id === memory.id);
                showModal(clickedMemory);
            });

            constellationsContainer.appendChild(starElement);
        });
    }

    // Показ всплывающего окна
    function showModal(memory) {
        modalTitle.textContent = memory.name;
        modalDescription.textContent = memory.description;
        modal.style.display = 'block';
    }

    // Закрытие всплывающего окна
    function closeModal() {
        modal.style.display = 'none';
    }

    // ... (остальные ваши функции и обработчики для кота, музыки, навигации) ...
    // ... (здесь идет ваш код для `showCatThought`, обработчики музыки, навигации, кота)


    // --- ЗАПУСК ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ ---

    // Сначала создаем фоновое небо
    createStarrySky(150); // Можете поменять количество звезд

    // Затем создаем наши 6 особых звезд
    createMemoryStars();

    // ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ МОДАЛЬНОГО ОКНА
    modalCloseButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        // Закрываем окно, если клик был на темном фоне
        if (event.target == modal) { 
            closeModal(); 
        }
    });

    // ... (здесь идет ваш остальной код обработчиков)
});
