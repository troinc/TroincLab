const aiDatabase = {
    appInfo: {
      name: "Organiza tu tiempo",
      description: "Una aplicación para organizar tareas semanales y mejorar la productividad.",
      features: [
        "Organización de tareas por día de la semana",
        "Añadir, editar y eliminar tareas",
        "Marcar tareas como completadas",
        "Guardar tareas automáticamente",
        "Interfaz intuitiva y atractiva",
        "Sección de inicio con información sobre la aplicación",
        "Sección de ajustes (próximamente)",
        "Asistente IA para ayuda y consultas"
      ],
      sections: {
        inicio: "Muestra una introducción y características principales de la aplicación",
        diasSemanales: "Permite ver y gestionar las tareas organizadas por día de la semana",
        ajustes: "Futura sección para personalizar la experiencia del usuario (en desarrollo)"
      },
      settings: {
        theme: "Permite cambiar entre tema oscuro y claro",
        customColor: "Permite personalizar el color principal de la aplicación",
        notifications: "Habilita o deshabilita las notificaciones de la aplicación",
        profile: "Gestiona tu información de perfil y preferencias personales",
        privacy: "Explica cómo manejamos y protegemos tus datos personales",
        services: "Describe los servicios ofrecidos para ayudarte a organizar tu tiempo",
        terms: "Detalla los términos y condiciones de uso de la aplicación"
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    const assistanceIcon = document.getElementById('assistanceIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Verificar si los elementos existen
    if (!assistanceIcon || !chatWindow || !closeChatBtn || !userInput || !sendMessageBtn || !chatMessages) {
      console.error('Uno o más elementos del chat no se encontraron en el DOM');
      return;
    }

    assistanceIcon.addEventListener('click', function() {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    });

    closeChatBtn.addEventListener('click', function() {
      chatWindow.style.display = 'none';
    });

    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
        addMessage('user', message);
        userInput.value = '';
        getBotResponse(message);
      }
    }

    function addMessage(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender);
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(message) {
      setTimeout(() => {
        const response = generateResponse(message);
        addMessage('bot', response);
      }, 1000);
    }

    function generateResponse(message) {
      message = message.toLowerCase();
      
      if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes')) {
        return '¡Hola! ¿En qué puedo ayudarte hoy?';
      } else if (message.includes('adiós') || message.includes('hasta luego')) {
        return '¡Hasta luego! Si necesitas algo más, estaré aquí para ayudarte.';
      } else if (message.includes('ayuda') || message.includes('cómo funciona')) {
        return 'Estoy aquí para ayudarte con cualquier duda sobre la aplicación. Puedes preguntarme sobre cómo organizar tus tareas, ajustar la configuración o cualquier otra cosa relacionada con TroincLab.';
      } else if (message.includes('tarea') || message.includes('añadir')) {
        return 'Para añadir una nueva tarea, ve a la sección "Días Semanales" y escribe tu tarea en el campo de texto bajo el día correspondiente. Luego, haz clic en "Añadir tarea" o presiona Enter.';
      } else if (message.includes('ajustes') || message.includes('configuración')) {
        return 'Puedes acceder a los ajustes haciendo clic en "Ajustes" en el menú lateral. Allí podrás cambiar el tema, personalizar colores y gestionar tu perfil de usuario.';
      } else if (message.includes('perfil') || message.includes('cuenta')) {
        return 'Para gestionar tu perfil, ve a "Ajustes" y luego haz clic en "Perfil de usuario". Allí podrás cambiar tu nombre de usuario y ver tu información de cuenta.';
      } else {
        return 'Lo siento, no entiendo completamente tu pregunta. ¿Podrías reformularla o ser más específico?';
      }
    }

    console.log('Chat IA inicializado correctamente');
  });
