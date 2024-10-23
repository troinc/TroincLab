// Inicializar SDK de Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'TU_ID_DE_APP_DE_FACEBOOK',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });
};

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const createAccountLink = document.getElementById('createAccount');
    const recoverPasswordLink = document.getElementById('recoverPassword');
    const recoverPasswordModal = document.getElementById('recoverPasswordModal');
    const closeModal = recoverPasswordModal.querySelector('.close');
    const recoverPasswordForm = document.getElementById('recoverPasswordForm');
    const backToLoginLink = document.getElementById('backToLogin');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aquí deberías enviar una solicitud al servidor para autenticar
        console.log('Iniciando sesión con:', username, password);
        // Si la autenticación es exitosa, redirige al dashboard
        window.location.href = '../htm/index.html';
    });

    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Aquí deberías abrir un modal o redirigir a una página de registro
        console.log('Abriendo formulario de creación de cuenta');
    });

    recoverPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        recoverPasswordModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        recoverPasswordModal.style.display = 'none';
    });

    backToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        recoverPasswordModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == recoverPasswordModal) {
            recoverPasswordModal.style.display = 'none';
        }
    });

    recoverPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const recoveryEmail = document.getElementById('recoveryEmail').value;
        // Aquí deberías enviar una solicitud al servidor para iniciar el proceso de recuperación de contraseña
        console.log('Enviando enlace de recuperación a:', recoveryEmail);
        alert('Se ha enviado un enlace de recuperación a tu correo electrónico.');
        recoverPasswordModal.style.display = 'none';
    });

    // Funciones para el inicio de sesión social
    document.querySelector('.google-btn').addEventListener('click', function() {
        console.log('Iniciando sesión con Google');
        // Implementa la lógica de inicio de sesión con Google
    });

    document.querySelector('.facebook-btn').addEventListener('click', function() {
        console.log('Iniciando sesión con Facebook');
        // Implementa la lógica de inicio de sesión con Facebook
    });

    // Cargar la API de Google
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'TU_ID_DE_CLIENTE_DE_GOOGLE.apps.googleusercontent.com'
        });
    });
});

function loginUser(username, password) {
    // Aquí deberías enviar una solicitud al servidor para autenticar
    console.log('Iniciando sesión con:', username, password);
    // Si la autenticación es exitosa, redirige al dashboard
    window.location.href = '../htm/index.html';
}

function signInWithGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function(googleUser) {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
        // Enviar el token al servidor para autenticación
        sendTokenToServer(id_token, 'google');
    }).catch(function(error) {
        console.error('Error al iniciar sesión con Google:', error);
    });
}

function signInWithFacebook() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome! Fetching your information.... ');
            FB.api('/me', {fields: 'name, email'}, function(response) {
                console.log('Good to see you, ' + response.name + '.');
                console.log('Email: ' + response.email);
                // Enviar el token al servidor para autenticación
                sendTokenToServer(response.authResponse.accessToken, 'facebook');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email'});
}

function sendTokenToServer(token, provider) {
    // Aquí deberías enviar una solicitud al servidor con el token y el proveedor
    console.log('Enviando token al servidor:', token, 'Proveedor:', provider);
    // Si la autenticación es exitosa, redirige al dashboard
    window.location.href = '../htm/index.html';
}

// Función para crear una cuenta (ejemplo)
function createAccount(email, password) {
    // Aquí deberías enviar una solicitud al servidor para crear la cuenta
    console.log('Creando cuenta con:', email);
    // El servidor debería enviar un correo de verificación
    sendVerificationEmail(email);
}

// Función para enviar correo de verificación (ejemplo)
function sendVerificationEmail(email) {
    // Aquí deberías enviar una solicitud al servidor para enviar el correo de verificación
    console.log('Enviando correo de verificación a:', email);
}

// Función para verificar la cuenta (ejemplo)
function verifyAccount(email, verificationCode) {
    // Aquí deberías enviar una solicitud al servidor para verificar la cuenta
    console.log('Verificando cuenta:', email, verificationCode);
}
