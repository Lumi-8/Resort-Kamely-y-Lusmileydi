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


// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos los elementos principales
    const mainImg = document.querySelector('#activeImg');
    const mainTitle = document.querySelector('.main-title');
    const mainDesc = document.querySelector('.hero-description');
    const carousel = document.querySelector('.hero-carousel');
    const cards = document.querySelectorAll('.hero-carousel .card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Base de datos de contenido (Asegúrate de que las rutas coincidan con tu HTML)
    const contentData = {
        "static/images/pisina frente al mar.jpg": {
            title: "K'LOGICS<br>RESORT",
            desc: "Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure..."
        },
        "static/images/vevida refrescante.jpg": {
            title: "REFRESHING<br>DRINKS",
            desc: "Disfruta de nuestra coctelería premium con ingredientes locales frente al mar."
        },
        "static/images/cama en la plya.jpg": {
            title: "COASTAL<br>COMFORT",
            desc: "Relajación total en nuestras áreas exclusivas diseñadas para tu descanso."
        },
        "static/images/cabade vinos.jpg": {
            title: "EXCLUSIVE<br>CELLAR",
            desc: "Una selección internacional de vinos conservados en las mejores condiciones."
        }
    };

    // Función para cambiar la imagen y el texto
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const imgElement = card.querySelector('img');
            if (!imgElement) return;

            const imgPath = imgElement.getAttribute('src');
            const info = contentData[imgPath];

            if (info) {
                // Efecto de transición suave
                mainImg.style.opacity = '0';
                
                setTimeout(() => {
                    mainImg.src = imgPath;
                    mainTitle.innerHTML = info.title;
                    mainDesc.textContent = info.desc;
                    mainImg.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Control de las flechas (Scroll lateral)
    if (nextBtn && prevBtn && carousel) {
        nextBtn.addEventListener('click', () => {
            // Movemos el scroll el ancho de una card + el gap (aprox 145px)
            carousel.scrollBy({ left: 145, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -145, behavior: 'smooth' });
        });
    }
});