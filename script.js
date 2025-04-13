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
    });

    // Log the full URL
    console.log("Full URL (href):", window.location.href);

    // Log just the path
    console.log("Pathname:", window.location.pathname);

    // Log the origin
    console.log("Origin:", window.location.origin);

    // Log the protocol
    console.log("Protocol:", window.location.protocol);

    // Log the host
    console.log("Host:", window.location.host);
});
