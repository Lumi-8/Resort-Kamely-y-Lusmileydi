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
window.addEventListener('scroll', function() {
    const nav = document.getElementById("navBar");
    // Si bajamos más de 100px activamos el modo flotante
    if (window.scrollY > 100) {
        nav.classList.add("nav-fixed-top");
    } else {
        nav.classList.remove("nav-fixed-top");
    }
});
// 3. CARRUSEL DE IMÁGENES
document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.querySelector('#activeImg');
    const mainTitle = document.querySelector('.main-title');
    const mainDesc = document.querySelector('.hero-description');
    const carousel = document.querySelector('.hero-carousel');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const carouselContainer = document.querySelector('.hero-content-right');

    // --- LÓGICA SECCIÓN HABITACIONES ---
const roomImg = document.querySelector('#activeRoomImg');
const roomName = document.querySelector('.esp-room-namehab');
const roomDesc = document.querySelector('.esp-deschab');
const roomNext = document.getElementById('roomNextBtn');
const roomPrev = document.getElementById('roomPrevBtn');

let roomsData = [
    { 
        src: "static/images/habitacion con dos camas niver medio.jpg", 
        title: "Suite Presidencial", 
        desc: "Una experiencia inigualable con vista al mar y servicios exclusivos de primera clase." 
    },
    { 
        src: "static/images/habitacion estandar.jpg", 
        title: "Junior Suite", 
        desc: "Elegancia y confort en un espacio diseñado para el descanso perfecto y la intimidad." 
    },
    { 
        src: "static/images/habitacion nivel medio.jpg", 
        title: "Habitación Deluxe", 
        desc: "Vistas panorámicas y amenidades modernas para una estancia inolvidable en el corazón del resort." 
    }
];

function updateRoomsUI() {
    const current = roomsData[0];

    // Transición suave de salida
    roomImg.style.opacity = '0';
    
    setTimeout(() => {
        roomImg.src = current.src;
        roomName.innerHTML = current.title;
        roomDesc.textContent = current.desc;
        roomImg.style.opacity = '1';
    }, 400);
}

// Botón Siguiente (Flecha Abajo)
roomNext.onclick = () => {
    const first = roomsData.shift();
    roomsData.push(first);
    updateRoomsUI();
};

// Botón Anterior (Flecha Arriba)
roomPrev.onclick = () => {
    const last = roomsData.pop();
    roomsData.unshift(last);
    updateRoomsUI();
}// --- Lógica de Auto-Play para HABITACIONES ---
    let roomsAutoPlay;

    const startRoomsTimer = () => {
        roomsAutoPlay = setInterval(() => {
            roomNext.click(); // Simula el clic en la flecha de abajo
        }, 8000); // 8 segundos (un poco más lento que el de arriba para dejar leer)
    };

    const stopRoomsTimer = () => clearInterval(roomsAutoPlay);

    const resetRoomsTimer = () => {
        stopRoomsTimer();
        startRoomsTimer();
    };

    // Iniciar el temporizador de habitaciones
    startRoomsTimer();

    // Pausar si el usuario pone el ratón sobre la galería de habitaciones
    const roomsContainer = document.querySelector('.habitaciones-gallery');
    if (roomsContainer) {
        roomsContainer.addEventListener('mouseenter', stopRoomsTimer);
        roomsContainer.addEventListener('mouseleave', startRoomsTimer);
    }

    // --- RECUERDA añadir resetRoomsTimer() en los clics manuales ---
    roomNext.addEventListener('click', resetRoomsTimer);
    roomPrev.addEventListener('click', resetRoomsTimer);;

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
    // ... (después de las líneas de addEventListener del mouse)

    updateUI();      // Activa el carrusel principal
    updateRoomsUI(); // <--- AÑADE ESTA LÍNEA para activar las habitaciones
});
// script.js (lógica de las tarjetas del carrusel de los restaurantes)
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Quitamos 'active' de todas y se la damos a la clickeada
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});
var swiper = new Swiper(".mySwiper", {
    effect: "cards", // Este es el efecto de cartas apiladas que querías
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
