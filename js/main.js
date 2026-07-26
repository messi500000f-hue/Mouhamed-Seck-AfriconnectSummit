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
/**
 * AFRICONNECT SUMMIT 2026 - MAIN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
});

/* --------------------------------------------------------------------------
   1. GESTION DU THÈME (DARK / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  if (themeIcon && themeText) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeText.textContent = 'Clair';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeText.textContent = 'Sombre';
    }
  }
}

/* --------------------------------------------------------------------------
   2. NAVBAR DYNAMIQUE ET MENU MOBILE HAMBURGER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // A. Ombre et fond au défilement de la page (> 80px)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // B. Ouverture / Fermeture du Menu Hamburger Mobile
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
    });

    // C. Fermer le menu mobile quand on clique sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      });
    });
  }
}