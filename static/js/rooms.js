const roomsData = [
    {
        title: "Suite Presidencial",
        desc: "Disfrute de una estancia única con jacuzzi privado y una espectacular vista panorámica al mar.",
        price: "Desde $150 / Noche",
        bg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974",
        amenities: ["✨ Jacuzzi", "🍾 Minibar Premium", "🌊 Vista al Mar"]
    },
    {
        title: "Habitación Ejecutiva",
        desc: "Ambiente sofisticado y un espacio optimizado tanto para el descanso como para el trabajo remoto.",
        price: "Desde $95 / Noche",
        bg: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
        amenities: ["💼 Escritorio", "☕ Cafetera", "🔒 Caja Fuerte"]
    },
    {
        title: "Master Suite",
        desc: "El equilibrio perfecto entre elegancia y comodidad familiar, con salas independientes.",
        price: "Desde $120 / Noche",
        bg: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974",
        amenities: ["🧊 Neverita", "📺 Smart TV 65'", "🛋️ Sala Lounge"]
    }
];


function updateSuite(element, index) {
    const showcase = document.getElementById('showcase');
    const drawer = document.getElementById('carousel-drawer');
    const bg = document.getElementById('bg-premium');

    // A. Efecto de expansión
    element.classList.add('expanding');
    drawer.classList.add('fade-out');

    setTimeout(() => {
        // 1. Cambiar el fondo real
        bg.style.backgroundImage = `linear-gradient(rgba(10, 21, 37, 0.4), rgba(5, 12, 22, 0.95)), url(${roomsData[index].bg})`;
        
        // 2. EL TRUCO: Quitamos la clase 'active-in-bg' de todas y se la damos a la actual
        document.querySelectorAll('.room-card').forEach(c => {
            c.classList.remove('active-in-bg', 'expanding');
        });
        element.classList.add('active-in-bg'); // La tarjeta desaparece del carrusel

        // 3. Movemos el carrusel a la esquina y mostramos el texto
        showcase.classList.add('room-active');
        drawer.classList.remove('fade-out');
        
        // 4. Actualizar la info (título, descripción, precio, amenities)
        document.getElementById('room-title').innerText = roomsData[index].title;
        document.getElementById('room-desc').innerText = roomsData[index].desc;
        document.getElementById('room-price').innerText = roomsData[index].price;

        const amenitiesBox = document.getElementById('amenities-box');
        amenitiesBox.innerHTML = '';
        roomsData[index].amenities.forEach((a, i) => {
            const badge = document.createElement('div');
            badge.className = 'amenity-badge';
            badge.innerText = a;
            badge.style.animation = `popIn 0.4s ease both ${i * 0.08}s`;
            amenitiesBox.appendChild(badge);
        });

    }, 800); 
}

// Escuchadores de eventos para controlar el comportamiento del cursor de forma limpia
window.onload = () => {
    const bg = document.getElementById('bg-premium');
    if (bg) bg.style.backgroundImage = 'none';

    const drawer = document.getElementById('carousel-drawer');

    // Cuando el mouse entra al área del carrusel, si ya hay una habitación activa, vuelve al centro
    drawer.addEventListener('mouseenter', () => {
        const showcase = document.getElementById('showcase');
        if (showcase.classList.contains('room-active')) {
            drawer.classList.add('user-exploring');
        }
    });

    // Cuando el mouse sale por completo del carrusel colapsado, este se esconde de nuevo
    drawer.addEventListener('mouseleave', () => {
        drawer.classList.remove('user-exploring');
    });
};