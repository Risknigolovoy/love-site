document.addEventListener('DOMContentLoaded', () => {

    // --- Логика для кота ---
    const cat = document.getElementById('cat');
    const catBubble = document.getElementById('cat-bubble');
    const purrSound = document.getElementById('purr-sound');

    const catPhrases = [
        "Хозяйка, я люблю тебя!",
        "Окак...",
        "Веришь нет, я забыл, когда в последний раз ел...",
        "Меня зовут Soul, но братан величает меня Пиздюк :)",
        "Мррр... Скучаю по тебе вместе с хозяином."
    ];

    // По клику на кота - мурчание
    cat.addEventListener('click', () => {
        purrSound.currentTime = 0; // Начать сначала, если уже играет
        purrSound.play();
    });

    // Кот говорит случайную фразу каждые 15 секунд
    setInterval(() => {
        // Выбираем случайную фразу
        const randomIndex = Math.floor(Math.random() * catPhrases.length);
        catBubble.textContent = catPhrases[randomIndex];

        // Показываем сообщение
        catBubble.classList.add('show');

        // Прячем сообщение через 5 секунд
        setTimeout(() => {
            catBubble.classList.remove('show');
        }, 5000);

    }, 15000); // 15000 миллисекунд = 15 секунд

    // --- Логика навигации по вкладкам ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем стандартный переход по ссылке

            const targetId = link.getAttribute('href'); // Получаем #home или #messages

            // Убираем класс 'active' у всех ссылок и страниц
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Добавляем класс 'active' нужной ссылке и странице
            link.classList.add('active');
            document.querySelector(targetId).classList.add('active');
        });
    });

    // --- Автоматическое включение фоновой музыки ---
    // Современные браузеры блокируют авто-воспроизведение звука.
    // Этот код попытается включить музыку после первого действия пользователя на странице.
    const backgroundMusic = document.getElementById('background-music');
    let musicStarted = false;

    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true;
            }).catch(error => {
                console.log("Воспроизведение заблокировано браузером. Нужно взаимодействие с пользователем.");
            });
        }
    }
    
    // Пытаемся запустить музыку при любом клике на странице
    document.body.addEventListener('click', playMusic);
    document.body.addEventListener('keydown', playMusic);
});
