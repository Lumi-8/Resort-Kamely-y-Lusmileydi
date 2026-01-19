// 1. VIGILANTE DE PANTALLA COMPLETA (Para el ajuste de F11)
function checkFullscreen() {
    // Detecta si el navegador ocupa todo el monitor
    const isFull = window.innerHeight === screen.height;
    
    if (isFull) {
        document.body.classList.add('modo-f11');
    } else {
        document.body.classList.remove('modo-f11');
    }
}

// 2. CONTROL DE LA NAV BAR (Subir al hacer scroll)
window.onscroll = function() {
    const nav = document.getElementById("navBar");
    const scrollActual = window.pageYOffset || document.documentElement.scrollTop;

    // Aumentamos a 150 para que no salte al primer roce
    if (scrollActual > 150) {
        nav.classList.add("nav-fixed-top");
    } else {
        nav.classList.remove("nav-fixed-top");
    }
};

// 3. CARRUSEL DE IMÁGENES
document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.querySelector('#activeImg');
    const mainTitle = document.querySelector('.main-title');
    const mainDesc = document.querySelector('.hero-description');
    const carousel = document.querySelector('.hero-carousel');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const carouselContainer = document.querySelector('.hero-content-right');

    let allData = [
        { src: "static/images/pisina frente al mar.jpg", title: "K'LOGICS<br>RESORT", desc: "Nagano Prefecture..." },
        { src: "static/images/vevida refrescante.jpg", title: "REFRESHING<br>DRINKS", desc: "Disfruta de nuestra coctelería..." },
        { src: "static/images/cama en la plya.jpg", title: "COASTAL<br>COMFORT", desc: "Relajación total..." },
        { src: "static/images/cabade vinos.jpg", title: "EXCLUSIVE<br>CELLAR", desc: "Vinos internacionales..." }
    ];

    function updateUI() {
        const current = allData[0];
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = current.src;
            mainTitle.innerHTML = current.title;
            mainDesc.textContent = current.desc;
            mainImg.style.opacity = '1';
        }, 300);

        carousel.innerHTML = '';
        for (let i = 1; i < allData.length; i++) {
            const item = allData[i];
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<img src="${item.src}" alt="Thumbnail">`;
            
            card.onclick = () => {
                const movedItems = allData.splice(0, i + 1);
                const selected = movedItems.pop();
                allData.push(...movedItems);
                allData.unshift(selected);
                updateUI();
                resetTimer(); // Reiniciamos el tiempo si el usuario hace clic
            };
            carousel.appendChild(card);
        }
    }

    nextBtn.onclick = () => {
        const first = allData.shift();
        allData.push(first);
        updateUI();
        resetTimer();
    };

    prevBtn.onclick = () => {
        const last = allData.pop();
        allData.unshift(last);
        updateUI();
        resetTimer();
    };

    // --- Lógica de Auto-Play integrada ---
    let autoPlayInterval;

    const startTimer = () => {
        autoPlayInterval = setInterval(() => {
            nextBtn.click();
        }, 6000);
    };

    const stopTimer = () => clearInterval(autoPlayInterval);

    const resetTimer = () => {
        stopTimer();
        startTimer();
    };

    // Iniciar auto-play
    startTimer();

    // Pausar al pasar el mouse
    carouselContainer.addEventListener('mouseenter', stopTimer);
    carouselContainer.addEventListener('mouseleave', startTimer);

    updateUI();
});