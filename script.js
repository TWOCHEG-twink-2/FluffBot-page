document.addEventListener('DOMContentLoaded', async function () {
    // --- загрузка контента ---
    async function loadMarkdownContent() {
        const folderPath = 'texts';
        const files = ['main.md', 'to_support.md', 'privacy_policy.md'];
        const contentDiv = document.getElementById('content');

        for (const file of files) {
            try {
                const response = await fetch(`${folderPath}/${file}`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}: ${response.status}`);
                }
                const text = await response.text();
                const html = marked.parse(text);
                const block = document.createElement('div');
                block.className = 'markdown-block';
                block.innerHTML = html;
                contentDiv.appendChild(block);
            } catch (error) {
                console.error(error);
                const errorBlock = document.createElement('div');
                errorBlock.className = 'markdown-block error';
                errorBlock.textContent = `Error loading content: ${error.message}`;
                contentDiv.appendChild(errorBlock);
            }
        }
    }
    // --- анимации появления блоков ---
    function setupIntersectionObserver() {
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
    }

    // --- загрузка футера ---
    async function loadFooter() {
        try {
            const response = await fetch('templates/footer.html');
            if (!response.ok) {
                throw new Error(`Failed to load footer: ${response.status}`);
            }
            const data = await response.text();
            const footerContainer = document.createElement('div');
            footerContainer.className = 'footer';
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer);
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    // --- кот строитель ---
    async function loadCatBuilder() {
        try {
            const response = await fetch('templates/cat_builder.html');
            if (!response.ok) {
                throw new Error(`Failed to load cat builder: ${response.status}`);
            }
            const data = await response.text();
            const floatContainer = document.createElement('div');
            floatContainer.className = 'float-image';
            floatContainer.innerHTML = data;
            document.body.appendChild(floatContainer);

            // --- звуки клика ---
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

                const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
                const audio = new Audio(randomSound);
                audio.play();
            });

            cancelButton.addEventListener('click', () => {
                bubbleFooter.classList.remove('hidden');
                cancelButton.classList.remove('show');
                clickCount = 0;
            });
        } catch (error) {
            console.error('Error loading cat builder:', error);
        }
    }

    // --- анимация при прилипании кнопки ---
    function setupStickyButton() {
        const button = document.getElementById('invite_button');
        const panel = document.querySelector('.panel');
        let isStuck = false;

        function checkSticky() {
            const rect = button.getBoundingClientRect();
            if (rect.top <= 10 && !isStuck) {
                button.classList.add('stuck');
                panel.classList.add('show');
                isStuck = true;
            } else if (rect.top > 10 && isStuck) {
                button.classList.remove('stuck');
                panel.classList.remove('show');
                isStuck = false;
            }
        }

        window.addEventListener('scroll', checkSticky);
    }

    // --- смешной кот ---
    function setupJoyCat() {
        const logoImg = document.querySelector('.logo-image');
        const joyCat = document.querySelector('.joy-cat');
        let clickCount = 0;

        logoImg.addEventListener('click', () => {
            if (joyCat.classList.contains('show')) {
                joyCat.classList.remove('show');
            }
            clickCount++;

            if (clickCount >= 3) {
                clickCount = 0;
                joyCat.classList.add('show');
                new Audio('sound/udar-ot-vzgliada-skaly.mp3').play();
            }
        });
    }

    // --- размер панели ---
    function setupPanel() {
        function adjustPanelHeight() {
            const panel = document.querySelector('.panel');
            const inviteButton = document.getElementById('invite_button');
        
            if (panel && inviteButton) {
                const inviteButtonRect = inviteButton.getBoundingClientRect();
                const panelHeight = inviteButtonRect.bottom + 15;
                panel.style.height = `${panelHeight}px`;
            }
        }
        adjustPanelHeight();
        window.addEventListener('scroll', adjustPanelHeight);
        window.addEventListener('resize', adjustPanelHeight);
    }


    // function setupDonors() {
    //     const donorsDiv = document.getElementById('donors');

    //     // Загрузка данных о донатерах
    //     fetch('https://api.donationalerts.com/v1/alerts/donations', {
    //         headers: {
    //             'Authorization': 'Bearer YOUR_API_KEY' // Замените YOUR_API_KEY на реальный ключ
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data && data.length > 0) {
    //             // Создаем сетку для донатеров
    //             const grid = document.createElement('div');
    //             grid.className = 'contributor-grid';

    //             // Для каждого донатера создаем карточку
    //             data.forEach(donation => {
    //                 const card = document.createElement('div');
    //                 card.className = 'contributor-card';

    //                 const img = document.createElement('img');
    //                 img.src = 'default_avatar.png';
    //                 img.alt = donation.name || 'Donor';
    //                 img.className = 'avatar';

    //                 const info = document.createElement('div');
    //                 info.className = 'contributor-info';

    //                 const name = document.createElement('span');
    //                 name.className = 'contributor-name';
    //                 name.textContent = donation.name || 'Аноним';

    //                 const desc = document.createElement('p');
    //                 desc.className = 'contributor-description';
    //                 desc.textContent = 'Поддержал нас!';

    //                 // Собираем карточку
    //                 info.appendChild(name);
    //                 info.appendChild(desc);
    //                 card.appendChild(img);
    //                 card.appendChild(info);
    //                 grid.appendChild(card);
    //             });

    //             donorsDiv.appendChild(grid);
    //         } else {
    //             donorsDiv.innerHTML = '<p>нас пока никто не поддержал 😥</p>';
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Ошибка загрузки донатеров:', error);
    //         donorsDiv.innerHTML = '<p>нас пока никто не поддержал 😥</p>';
    //     });
    // }

    // --- иницилизация ---
    await loadMarkdownContent();
    setupIntersectionObserver();
    await loadFooter();
    await loadCatBuilder();
    setupStickyButton();
    setupJoyCat();
    setupPanel();
    // setupDonors();
});
