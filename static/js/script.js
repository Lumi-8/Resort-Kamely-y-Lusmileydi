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
const bg = document.getElementById("mainBg");
const next = document.getElementById("nextBtn");
const prev = document.getElementById("prevBtn");

// Aquí pones los nombres de tus fotos reales
const hotelImages = [
    'url("img/foto1.jpg")',
    'url("img/foto2.jpg")',
    'url("img/foto3.jpg")'
];

let i = 0;

if(next && prev) { // Verifica que los botones existan antes de asignarles la función
    next.onclick = () => {
        i = (i + 1) % hotelImages.length;
        bg.style.backgroundImage = hotelImages[i];
    };

    prev.onclick = () => {
        i = (i - 1 + hotelImages.length) % hotelImages.length;
        bg.style.backgroundImage = hotelImages[i];
    };
}

// Activar el detector de F11 al cambiar tamaño de ventana
window.addEventListener('resize', checkFullscreen);
checkFullscreen(); // Ejecuta una vez al cargar
