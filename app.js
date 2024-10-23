const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function showSection(sectionId) {
  const sections = ['inicio', 'diasSemanales', 'ajustes'];
  sections.forEach(section => {
    const element = document.getElementById(section);
    if (element) {
      element.style.display = section === sectionId ? 'block' : 'none';
    }
  });

  const mainTitle = document.querySelector('.main-content h2');
  if (mainTitle) {
    switch (sectionId) {
      case 'inicio':
        mainTitle.textContent = 'Bienvenido a Organiza tu tiempo';
        break;
      case 'diasSemanales':
        mainTitle.textContent = 'Mi Lista Semanal de Tareas';
        break;
      case 'ajustes':
        mainTitle.textContent = 'Ajustes';
        break;
    }
  }
}

// Add day elements to the task list
function initializeDays() {
  const taskList = document.getElementById('taskList');
  if (taskList) {
    days.forEach(day => {
      taskList.appendChild(createDayElement(day));
    });
  }
}

// Initialize the app
function initApp() {
  initializeDays();
  loadSettings();
  loadTasks();
  showSection('inicio');
}

// Wait for the DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', initApp);

// Export functions for use in other scripts
window.showSection = showSection;