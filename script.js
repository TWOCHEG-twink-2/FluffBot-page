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

    // --- иницилизация ---
    await loadMarkdownContent();
    setupIntersectionObserver();
    await loadFooter();
    await loadCatBuilder();
    setupStickyButton();
    setupJoyCat();
});
