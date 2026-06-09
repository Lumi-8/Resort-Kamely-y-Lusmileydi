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