const themeToggle = document.getElementById('theme-toggle');

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

window.onload = () => {
    loadTheme();
};