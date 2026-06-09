// Mapeo ordenado de los 3 restaurantes oficiales
const ordenRestaurantes = ['dominicano', 'colombiano', 'japones'];
let subfiltroActual = 'todos';

// Selectores base de los subfiltros
const botonesSubfiltro = document.querySelectorAll('.btn-subfiltro');

// ================= CONTROLADORES INTERNOS DEL MENÚ BASE =================
function actualizarEstructuraMenu(restauranteSeleccionado) {
  // 1. Mostrar el bloque de restaurante seleccionado y ocultar los demás
  ordenRestaurantes.forEach(res => {
    const contenedorGrupo = document.getElementById(`menu-${res}`);
    if (contenedorGrupo) {
      if (res === restauranteSeleccionado) {
        contenedorGrupo.classList.add('active');
      } else {
        contenedorGrupo.classList.remove('active');
      }
    }
  });

  // 2. Filtrar los componentes internos (las tarjetas de platos) según el subfiltro activo
  const grupoActivo = document.getElementById(`menu-${restauranteSeleccionado}`);
  if (grupoActivo) {
    const tarjetasDePlatos = grupoActivo.querySelectorAll('.card-producto');
    tarjetasDePlatos.forEach(card => {
      const tipoPlato = card.dataset.tipo;
      if (subfiltroActual === 'todos' || tipoPlato === subfiltroActual) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

// ================= INICIALIZACIÓN DE SWIPER (EDICIÓN ESTÁTICA) =================
const swiper = new Swiper('.swiper-restaurantes', {
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: false,                 /* Estabilidad total lineal para 3 elementos */
  speed: 600,                  /* Desplazamiento fino y controlado */
  
  // 🚫 ELIMINADO EL AUTOPLAY Y BLOQUEADO EL ARRASTRE DE CURSOR:
  simulateTouch: false,        /* Deshabilita por completo el arrastre con el mouse */
  allowTouchMove: false,       /* Deshabilita movimientos de deslizamiento manual */
  slideToClickedSlide: true,   /* Permite navegar haciendo CLIC en los elementos laterales */

  coverflowEffect: {
    rotate: 15,
    stretch: 8,
    depth: 130,
    modifier: 1,
    slideShadows: false,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    slideChange: function () {
      const restauranteSeleccionado = ordenRestaurantes[this.activeIndex];
      if (restauranteSeleccionado) {
        actualizarEstructuraMenu(restauranteSeleccionado);
      }
    }
  }
});

// ================= LISTENERS PARA LOS SUBFILTROS GENERALES =================
botonesSubfiltro.forEach(boton => {
  boton.addEventListener('click', (e) => {
    botonesSubfiltro.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    subfiltroActual = e.target.dataset.tipo;
    
    // Obtener qué restaurante está actualmente centrado en el Swiper
    const restauranteSeleccionado = ordenRestaurantes[swiper.activeIndex];
    actualizarEstructuraMenu(restauranteSeleccionado);
  });
});

// ================= DISPARO INICIAL INDEPENDIENTE =================
document.addEventListener('DOMContentLoaded', () => {
  actualizarEstructuraMenu('dominicano'); // Carga el menú dominicano de forma nativa al inicio
});

// Permitir navegación al hacer clic directamente sobre las tarjetas del carrusel
document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
  slide.addEventListener('click', () => {
    swiper.slideTo(index);
  });
});

// ====== DETECTOR DE SCROLL PARA COLAPSO HORIZONTAL TÉLESCOPICO ======
// ==========================================================================
// ================= CONTROL DE NAVBAR Y MENÚ FLOTANTE ======================
// ==========================================================================
// ==========================================================================
// ============ CONTROL SEPARADO DE NAVBAR ESTÉTICA Y MINI NAVBAR ===========
// ==========================================================================
const navbarPrincipal = document.querySelector('.navbar-premium');
const botonHamburguesa = document.querySelector('.hamburger');
const miniNavDesplegable = document.querySelector('.mini-nav-desplegable');

// 1. Efecto estético: Encoger la barra al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    if (navbarPrincipal) navbarPrincipal.classList.add('scrolled');
  } else {
    if (navbarPrincipal) {
      navbarPrincipal.classList.remove('scrolled');
      // Por seguridad, si sube arriba limpiamos los estados de apertura
      navbarPrincipal.classList.remove('hamburger-active');
      if (miniNavDesplegable) miniNavDesplegable.classList.remove('active');
    }
  }
});

// 2. Interacción real: Desplegar la mini navbar independiente al hacer clic
if (botonHamburguesa) {
  botonHamburguesa.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic se propague por el documento
    
    // Alternamos la clase en la mini navbar para que aparezca/desaparezca
    if (miniNavDesplegable) miniNavDesplegable.classList.toggle('active');
    
    // Alternamos una clase en la navbar principal SOLO para animar las líneas a X
    if (navbarPrincipal) navbarPrincipal.classList.toggle('hamburger-active');
  });
}

// Cierre inteligente: Si el menú está abierto y clicamos fuera de él, se cierra
document.addEventListener('click', (e) => {
  if (miniNavDesplegable && miniNavDesplegable.classList.contains('active')) {
    if (!miniNavDesplegable.contains(e.target) && !botonHamburguesa.contains(e.target)) {
      miniNavDesplegable.classList.remove('active');
      if (navbarPrincipal) navbarPrincipal.classList.remove('hamburger-active');
    }
  }
});