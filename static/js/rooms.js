const roomsData = [
    {
        title: "Suite Presidencial",
        desc: "Disfrute de una estancia única con jacuzzi privado y una espectacular vista panorámica al mar.",
        price: "Desde $150 / Noche",
        bg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974",
        amenities: ["✨ Jacuzzi", "🍾 Minibar", "🌊 Mar"]
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
        amenities: ["🧊 Neverita", "📺 Smart TV", "🛋️ Lounge"]
    }
];

function updateSuite(element, index) {
    const showcase = document.getElementById('showcase');
    const bg = document.getElementById('bg-premium');

    bg.style.backgroundImage = `url(${roomsData[index].bg})`;
    
    document.querySelectorAll('.room-card').forEach(c => c.classList.remove('active-in-bg'));
    element.classList.add('active-in-bg');

    showcase.classList.add('room-active');
    
    document.getElementById('room-title').innerText = roomsData[index].title;
    document.getElementById('room-desc').innerText = roomsData[index].desc;
    document.getElementById('room-price').innerText = roomsData[index].price;

    const box = document.getElementById('amenities-box');
    box.innerHTML = '';
    roomsData[index].amenities.forEach(a => {
        const span = document.createElement('div');
        span.className = 'amenity-badge';
        span.innerText = a;
        box.appendChild(span);
    });
}

window.onload = () => {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    toggle.onclick = () => {
        toggle.classList.toggle('active');
        links.classList.toggle('mobile-open');
    };

    const drawer = document.getElementById('carousel-drawer');
    drawer.onmouseenter = () => {
        if(document.getElementById('showcase').classList.contains('room-active'))
            drawer.classList.add('user-exploring');
    };
    drawer.onmouseleave = () => drawer.classList.remove('user-exploring');
};