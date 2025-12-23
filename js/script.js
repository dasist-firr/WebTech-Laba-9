document.addEventListener('DOMContentLoaded', function() {
    const openingCrawl = document.getElementById('opening-crawl');
    const content = document.getElementById('content');

    // Эффект печати текста (опционально — можно отключить, если не нужен)
    const crawlText = document.querySelector('#titlecontent');
    if (crawlText) {
        const originalText = crawlText.innerHTML;
        crawlText.innerHTML = '';
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                crawlText.innerHTML += originalText.charAt(i) === '\n' ? '<br>' : originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50); // Печать по символам
    }

    // Через 96 секунд (длительность анимации + запас) — убираем заставку
    setTimeout(() => {
        openingCrawl.style.opacity = '0';
        openingCrawl.style.pointerEvents = 'none';
        openingCrawl.style.transition = 'opacity 2s ease-out';

        // Показываем основной контент
        setTimeout(() => {
            openingCrawl.style.display = 'none';
            content.style.display = 'block';

            // Лёгкая анимация появления
            content.style.opacity = '0';
            content.style.transition = 'opacity 1.5s ease-in';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        }, 2000);
    }, 25000); // 96 секунд = 90 (анимация) + 4 (задержка) + 2 (плавное исчезновение)

    // Обработка формы (на других страницах её не будет, но это безопасно)
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Сообщение от ${name} отправлено в штаб Повстанцев. Передаём через гиперпространство...`);
            form.reset();
        });
    }

    // Эффект мерцания звёзд при движении мыши
    document.body.addEventListener('mousemove', function(e) {
        if (content.style.display === 'block') { // Только когда контент виден
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.left = e.pageX + 'px';
            star.style.top = e.pageY + 'px';
            star.style.boxShadow = '0 0 5px white';
            star.style.pointerEvents = 'none';
            star.style.transition = 'opacity 1s';
            document.body.appendChild(star);

            setTimeout(() => {
                star.style.opacity = '0';
                setTimeout(() => star.remove(), 1000);
            }, 200);
        }
    });
});
