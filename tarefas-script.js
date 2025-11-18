const dayMap = {
    'mon': 'Segunda-feira', 'tue': 'Terça-feira', 'wed': 'Quarta-feira',
    'thu': 'Quinta-feira', 'fri': 'Sexta-feira', 'sat': 'Sábado', 'sun': 'Domingo'
};
let currentDayId = null;

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}


function getDayIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('day');
}

function loadTasks(dayId) {
    const tasksJson = localStorage.getItem(dayId);
    const tasks = tasksJson ? JSON.parse(tasksJson) : [];
    return tasks.map(task => 
        (typeof task === 'string') ? { text: task, completed: false } : task
    );
}

function saveTasks(dayId, tasks) {
    localStorage.setItem(dayId, JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;

    taskList.innerHTML = '';
    const tasks = loadTasks(currentDayId);

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        const taskTextClass = task.completed ? 'task-text completed' : 'task-text';

        li.innerHTML = `
            <span class="${taskTextClass}">${task.text}</span>
            <div class="task-actions">
                ${!task.completed ? 
                    `<button class="btn-complete" onclick="completeTask(${index})">Concluída</button>` : 
                    
                    '<span class="task-status">Concluída!</span>'
                }
                <button class="btn-remove" onclick="removeTask(${index})">Remover</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

window.addTask = function() {
    const input = document.getElementById('new-task-text');
    const taskText = input.value.trim();

    if (taskText && currentDayId) {
        const tasks = loadTasks(currentDayId);
        tasks.push({text: taskText, completed: false}); 
        saveTasks(currentDayId, tasks);
        input.value = '';
        renderTasks();
    }
}

window.removeTask = function(index) {
    if (!currentDayId) return;
    
    const tasks = loadTasks(currentDayId);
    tasks.splice(index, 1);
    saveTasks(currentDayId, tasks);
    renderTasks();
}

window.completeTask = function(index) {
    if (!currentDayId) return;

    const tasks = loadTasks(currentDayId);
    tasks[index].completed = true; 
    saveTasks(currentDayId, tasks);
    
    alert("Parabéns!");

    renderTasks();
}

function initTaskPage() {
    currentDayId = getDayIdFromUrl();
    const titleElement = document.getElementById('day-title');

    if (currentDayId && titleElement) {
        titleElement.textContent = `Tarefas para ${dayMap[currentDayId]}`;
        renderTasks();
    } else {
         console.error("ID do dia não encontrado na URL.");
         if(titleElement) titleElement.textContent = `Erro: Dia não especificado.`;
    }
}

window.onload = () => {
    loadTheme();
    initTaskPage();
};