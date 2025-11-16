// =============================================================================
// MENÚ HAMBURGUESA - Para dispositivos móviles
// =============================================================================

// Seleccionar los elementos del menú en la página
const hamburger = document.querySelector('.hamburger');  // Ícono de 3 rayitas ☰
const navMenu = document.querySelector('.nav-menu');     // Lista de opciones del menú

// Cuando hagan clic en el ícono de hamburguesa ☰
hamburger.addEventListener('click', () => {
    // Alternar (prender/apagar) la clase 'active'
    hamburger.classList.toggle('active');  // Cambia el ícono a X
    navMenu.classList.toggle('active');    // Muestra/oculta el menú
});

// Cuando hagan clic en cualquier opción del menú
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    // Cerrar el menú automáticamente
    hamburger.classList.remove('active');  // Vuelve el ícono a ☰
    navMenu.classList.remove('active');    // Oculta el menú
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