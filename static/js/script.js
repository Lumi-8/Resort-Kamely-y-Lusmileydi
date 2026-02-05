// 1. VIGILANTE DE PANTALLA COMPLETA
function checkFullscreen() {
    const isFull = window.innerHeight === screen.height;
    if (isFull) {
        document.body.classList.add('modo-f11');
    } else {
        document.body.classList.remove('modo-f11');
    }
}

// TODO EL CONTROL DE LA INTERFAZ DENTRO DEL DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded', () => {
    
   // --- SECCIÓN 2: CONTROL DE LA NAV BAR (INTELIGENTE & SCROLLSPY) ---
    let ultimaPosicionScroll = window.pageYOffset;
    let bloqueoScroll = false; 
    const nav = document.getElementById("navBar");
    const enlaces = document.querySelectorAll('.nav-links a');

    // A. LÓGICA PARA CLICS (Evita que la nav desaparezca al saltar a una sección)
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => {
            bloqueoScroll = true; 
            nav.classList.remove("nav-hidden"); 
            nav.style.setProperty("transform", "translate(-50%, 0)", "important");
            nav.style.setProperty("opacity", "1", "important");

            // Tiempo suficiente para que termine la animación de desplazamiento
            setTimeout(() => { bloqueoScroll = false; }, 1000); 
        });
    });

    // B. ÚNICA FUNCIÓN DE SCROLL
    window.addEventListener('scroll', () => {
        if (bloqueoScroll) return; // Si clicamos un link, pausamos esta lógica

        let scrollActual = window.pageYOffset || document.documentElement.scrollTop;
        let vh = window.innerHeight;

        // Activación del modo fijo al salir del Hero
        if (scrollActual > (vh * 0.95)) { 
            nav.classList.add("nav-fixed-top");

            // Mostrar/Ocultar suavemente según dirección
            if (scrollActual > vh + 100) { 
                if (scrollActual > ultimaPosicionScroll + 5) {
                    // Bajando: Esconder
                    nav.style.setProperty("transform", "translate(-50%, -160%)", "important");
                    nav.style.setProperty("opacity", "0", "important");
                } else if (scrollActual < ultimaPosicionScroll - 10) {
                    // Subiendo: Mostrar
                    nav.style.setProperty("transform", "translate(-50%, 0)", "important");
                    nav.style.setProperty("opacity", "1", "important");
                }
            }
        } else {
            // Reset total al volver al inicio (Hero)
            nav.classList.remove("nav-fixed-top");
            nav.style.removeProperty("transform");
            nav.style.removeProperty("opacity");
        }
        ultimaPosicionScroll = scrollActual;
    });

    // C. LÓGICA DE RESALTE (ScrollSpy)
    const secciones = document.querySelectorAll('section[id], header[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                enlaces.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, observerOptions);

    secciones.forEach(seccion => observer.observe(seccion));

    // --- SECCIÓN 3: CARRUSEL HERO PRINCIPAL ---
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
                resetTimer();
            };
            carousel.appendChild(card);
        }
    }

    nextBtn.onclick = () => { allData.push(allData.shift()); updateUI(); resetTimer(); };
    prevBtn.onclick = () => { allData.unshift(allData.pop()); updateUI(); resetTimer(); };

    let autoPlayInterval;
    const startTimer = () => autoPlayInterval = setInterval(() => nextBtn.click(), 6000);
    const stopTimer = () => clearInterval(autoPlayInterval);
    const resetTimer = () => { stopTimer(); startTimer(); };
    startTimer();
    carouselContainer.addEventListener('mouseenter', stopTimer);
    carouselContainer.addEventListener('mouseleave', startTimer);
    updateUI();

    // --- SECCIÓN 4: CARRUSEL HABITACIONES ---
    const roomImg = document.querySelector('#activeRoomImg');
    const roomName = document.querySelector('.esp-room-namehab');
    const roomDesc = document.querySelector('.esp-deschab');
    const roomNext = document.getElementById('roomNextBtn');
    const roomPrev = document.getElementById('roomPrevBtn');

    let roomsData = [
        { src: "static/images/habitacion con dos camas niver medio.jpg", title: "Suite Presidencial", desc: "Una experiencia inigualable con vista al mar y servicios exclusivos de primera clase." },
        { src: "static/images/habitacion estandar.jpg", title: "Junior Suite", desc: "Elegancia y confort en un espacio diseñado para el descanso perfecto y la intimidad." },
        { src: "static/images/habitacion nivel medio.jpg", title: "Habitación Deluxe", desc: "Vistas panorámicas y amenidades modernas para una estancia inolvidable..." }
    ];

    function updateRoomsUI() {
        const current = roomsData[0];
        roomImg.style.opacity = '0';
        setTimeout(() => {
            roomImg.src = current.src;
            roomName.innerHTML = current.title;
            roomDesc.textContent = current.desc;
            roomImg.style.opacity = '1';
        }, 400);
    }

    roomNext.onclick = () => { roomsData.push(roomsData.shift()); updateRoomsUI(); resetRoomsTimer(); };
    roomPrev.onclick = () => { roomsData.unshift(roomsData.pop()); updateRoomsUI(); resetRoomsTimer(); };

    let roomsAutoPlay;
    const startRoomsTimer = () => roomsAutoPlay = setInterval(() => roomNext.click(), 8000);
    const stopRoomsTimer = () => clearInterval(roomsAutoPlay);
    const resetRoomsTimer = () => { stopRoomsTimer(); startRoomsTimer(); };
    startRoomsTimer();

    const roomsContainer = document.querySelector('.habitaciones-gallery');
    if (roomsContainer) {
        roomsContainer.addEventListener('mouseenter', stopRoomsTimer);
        roomsContainer.addEventListener('mouseleave', startRoomsTimer);
    }
    updateRoomsUI();

    // --- SECCIÓN 5: RESTAURANTES Y OTROS ---
    const cardsRest = document.querySelectorAll('.card');
    cardsRest.forEach(card => {
        card.addEventListener('click', () => {
            cardsRest.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Inicialización Swiper (Si usas la librería externa)
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper(".mySwiper", {
            effect: "cards",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }
});