// =============================================================================
// MENÚ HAMBURGUESA - Para dispositivos móviles
// =============================================================================

// Seleccionar elementos del DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Agregar evento click al ícono hamburguesa
hamburger.addEventListener('click', () => {
    // Alternar (toggle) la clase 'active' en ambos elementos
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace de navegación
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    // Remover clase 'active' para ocultar el menú
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// =============================================================================
// SCROLL SUAVE - Para enlaces de ancla (#)
// =============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir comportamiento por defecto
        
        // Obtener el elemento destino del ancla
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Scroll suave hacia el elemento
            target.scrollIntoView({
                behavior: 'smooth', // Desplazamiento suave
                block: 'start' // Alinear al inicio del elemento
            });
        }
    });
});

// =============================================================================
// MENSAJES FLASH - Ocultar automáticamente después de 5 segundos
// =============================================================================

setTimeout(() => {
    const flashMessages = document.querySelector('.flash-messages');
    if (flashMessages) {
        // Agregar transición de opacidad
        flashMessages.style.transition = 'opacity 0.5s ease';
        flashMessages.style.opacity = '0';
        
        // Eliminar del DOM después de la transición
        setTimeout(() => flashMessages.remove(), 500);
    }
}, 5000); // 5000 milisegundos = 5 segundos

// =============================================================================
// VALIDACIÓN DE FECHAS - En formulario de reserva
// =============================================================================

const fechaEntrada = document.querySelector('input[name="fecha_entrada"]');
const fechaSalida = document.querySelector('input[name="fecha_salida"]');

// Solo ejecutar si los elementos existen en la página
if (fechaEntrada && fechaSalida) {
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    fechaEntrada.min = today;
    
    // Cuando cambie la fecha de entrada, actualizar mínima de salida
    fechaEntrada.addEventListener('change', () => {
        fechaSalida.min = fechaEntrada.value;
    });
}