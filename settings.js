function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    
    // Actualizar el valor del select
    document.getElementById('themeSelect').value = theme;
    
    // Aplicar los colores del tema
    const isDarkTheme = theme === 'dark';
    document.documentElement.style.setProperty('--background-color', isDarkTheme ? '#2d3436' : '#f5f6fa');
    document.documentElement.style.setProperty('--text-color', isDarkTheme ? '#f5f6fa' : '#2d3436');
    document.documentElement.style.setProperty('--card-background', isDarkTheme ? '#636e72' : '#ffffff');
    
    // Ajustar el color del texto en la barra lateral
    document.documentElement.style.setProperty('--sidebar-text-color', isDarkTheme ? '#ffffff' : '#2d3436');
}

function applyCustomColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--secondary-color', adjustColor(color, 20));
    localStorage.setItem('customColor', color);
    
    // Ajustar el color del texto según el brillo del color personalizado
    const textColor = getContrastColor(color);
    document.documentElement.style.setProperty('--sidebar-text-color', textColor);
    
    // Mostrar feedback al usuario
    showFeedback('Color aplicado');
}

function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function getContrastColor(hexcolor) {
    // Si el color es undefined o null, devolver blanco
    if (!hexcolor) return '#ffffff';
    
    // Convertir el color hexadecimal a RGB
    const r = parseInt(hexcolor.substr(1,2),16);
    const g = parseInt(hexcolor.substr(3,2),16);
    const b = parseInt(hexcolor.substr(5,2),16);
    
    // Calcular el brillo (fórmula YIQ)
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    
    // Devolver negro o blanco dependiendo del brillo
    return (yiq >= 128) ? '#2d3436' : '#ffffff';
}

function loadSettings() {
    const theme = localStorage.getItem('theme') || 'light';
    const customColor = localStorage.getItem('customColor') || '#6c5ce7';
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';

    document.getElementById('themeSelect').value = theme;
    document.getElementById('customColor').value = customColor;
    document.getElementById('notificationsToggle').checked = notificationsEnabled;

    applyTheme(theme);
    applyCustomColor(customColor);
}

function showSettingsInfo(topic) {
    const infoElement = document.getElementById('settingsInfo');
    let content = '';

    switch (topic) {
        case 'profile':
            content = `
                <h3>Perfil de Usuario</h3>
                <p><strong>Nombre de usuario:</strong> ${getCurrentUser().username}</p>
                <p><strong>Correo electrónico:</strong> ${getCurrentUser().email}</p>
                <p><strong>Contraseña:</strong> ********</p>
                <button onclick="changeUsername()">Cambiar nombre de usuario</button>
                <button onclick="changePassword()">Cambiar contraseña</button>
            `;
            break;
        case 'privacy':
            content = `
                <h3>Política de Privacidad</h3>
                <p>En TroincLab, nos comprometemos a proteger tu privacidad y tus datos personales. Recopilamos y utilizamos tu información solo para mejorar nuestros servicios y tu experiencia en la plataforma.</p>
                <p>No compartimos tu información personal con terceros sin tu consentimiento explícito.</p>
            `;
            break;
        case 'services':
            content = `
                <h3>Nuestros Servicios</h3>
                <p>TroincLab ofrece una variedad de servicios para ayudarte a organizar tu tiempo y aumentar tu productividad:</p>
                <ul>
                    <li>Planificación semanal de tareas</li>
                    <li>Recordatorios y notificaciones personalizadas</li>
                    <li>Análisis de productividad</li>
                    <li>Integración con calendarios externos</li>
                </ul>
            `;
            break;
        case 'terms':
            content = `
                <h3>Términos y Condiciones</h3>
                <p>Al utilizar TroincLab, aceptas cumplir con nuestros términos y condiciones. Estos incluyen:</p>
                <ul>
                    <li>Usar la plataforma de manera ética y legal</li>
                    <li>No compartir tu cuenta con otros usuarios</li>
                    <li>Respetar los derechos de propiedad intelectual de TroincLab</li>
                    <li>Mantener la confidencialidad de tu información de inicio de sesión</li>
                </ul>
            `;
            break;
    }

    infoElement.innerHTML = content;
}

function getCurrentUser() {
    // Esta función debería obtener la información del usuario actual desde el servidor
    // Por ahora, devolveremos datos de ejemplo
    return {
        username: 'usuario_ejemplo',
        email: 'usuario@ejemplo.com'
    };
}

function changeUsername() {
    const newUsername = prompt('Ingresa tu nuevo nombre de usuario:');
    if (newUsername) {
        // Aquí deberías enviar una solicitud al servidor para cambiar el nombre de usuario
        console.log('Cambiando nombre de usuario a:', newUsername);
        showFeedback('Nombre de usuario actualizado');
    }
}

function changePassword() {
    const newPassword = prompt('Ingresa tu nueva contraseña:');
    if (newPassword) {
        // Aquí deberías enviar una solicitud al servidor para cambiar la contraseña
        console.log('Cambiando contraseña');
        showFeedback('Contraseña actualizada');
    }
}

function showFeedback(message) {
    const existingFeedback = document.getElementById('settingsFeedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedbackElement = document.createElement('div');
    feedbackElement.id = 'settingsFeedback';
    feedbackElement.textContent = message;
    feedbackElement.style.position = 'fixed';
    feedbackElement.style.bottom = '20px';
    feedbackElement.style.right = '20px';
    feedbackElement.style.backgroundColor = 'var(--primary-color)';
    feedbackElement.style.color = 'var(--sidebar-text-color)';
    feedbackElement.style.padding = '10px 20px';
    feedbackElement.style.borderRadius = '5px';
    feedbackElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    feedbackElement.style.transition = 'opacity 0.5s ease-in-out';
    feedbackElement.style.opacity = '0';

    document.body.appendChild(feedbackElement);

    setTimeout(() => {
        feedbackElement.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        feedbackElement.style.opacity = '0';
        setTimeout(() => {
            feedbackElement.remove();
        }, 500);
    }, 2000);
}

function updateProfile(event) {
    event.preventDefault();
    const newUsername = document.getElementById('username').value;
    const newEmail = document.getElementById('email').value;
    const additionalEmail = document.getElementById('additionalEmail').value;

    // Aquí deberías enviar una solicitud al servidor para actualizar el perfil
    fetch('/api/update-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: newUsername,
            email: newEmail,
            additionalEmail: additionalEmail
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFeedback('Perfil actualizado correctamente');
            // Actualizar la información del usuario en el almacenamiento local
            localStorage.setItem('currentUser', JSON.stringify({
                username: newUsername,
                email: newEmail,
                additionalEmail: additionalEmail
            }));
        } else {
            showFeedback('Error al actualizar el perfil');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFeedback('Error al actualizar el perfil');
    });
}

// Agregar event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    
    document.getElementById('themeSelect').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
    
    document.getElementById('customColor').addEventListener('input', (e) => {
        applyCustomColor(e.target.value);
    });
    
    document.getElementById('notificationsToggle').addEventListener('change', (e) => {
        localStorage.setItem('notificationsEnabled', e.target.checked);
    });
});
