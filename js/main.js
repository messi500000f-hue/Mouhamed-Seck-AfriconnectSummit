/**
 * AFRICONNECT SUMMIT 2026 - MAIN JAVASCRIPT
 * Gestion du Thème (Dark/Light Mode) avec persistance localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});

/**
 * Initialise le thème au chargement de la page
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // 1. Vérifier si un thème est sauvegardé dans localStorage, sinon détecter la préférence système
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // 2. Appliquer le thème initial
  applyTheme(activeTheme);

  // 3. Écouteur d'événement sur le bouton de bascule
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

/**
 * Applique l'attribut HTML et met à jour l'icône/texte du bouton
 * @param {string} theme - 'dark' ou 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  if (themeIcon && themeText) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun'; // Icône Soleil en dark mode
      themeText.textContent = 'Clair';
    } else {
      themeIcon.className = 'fa-solid fa-moon'; // Icône Lune en light mode
      themeText.textContent = 'Sombre';
    }
  }
}