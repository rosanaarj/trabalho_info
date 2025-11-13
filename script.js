const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const themeToggle = document.getElementById('theme-toggle');

// Função de salvar corrigida
function saveTask(dayId) {
    const text = document.getElementById(dayId).value;
    localStorage.setItem(dayId, text);
    alert('Tarefa salva com sucesso!');
}

// Função de carregar tarefas corrigida
function loadTasks() {
    days.forEach(dayId => { // Use dayId para clareza
        const saved = localStorage.getItem(dayId);
        // Verifique se o elemento existe antes de tentar definir o valor
        const textarea = document.getElementById(dayId);
        if (saved && textarea) {
            textarea.value = saved;
        }
    });
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Modo Claro';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// window.onload corrigido
window.onload = () => {
    loadTasks();
    loadTheme();
};