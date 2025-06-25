document.addEventListener('DOMContentLoaded', () => {

    // --- ВСЕ ЭЛЕМЕНТЫ ---
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const musicToggleButton = document.getElementById('music-toggle');
    const cat = document.getElementById('cat');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    // Элементы чата
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    // --- НАСТРОЙКИ ---
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;

    // --- "МОЗГ" КОТА: БАЗА ЗНАНИЙ С КЛЮЧЕВЫМИ СЛОВАМИ И ОТВЕТАМИ ---
    const dialogueRules = {
        'привет': ['Мррр... Привет, хозяйка!', 'Привет! Я как раз думал о тебе. И о еде.', 'Рад тебя видеть!'],
        'дела': ['Дела? Лежу, мурчу, виляю хвостом. Всё по плану!', 'Лучше всех! Особенно, если ты рядом.'],
        'люблю': ['И я тебя люблю! Больше, чем сон и даже больше, чем еду. Наверное.', 'Мурррррррррр ❤️'],
        'скучаю': ['Я тоже очень скучаю. Каждый день.', 'Не скучай, скоро будем вместе! Я верю.'],
        'soul': ['Да, это я!', 'Кто-то звал самого очаровательного кота на свете?'],
        'пиздюк': ['Эй! Это только братан меня так называет!', 'Сам такой! Но ладно, тебе можно.'],
        'кушать': ['Еда? Где? Я готов!', 'О, да! Моё любимое слово!'],
        'пока': ['Уже уходишь? Мяу... :(', 'Возвращайся скорее!']
    };
    const defaultResponses = [
        'Мяу?', 'Интересно... Расскажи еще.', 'Я тут задумался о вечности... и о вкусняшках.', 
        'Даже не знаю, что на это ответить, я же просто кот :)', 'Мррр...'
    ];

    // --- ФУНКЦИИ ЧАТА ---
    function displayMessage(text, sender) {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message', `${sender}-message`);
        messageBubble.innerHTML = `<div class="message-bubble">${text}</div>`;
        if(chatWindow) chatWindow.appendChild(messageBubble);
        if(chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getCatResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();
        for (const keyword in dialogueRules) {
            if (lowerCaseInput.includes(keyword)) {
                const responses = dialogueRules[keyword];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInput = chatInput.value.trim();
            if (userInput === '') return;
            displayMessage(userInput, 'user');
            chatInput.value = '';
            setTimeout(() => {
                const catResponse = getCatResponse(userInput);
                displayMessage(catResponse, 'cat');
            }, 1200);
        });
    }

    let firstChatOpen = true;
    const chatLink = document.querySelector('a[href="#chat"]');
    if (chatLink) {
        chatLink.addEventListener('click', () => {
            if(firstChatOpen && chatWindow){
                setTimeout(() => { displayMessage('Привет! Напиши мне что-нибудь...', 'cat'); }, 500);
                firstChatOpen = false;
            }
        });
    }

    cat.addEventListener('click', () => {
        if (!purrSound.paused) { purrSound.pause(); } 
        else { purrSound.currentTime = 0; purrSound.play(); }
    });
    
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) { backgroundMusic.play(); musicToggleButton.textContent = '🎵'; } 
        else { backgroundMusic.pause(); musicToggleButton.textContent = '🔇'; }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Управление видимостью кота
            if (targetId === '#chat') {
                document.body.classList.add('chat-active');
            } else {
                document.body.classList.remove('chat-active');
            }
            
            link.classList.add('active');
            document.querySelector(targetId).classList.add('active');
        });
    });

    let musicStarted = false;
    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                musicStarted = true; musicToggleButton.textContent = '🎵';
            }).catch(error => { musicToggleButton.textContent = '🔇'; });
        }
    }
    document.body.addEventListener('click', playMusic, { once: true });
});
