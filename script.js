document.addEventListener('DOMContentLoaded', function () {
    const folderPath = 'texts';
    const files = ['main.md', 'privacy_policy.md'];
    const contentDiv = document.getElementById('content');
    for (let file of files) {
        fetch(`${folderPath}/${file}`)
            .then(response => response.text())
            .then(text => {
                const html = marked.parse(text);
                const block = document.createElement('div');
                block.className = 'markdown-block';
                block.innerHTML = html;
                contentDiv.appendChild(block);
            });
    }

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
        let clickCount = 0;

        bubbleImage.addEventListener('click', () => {
            clickCount++;

            if (clickCount >= 3) {
                bubbleFooter.classList.add('hidden');
            }

            // проигрывание случайного звука
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            const audio = new Audio(randomSound);
            audio.play();
        });
    });
});
