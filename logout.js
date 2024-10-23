function logout() {
    // Aquí puedes agregar cualquier lógica adicional de cierre de sesión si es necesario
    // Por ejemplo, limpiar el almacenamiento local o las cookies

    // Redirigir a la página de inicio de sesión
    window.location.href = '../htm/index.htm';
}

// Agregar el evento de clic al botón de cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

