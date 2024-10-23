function createDayElement(day) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.innerHTML = `
      <h2>${day}</h2>
      <ul id="${day.toLowerCase()}Tasks"></ul>
      <div class="new-task-container">
        <input type="text" id="${day.toLowerCase()}NewTask" placeholder="Nueva tarea">
        <button class="add-task" onclick="addTask('${day.toLowerCase()}')">Agregar</button>
      </div>
    `;
    return dayElement;
  }
  
  function addTask(day) {
    const input = document.getElementById(`${day}NewTask`);
    const taskText = input.value.trim();
    if (taskText) {
      const taskList = document.getElementById(`${day}Tasks`);
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <input type="text" value="${taskText}" onchange="updateTask(this)">
        <button class="delete-task" onclick="deleteTask(this)">X</button>
      `;
      taskList.appendChild(li);
      input.value = '';
      saveTasks();
    }
  }
  
  function toggleTask(checkbox) {
    const textInput = checkbox.nextElementSibling;
    textInput.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    saveTasks();
  }
  
  function updateTask(input) {
    saveTasks();
  }
  
  function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const tasks = {};
    days.forEach(day => {
      const dayTasks = Array.from(document.getElementById(`${day.toLowerCase()}Tasks`).children).map(li => ({
        text: li.querySelector('input[type="text"]').value,
        completed: li.querySelector('input[type="checkbox"]').checked
      }));
      tasks[day.toLowerCase()] = dayTasks;
    });
    localStorage.setItem('weeklyTasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('weeklyTasks')) || {};
    days.forEach(day => {
      const taskList = document.getElementById(`${day.toLowerCase()}Tasks`);
      const dayTasks = savedTasks[day.toLowerCase()] || [];
      dayTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          <input type="checkbox" onchange="toggleTask(this)" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.text}" onchange="updateTask(this)" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
          <button class="delete-task" onclick="deleteTask(this)">X</button>
        `;
        taskList.appendChild(li);
      });
    });
  }