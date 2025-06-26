document.addEventListener('DOMContentLoaded', () => {

    // --- ВСЕ ЭЛЕМЕНТЫ ---
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const musicToggleButton = document.getElementById('music-toggle');
    const catContainer = document.getElementById('cat-container'); // Контейнер для перетаскивания
    const cat = document.getElementById('cat'); // Сам кот для клика
    const catBubble = document.getElementById('cat-bubble'); // Облачко для фраз
    
    // Элементы новой навигации
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const dropdownNav = document.querySelector('.dropdown-nav'); // Получаем сам dropdown-nav
    const dropdownNavContent = document.getElementById('dropdown-nav-content');
    const navLinks = dropdownNavContent.querySelectorAll('.nav-link'); // Теперь ссылки внутри dropdown
    const pages = document.querySelectorAll('.page'); // Страницы остаются такими же

    // Элементы для новеллы
    const chapters = document.querySelectorAll('.chapter');
    const prevChapterBtn = document.getElementById('prev-chapter');
    const nextChapterBtn = document.getElementById('next-chapter');
    let currentChapterIndex = 0; 

    // --- НАСТРОЙКИ ГРОМКОСТИ ---
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;

    // --- ФРАЗЫ КОТА ---
    const catPhrases = [
        "Мррр... Привет, хозяйка!",
        "Я тут задумался о вечности... и о вкусняшках.",
        "Меня зовут Soul. Но братан величает меня Пиздюк :)",
        "Хозяйка, я люблю тебя!",
        "Веришь нет, я забыл, когда в последний раз ел...",
        "Мяу?",
        "Скучаю по тебе вместе с хозяином.",
        "Это сложный философский вопрос. Лучше давай о еде.",
        "Я просто кот. Я не могу все объяснить."
    ];

    let phraseInterval; // Переменная для хранения интервала фраз


    // --- ФУНКЦИИ НОВЕЛЛЫ ---
    function showChapter(index) {
        chapters.forEach((chapter, i) => {
            if (i === index) {
                chapter.classList.add('active-chapter');
            } else {
                chapter.classList.remove('active-chapter');
            }
        });

        if (prevChapterBtn) prevChapterBtn.disabled = index === 0;
        if (nextChapterBtn) nextChapterBtn.disabled = index === chapters.length - 1;

        localStorage.setItem('currentNovelChapter', index);
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // Переключение выпадающего меню навигации
    if (navToggleBtn && dropdownNav) { // Проверяем наличие обоих элементов
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события, чтобы не закрывалось сразу
            dropdownNav.classList.toggle('active');
        });

        // Закрываем меню при клике вне его
        document.addEventListener('click', (event) => {
            if (dropdownNav && !dropdownNav.contains(event.target)) {
                dropdownNav.classList.remove('active');
            }
        });
    }


    // Логика для переключения страниц при клике на ссылки в выпадающем меню
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetPage = document.querySelector(targetId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            link.classList.add('active');
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Закрываем выпадающее меню после выбора
            if (dropdownNav) {
                dropdownNav.classList.remove('active');
            }

            // Логика для новеллы при переключении на ее вкладку
            if (targetId === '#novel') {
                const savedChapterIndex = localStorage.getItem('currentNovelChapter');
                currentChapterIndex = savedChapterIndex !== null ? parseInt(savedChapterIndex, 10) : 0;
                showChapter(currentChapterIndex);
            } else {
                chapters.forEach(chapter => chapter.classList.remove('active-chapter'));
            }
        });
    });

    // Обработчик для мурчания кота
    if (cat) {
        cat.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие, чтобы не конфликтовать с перетаскиванием
            if (!purrSound.paused) { 
                purrSound.pause();
                purrSound.currentTime = 0; // Сбрасываем, чтобы начинать с начала
            } else { 
                purrSound.play();
            }

            // Показываем случайную фразу по клику, если уже не показывает
            if (catBubble && !catBubble.classList.contains('show')) {
                displayCatPhrase();
            }
        });
    }

    // Функция для отображения случайной фразы кота
    function displayCatPhrase() {
        if (!catBubble) return; // Проверяем, что облачко существует
        const randomIndex = Math.floor(Math.random() * catPhrases.length);
        catBubble.textContent = catPhrases[randomIndex];
        catBubble.classList.add('show');

        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            catBubble.classList.remove('show');
        }, 5000);
    }
    
    // Автоматическое появление фраз кота каждые 15-25 секунд
    // Очищаем предыдущий интервал, если он был
    if (phraseInterval) clearInterval(phraseInterval);
    phraseInterval = setInterval(() => {
        if (catBubble && !catBubble.classList.contains('show')) { // Показываем, только если не активно
            displayCatPhrase();
        }
    }, Math.random() * (25000 - 15000) + 15000); // Случайное время от 15 до 25 секунд


    // Управление фоновой музыкой
    if (musicToggleButton) {
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.paused) { backgroundMusic.play(); musicToggleButton.textContent = '🎵'; } 
            else { backgroundMusic.pause(); musicToggleButton.textContent = '🔇'; }
        });
    }

    // Обработчики кнопок новеллы
    if (prevChapterBtn) {
        prevChapterBtn.addEventListener('click', () => {
            if (currentChapterIndex > 0) {
                currentChapterIndex--;
                showChapter(currentChapterIndex);
            }
        });
    }

    if (nextChapterBtn) {
        nextChapterBtn.addEventListener('click', () => {
            if (currentChapterIndex < chapters.length - 1) {
                currentChapterIndex++;
                showChapter(currentChapterIndex);
            }
        });
    }

    // Автоматическое воспроизведение музыки при первом взаимодействии пользователя
    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true; 
                if (musicToggleButton) musicToggleButton.textContent = '🎵';
            }).catch(error => { 
                if (musicToggleButton) musicToggleButton.textContent = '🔇'; 
                console.log("Воспроизведение музыки заблокировано браузером. Требуется взаимодействие с пользователем.");
            });
        }
    }
    document.body.addEventListener('click', playMusic, { once: true });
    document.body.addEventListener('keydown', playMusic, { once: true });

    // Инициализация при загрузке страницы: показываем активную вкладку и правильную главу новеллы
    const initialActivePage = document.querySelector('.nav-link.active');
    if (initialActivePage) {
        const targetId = initialActivePage.getAttribute('href');
        const targetPage = document.querySelector(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        if (targetId === '#novel') {
            const savedChapterIndex = localStorage.getItem('currentNovelChapter');
            currentChapterIndex = savedChapterIndex !== null ? parseInt(savedChapterIndex, 10) : 0;
            showChapter(currentChapterIndex);
        } else {
            chapters.forEach(chapter => chapter.classList.remove('active-chapter'));
        }
    } else {
        // Если нет активной вкладки по умолчанию, активируем "Главная"
        document.querySelector('a[href="#home"]').click(); 
    }


    // --- ЛОГИКА ПЕРЕТАСКИВАНИЯ КОТА ---
    let isDragging = false;
    let offsetX, offsetY;

    if (catContainer) {
        catContainer.addEventListener('mousedown', (e) => {
            // Начинаем перетаскивание, только если клик был по catContainer, но не по самому коту
            // e.target - это элемент, на котором произошло событие
            if (e.target === catContainer || !cat.contains(e.target)) {
                isDragging = true;
                catContainer.classList.add('dragging');
                offsetX = e.clientX - catContainer.getBoundingClientRect().left;
                offsetY = e.clientY - catContainer.getBoundingClientRect().top;
                e.preventDefault(); // Предотвращаем стандартное поведение браузера (например, выделение текста)
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Ограничиваем перемещение границами экрана
            newX = Math.max(0, Math.min(newX, window.innerWidth - catContainer.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - catContainer.offsetHeight));

            catContainer.style.left = newX + 'px';
            catContainer.style.top = newY + 'px';
            catContainer.style.right = 'auto'; // Отключаем right, чтобы не конфликтовал с left
            catContainer.style.bottom = 'auto'; // Отключаем bottom, чтобы не конфликтовал с top
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                catContainer.classList.remove('dragging');
                // Сохраняем позицию в localStorage, чтобы кот оставался на месте после обновления
                localStorage.setItem('catPosX', catContainer.style.left);
                localStorage.setItem('catPosY', catContainer.style.top);
            }
        });

        // Инициализация позиции кота при загрузке страницы
        const savedCatPosX = localStorage.getItem('catPosX');
        const savedCatPosY = localStorage.getItem('catPosY');

        if (savedCatPosX && savedCatPosY) {
            catContainer.style.left = savedCatPosX;
            catContainer.style.top = savedCatPosY;
            catContainer.style.right = 'auto';
            catContainer.style.bottom = 'auto';
        } else {
            // Если позиция не сохранена, устанавливаем дефолтное положение через стили
            catContainer.style.right = '20px';
            catContainer.style.bottom = '10px';
            catContainer.style.left = 'auto';
            catContainer.style.top = 'auto';
        }

        // Для сенсорных устройств (мобильных)
        catContainer.addEventListener('touchstart', (e) => {
            if (e.target === catContainer || !cat.contains(e.target)) {
                isDragging = true;
                catContainer.classList.add('dragging');
                const touch = e.touches[0];
                offsetX = touch.clientX - catContainer.getBoundingClientRect().left;
                offsetY = touch.clientY - catContainer.getBoundingClientRect().top;
                e.preventDefault(); // Предотвращаем прокрутку страницы при касании
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            let newX = touch.clientX - offsetX;
            let newY = touch.clientY - offsetY;

            newX = Math.max(0, Math.min(newX, window.innerWidth - catContainer.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - catContainer.offsetHeight));

            catContainer.style.left = newX + 'px';
            catContainer.style.top = newY + 'px';
            catContainer.style.right = 'auto';
            catContainer.style.bottom = 'auto';
            e.preventDefault();
        });

        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                catContainer.classList.remove('dragging');
                localStorage.setItem('catPosX', catContainer.style.left);
                localStorage.setItem('catPosY', catContainer.style.top);
            }
        });
    }
});
