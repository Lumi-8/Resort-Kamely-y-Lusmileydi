from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Inicializar la aplicación Flask
app = Flask(__name__)
app.secret_key = 'tu_clave_secreta_aqui'  # Necesaria para mensajes flash

# =============================================================================
# BASE DE DATOS SIMULADA (en una app real usarías SQLite, PostgreSQL, etc.)
# =============================================================================

# Datos de las habitaciones del resort
habitaciones = [
    {
        'id': 1,
        'nombre': 'Habitación Standard',
        'descripcion': 'Habitación cómoda con vista al jardín',
        'precio': 150,
        'imagen': 'habitacion1.jpg'
    },
    {
        'id': 2,
        'nombre': 'Suite Deluxe',
        'descripcion': 'Suite espaciosa con vista al mar',
        'precio': 300,
        'imagen': 'habitacion2.jpg'
    },
    {
        'id': 3,
        'nombre': 'Villa Privada',
        'descripcion': 'Villa exclusiva con piscina privada',
        'precio': 500,
        'imagen': 'habitacion3.jpg'
    }
]

# Servicios disponibles en el resort
servicios = [
    'Spa y bienestar',
    'Piscina infinity', 
    'Restaurante gourmet',
    'Actividades acuáticas',
    'Tour guiado',
    'Wi-Fi gratuito'
]

# =============================================================================
# RUTAS DE LA APLICACIÓN
# =============================================================================

@app.route('/')
def index():
    """
    Ruta principal - Página de inicio
    Renderiza el template index.html y pasa los datos de habitaciones y servicios
    """
    return render_template('index.html', 
                         habitaciones=habitaciones, 
                         servicios=servicios)

@app.route('/reservar', methods=['POST'])
def reservar():
    """
    Ruta para procesar reservas
    Recibe datos del formulario via POST
    """
    if request.method == 'POST':
        # Obtener datos del formulario
        nombre = request.form['nombre']
        email = request.form['email']
        telefono = request.form['telefono']
        fecha_entrada = request.form['fecha_entrada']
        fecha_salida = request.form['fecha_salida']
        habitacion_id = int(request.form['habitacion'])
        personas = request.form['personas']
        
        # =====================================================================
        # EN UNA APP REAL AQUÍ HARÍAS:
        # - Guardar en base de datos
        # - Enviar email de confirmación
        # - Validar disponibilidad
        # - Procesar pago
        # =====================================================================
        
        # Mostrar mensaje de confirmación al usuario
        flash(f'¡Reserva recibida! Te contactaremos pronto, {nombre}.')
        return redirect(url_for('index'))

@app.route('/contacto', methods=['POST'])
def contacto():
    """
    Ruta para procesar mensajes de contacto
    """
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['email']
        mensaje = request.form['mensaje']
        
        # =====================================================================
        # EN UNA APP REAL AQUÍ ENVIARÍAS EL EMAIL:
        # - Configurar servidor SMTP
        # - Crear y enviar email
        # =====================================================================
        
        flash('¡Mensaje enviado! Te responderemos pronto.')
        return redirect(url_for('index'))

# Punto de entrada de la aplicación
if __name__ == '__main__':
    # debug=True permite:
    # - Recarga automática al guardar cambios
    # - Mensajes de error detallados
    app.run(debug=True)