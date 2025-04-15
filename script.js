document.addEventListener('DOMContentLoaded', function () {

    // для блоков
    const folderPath = 'texts';
    const files = ['main.md', 'privacy_policy.md'];
    const contentDiv = document.getElementById('content');
    const filePromises = files.map(file => {
        return fetch(`${folderPath}/${file}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                const html = marked.parse(text);
                const block = document.createElement('div');
                block.className = 'markdown-block';
                block.innerHTML = html;
                contentDiv.appendChild(block);
            })
            .catch(error => {
                console.error(error);
                const errorBlock = document.createElement('div');
                errorBlock.className = 'markdown-block error';
                errorBlock.textContent = `Error loading content: ${error.message}`;
                contentDiv.appendChild(errorBlock);
            });
    });
    // ждем загрузки (асинхронность ебет мозги)
    Promise.all(filePromises)
        .then(() => {
            const markdownBlocks = document.querySelectorAll('.markdown-block');
            markdownBlocks.forEach(block => {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            block.classList.add('visible');
                            observer.unobserve(block);
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(block);
            });
        })
        .catch(error => {
            console.error('An error occurred while loading markdown files:', error);
        });

    // Добавляем футер
    fetch('templates/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.createElement('div');
            footerContainer.className = 'footer';
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer);
        });
    // загрузка кота строителя
    fetch('templates/cat_builder.html')
    .then(response => response.text())
    .then(data => {
        const floatContainer = document.createElement('div');
        floatContainer.className = 'float-image';
        floatContainer.innerHTML = data;
        document.body.appendChild(floatContainer);

        // список звуков
        const sounds = [
            'sound/hitt-1.mp3',
            'sound/hitt-2.mp3',
            'sound/meow-1.mp3',
            'sound/meow-2.mp3',
            'sound/meow-3.mp3',
            'sound/meow-4.mp3',
            'sound/purreow-1.mp3',
            'sound/purreow-2.mp3'
        ];

        // удаление кота строителя на третий клик и проигрывание звука
        const bubbleImage = document.querySelector('.bubble-image');
        const bubbleFooter = document.querySelector('.footer-bubble');
        const cancelButton = document.querySelector('.cancel-button');
        let clickCount = 0;

        bubbleImage.addEventListener('click', () => {
            clickCount++;

            if (clickCount >= 3) {
                bubbleFooter.classList.add('hidden');
                cancelButton.classList.add('show');
            }

            // проигрывание случайного звука
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            const audio = new Audio(randomSound);
            audio.play();
        });
        cancelButton.addEventListener('click', () => {
            bubbleFooter.classList.remove('hidden');
            cancelButton.classList.remove('show');
            clickCount = 0;
        });
    });

    // для анимации кнопки при прилипании
    const button = document.getElementById('invite_button');
    let isStuck = false;
    function checkSticky() {
        const rect = button.getBoundingClientRect();
        if (rect.top <= 10 && !isStuck) {
            button.classList.add('stuck');
            isStuck = true;
        } else if (rect.top > 10 && isStuck) {
            button.classList.remove('stuck');
            isStuck = false;
        }
    }
    window.addEventListener('scroll', checkSticky);

    // смешной кот
    const logoImg = document.querySelector('.logo-image');
    const joyCat = document.querySelector('.joy-cat');
    let clickCount = 0;
    logoImg.addEventListener('click', () => {
        if (joyCat.classList.contains('show')) {
            joyCat.classList.remove('show');
            console.log('класс удален');
        }
        clickCount++;

        console.log(`клик ${clickCount}`);

        if (clickCount >= 3) {
            clickCount = 0;
            joyCat.classList.add('show');
            console.log('сброшено');
            new Audio('sound/udar-ot-vzgliada-skaly.mp3').play();
        }
    });
});
