document.addEventListener('DOMContentLoaded', () => {

    // --- ВСЕ ЭЛЕМЕНТЫ ---
    const backgroundMusic = document.getElementById('background-music');
    const purrSound = document.getElementById('purr-sound');
    const musicToggleButton = document.getElementById('music-toggle');
    const cat = document.getElementById('cat');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    // --- НАСТРОЙКИ ---
    backgroundMusic.volume = 0.15;
    purrSound.volume = 1.0;

    // --- РАСШИРЕННЫЙ "МОЗГ" КОТА ---
    const dialogueRules = {
        // Приветствия
        'привет': ['Мррр... Привет, хозяйка!', 'Привет! Я как раз думал о тебе. И о еде.', 'Рад тебя видеть! Снова.', 'О, привет! Не отвлекай, я занят... Ладно, шучу, я всегда рад тебе!'],
        // Прощания
        'пока': ['Уже уходишь? Мяу... :(', 'Возвращайся скорее!', 'Буду ждать. И скучать.', 'Ну вот, только начали... Ладно, пока!'],
        // Дела
        'дела': ['Дела? Лежу, мурчу, виляю хвостом. Всё по плану!', 'Лучше всех! Особенно, если ты рядом.', 'Мои дела просты: поспать, поесть, снова поспать. Тяжелая работа!', 'В процессе созерцания энтропии вселенной. Ну или просто смотрю в стену.'],
        // Любовь и нежность
        'люблю': ['И я тебя люблю! Больше, чем сон и даже больше, чем еду. Наверное.', 'Мурррррррррр ❤️', 'Это взаимно! Ты — моя главная хозяйка во всей вселенной.', 'Приятно слышать! Моё мурчало сразу заработало на полную мощность.'],
        'скучаю': ['Я тоже очень скучаю. Каждый день. Иногда даже забываю поесть. На пару минут.', 'Не скучай, скоро будем вместе! Я верю.', 'Расстояние — это ерунда. Главное, что мы есть друг у друга.'],
        'красивая': ['Ты самая красивая! Я всем котам во дворе о тебе рассказываю.', 'Красота — это страшная сила. Особенно твоя!', 'Мяу! Смущаешь... но продолжай!'],
        // Вопросы коту
        'тебя зовут': ['Меня зовут Soul. Но для своих, как говорит братан, можно и Пиздюк.', 'Я — Soul. Душа этого сайта.'],
        'твой хозяин': ['Мой хозяин — самый лучший. Он создал этот мир для тебя.', 'Он сейчас где-то рядом, тоже скучает.'],
        'что делаешь': ['Лежу. Это моё основное занятие.', 'Планирую захват мира. Начну с дивана.', 'Смотрю на звезды и думаю о тебе.', 'Жду. Тебя, еду, новый день...'],
        'твой день': ['Мой день? Великолепно! Поспал 16 часов, остальное время отдыхал.', 'Как обычно: завтрак, сон, второй завтрак, снова сон...'],
        // Имена
        'soul': ['Да, это я!', 'Кто-то звал самого очаровательного кота на свете?', 'Слушаю и мурчу.'],
        'пиздюк': ['Эй! Это только братан меня так называет!', 'Сам такой! Но ладно, тебе можно.', 'Это мое секретное имя. Не говори никому!'],
        // Еда
        'кушать': ['Еда? Где? Я готов!', 'О, да! Моё любимое слово!', 'Так, от слов к делу. Где миска?'],
        'кормить': ['Пора! Давно пора!', 'Лучшая музыка для моих ушей!'],
        // Прочее
        'спасибо': ['Мур, пожалуйста!', 'Всегда рад помочь. Или просто полежать рядом.'],
        'почему': ['Почему? Потому что я кот. Это объясняет всё.', 'Это сложный философский вопрос. Лучше давай о еде.'],
        'погода': ['Погода? У меня всегда хорошая погода, когда ты пишешь.', 'Главное, чтобы не было дождя, когда я хочу посидеть на подоконнике.']
    };
    const defaultResponses = [
        'Мяу?', 'Интересно... Расскажи еще.', 'Я тут задумался о вечности... и о вкусняшках.', 
        'Даже не знаю, что на это ответить, я же просто кот :)', 'Мррр...', 'Продолжай, я внимательно слушаю.',
        'А что, если перевернуть мир с ног на голову? Будет интересно, наверное.', 'И что ты на это скажешь, хозяйка?'
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
