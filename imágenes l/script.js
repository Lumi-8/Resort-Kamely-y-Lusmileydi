// Base de datos simulada de empleados
const employeesDB = {
    'EMP001': {
        id: 'EMP001',
        name: 'Ana Martínez',
        password: 'limpio2024',
        position: 'Supervisora de Limpieza',
        shift: 'mañana',
        avatar: 'https://xavierferras.com/wp-content/uploads/2019/02/266-Persona.jpg',
        rooms: ['101', '102', '103', '104', '105'],
        tasks: [
            { id: 1, room: '101', type: 'Limpieza profunda', priority: 'alta', progress: 75, status: 'inprogress' },
            { id: 2, room: '102', type: 'Cambio de sábanas', priority: 'media', progress: 100, status: 'completed' },
            { id: 3, room: '103', type: 'Reposición amenities', priority: 'baja', progress: 30, status: 'pending' }
        ],
        schedule: [
            { time: '06:00', task: 'Inicio de turno - Reunión' },
            { time: '06:30', task: 'Inicio limpieza piso 1' },
            { time: '10:00', task: 'Descanso' },
            { time: '12:00', task: 'Verificación de habitaciones' }
        ],
        notifications: [
            { id: 1, message: 'Habitación 101 solicita limpieza urgente', type: 'urgent', time: '10:30' },
            { id: 2, message: 'Recordatorio: Reunión de equipo a las 14:00', type: 'info', time: '09:00' }
        ]
    },
    'EMP002': {
        id: 'EMP002',
        name: 'Carlos Ruiz',
        password: 'limpio2024',
        position: 'Personal de Limpieza',
        shift: 'tarde',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7c9Xa4RPzmm8HXBPfWUmPqklStSFZVIiKDA&s',
        rooms: ['201', '202', '203', '204'],
        tasks: [
            { id: 4, room: '201', type: 'Limpieza estándar', priority: 'media', progress: 50, status: 'inprogress' },
            { id: 5, room: '202', type: 'Limpieza de salida', priority: 'alta', progress: 0, status: 'pending' }
        ],
        schedule: [
            { time: '14:00', task: 'Inicio de turno' },
            { time: '14:30', task: 'Inicio limpieza piso 2' },
            { time: '18:00', task: 'Cena' },
            { time: '20:00', task: 'Preparación para cambio de turno' }
        ],
        notifications: [
            { id: 3, message: 'Habitación 202 check-out: limpieza prioritaria', type: 'urgent', time: '14:15' }
        ]
    },
    'EMP003': {
        id: 'EMP003',
        name: 'Laura Sánchez',
        password: 'limpio2024',
        position: 'Room Service',
        shift: 'mañana',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        rooms: ['301', '302', '303'],
        tasks: [
            { id: 6, room: '301', type: 'Servicio a habitación', priority: 'alta', progress: 100, status: 'completed' },
            { id: 7, room: '302', type: 'Reposición minibar', priority: 'media', progress: 60, status: 'inprogress' }
        ],
        schedule: [
            { time: '06:00', task: 'Inicio de turno' },
            { time: '07:00', task: 'Preparación carros de servicio' },
            { time: '11:00', task: 'Entrega de pedidos' }
        ],
        notifications: []
    },
    'EMP004': {
        id: 'EMP004',
        name: 'Pedro Gómez',
        password: 'limpio2024',
        position: 'Lavandería',
        shift: 'noche',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        rooms: ['Lavandería'],
        tasks: [
            { id: 8, room: 'Lavandería', type: 'Procesar ropa de cama', priority: 'media', progress: 80, status: 'inprogress' },
            { id: 9, room: 'Lavandería', type: 'Toallas y albornoces', priority: 'alta', progress: 40, status: 'inprogress' }
        ],
        schedule: [
            { time: '22:00', task: 'Inicio de turno' },
            { time: '23:00', task: 'Recepción de ropa sucia' },
            { time: '02:00', task: 'Descanso' },
            { time: '04:00', task: 'Inicio de planchado' }
        ],
        notifications: []
    }
};

// Variable global para el empleado actual
let currentEmployee = null;

// Función para manejar el login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;
    const workShift = document.getElementById('workShift').value;
    
    // Verificar credenciales
    const employee = employeesDB[employeeId];
    
    if (employee && employee.password === password && employee.shift === workShift) {
        currentEmployee = employee;
        
        // Ocultar login y mostrar dashboard
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'grid';
        
        // Cargar datos del empleado
        loadEmployeeData();
        updateCurrentDate();
        startRealTimeUpdates();
    } else {
        alert('Credenciales incorrectas o turno no coincide. Por favor, verifica tus datos.');
    }
});

// Función para cargar datos del empleado
function loadEmployeeData() {
    if (!currentEmployee) return;
    
    // Cargar perfil en sidebar
    document.querySelector('.employee-profile').innerHTML = `
        <img src="${currentEmployee.avatar}" alt="${currentEmployee.name}" class="profile-avatar">
        <h3 class="profile-name">${currentEmployee.name}</h3>
        <p class="profile-position">${currentEmployee.position}</p>
        <span class="profile-id">ID: ${currentEmployee.id}</span>
    `;
    
    // Cargar mensaje de bienvenida
    document.getElementById('welcomeMessage').innerHTML = `
        <h1>¡Bienvenido, ${currentEmployee.name.split(' ')[0]}!</h1>
        <p>${getTimeBasedGreeting()} - Turno de ${currentEmployee.shift}</p>
    `;
    
    // Cargar indicador de turno
    document.getElementById('shiftIndicator').innerHTML = `
        <i class="fas fa-clock"></i>
        <span>Turno: ${currentEmployee.shift.charAt(0).toUpperCase() + currentEmployee.shift.slice(1)}</span>
    `;
    
    // Cargar notificaciones
    updateNotificationBadge();
    
    // Cargar todas las secciones
    loadDashboardSection();
    loadTasksSection();
    loadScheduleSection();
    loadRoomsSection();
    loadReportsSection();
}

// Función para obtener saludo basado en hora
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
}

// Función para actualizar fecha
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.innerHTML = `<i class="far fa-calendar-alt"></i> ${now.toLocaleDateString('es-ES', options)}`;
}

// Función para cargar dashboard
function loadDashboardSection() {
    if (!currentEmployee) return;
    
    const tasks = currentEmployee.tasks;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length;
    
    const dashboardHTML = `
        <section class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-tasks"></i></div>
                <div class="stat-info">
                    <h3>Tareas Asignadas</h3>
                    <p class="stat-number">${tasks.length}</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info">
                    <h3>Completadas</h3>
                    <p class="stat-number">${completedTasks}</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-spinner"></i></div>
                <div class="stat-info">
                    <h3>En Progreso</h3>
                    <p class="stat-number">${inProgressTasks}</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-clock"></i></div>
                <div class="stat-info">
                    <h3>Pendientes</h3>
                    <p class="stat-number">${pendingTasks}</p>
                </div>
            </div>
        </section>
        
        <section class="quick-tasks">
            <h2><i class="fas fa-bolt"></i> Tareas Prioritarias</h2>
            <div class="tasks-grid">
                ${tasks.filter(t => t.priority === 'alta').map(task => `
                    <div class="task-card" onclick="showTaskDetails(${task.id})">
                        <div class="task-header">
                            <h3 class="task-room">Habitación ${task.room}</h3>
                            <span class="task-priority priority-high">Alta Prioridad</span>
                        </div>
                        <p>${task.type}</p>
                        <div class="task-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${task.progress}%"></div>
                            </div>
                            <small>${task.progress}% completado</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    
    document.getElementById('dashboardSection').innerHTML = dashboardHTML;
}

// Función para cargar tareas
function loadTasksSection() {
    if (!currentEmployee) return;
    
    const tasksHTML = `
        <section>
            <div class="section-header">
                <h2><i class="fas fa-clipboard-list"></i> Mis Tareas del Día</h2>
                <div class="filter-options">
                    <select onchange="filterTasks(this.value)">
                        <option value="all">Todas las tareas</option>
                        <option value="pending">Pendientes</option>
                        <option value="inprogress">En progreso</option>
                        <option value="completed">Completadas</option>
                        

                </select>
                </div>
            </div>
            <div class="tasks-list">
                ${currentEmployee.tasks.map(task => `
                    <div class="task-item status-${task.status}">
                        <span>Habitación ${task.room} - ${task.type}</span>
                        <button onclick="showTaskDetails(${task.id})">Ver detalles</button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    document.getElementById('tasksSection').innerHTML = tasksHTML;
}

// --- FUNCIONES FALTANTES PARA EVITAR ERRORES ---

function loadScheduleSection() {
    if (!currentEmployee) return;
    const scheduleHTML = currentEmployee.schedule.map(item => `
        <div class="schedule-item">
            <strong>${item.time}</strong>: ${item.task}
        </div>
    `).join('');
    document.getElementById('scheduleSection').innerHTML = `<h2>Horario</h2>${scheduleHTML}`;
}

function loadRoomsSection() {
    if (!currentEmployee) return;
    const roomsHTML = currentEmployee.rooms.map(room => `<li>Habitación ${room}</li>`).join('');
    document.getElementById('roomsSection').innerHTML = `<h2>Habitaciones Asignadas</h2><ul>${roomsHTML}</ul>`;
}

function loadReportsSection() {
    document.getElementById('reportsSection').innerHTML = `<h2>Reportes</h2><p>No hay reportes nuevos.</p>`;
}

function updateNotificationBadge() {
    const count = currentEmployee.notifications.length;
    const badge = document.getElementById('notificationBadge');
    if (badge) badge.innerText = count;
}

function startRealTimeUpdates() {
    console.log("Iniciando actualizaciones en tiempo real...");
    // Aquí podrías poner un setInterval si fuera necesario
}

// Función para manejar los clics en el menú de navegación (suponiendo que existe)
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}