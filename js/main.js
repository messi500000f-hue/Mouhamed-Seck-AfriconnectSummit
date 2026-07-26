/**
 * AFRICONNECT SUMMIT 2026 - MAIN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initCountdown();
  initCounters();
  initFooterAndScroll();
  initScheduleTabs();
  initSpeakersFilter();
  initSpeakerModal();
  initContactForm();
  initFaqAccordion();
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
   2. NAVBAR DYNAMIQUE ET MENU MOBILE
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. COMPTE À REBOURS TEMPS RÉEL (HERO)
   -------------------------------------------------------------------------- */
function initCountdown() {
  const targetDate = new Date('2026-11-12T09:00:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.querySelector('.countdown-grid').innerHTML = 
        '<p style="grid-column: span 4; font-weight: 700; color: var(--color-primary);">L\'événement est en cours !</p>';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? '0' + d : d;
    hoursEl.textContent = h < 10 ? '0' + h : h;
    minutesEl.textContent = m < 10 ? '0' + m : m;
    secondsEl.textContent = s < 10 ? '0' + s : s;
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   4. INCRÉMENTATION ANIMÉE DES CHIFFRES CLÉS AU SCROLL
   -------------------------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = prefix + target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = prefix + Math.floor(current) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   5. FOOTER (ANNÉE DYNAMIQUE & BOUTON RETOUR EN HAUT)
   -------------------------------------------------------------------------- */
function initFooterAndScroll() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   6. ONGLETS DU PROGRAMME (PROGRAMME.HTML)
   -------------------------------------------------------------------------- */
function initScheduleTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetDay = btn.getAttribute('data-day');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`day-${targetDay}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. FILTRAGE DES INTERVENANTS (INTERVENANTS.HTML)
   -------------------------------------------------------------------------- */
function initSpeakersFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card-full');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      speakerCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          card.classList.remove('show');
          card.classList.add('hide');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. FENÊTRE MODALE BIOGRAPHIE (INTERVENANTS.HTML)
   -------------------------------------------------------------------------- */
function initSpeakerModal() {
  const modalOverlay = document.getElementById('speaker-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const speakerCards = document.querySelectorAll('.speaker-card-full');

  if (!modalOverlay) return;

  const modalName = document.getElementById('modal-speaker-name');
  const modalRole = document.getElementById('modal-speaker-role');
  const modalBio = document.getElementById('modal-speaker-bio');

  speakerCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      const role = card.getAttribute('data-role');
      const bio = card.getAttribute('data-bio');

      if (modalName) modalName.textContent = name;
      if (modalRole) modalRole.textContent = role;
      if (modalBio) modalBio.textContent = bio;

      modalOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. VALIDATION FORMULAIRE DE CONTACT (CONTACT.HTML)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successAlert = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Récupération des champs
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const typeSelect = document.getElementById('subject');

    // Reset des erreurs
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('has-error');
    });

    // Valider le Nom
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Veuillez saisir votre nom complet.');
      isValid = false;
    }

    // Valider l'Email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Veuillez saisir votre adresse e-mail.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Veuillez saisir un e-mail valide.');
      isValid = false;
    }

    // Valider le type de demande
    if (!typeSelect.value) {
      showError(typeSelect, 'Veuillez sélectionner un sujet.');
      isValid = false;
    }

    // Si tout est valide
    if (isValid) {
      if (successAlert) {
        successAlert.style.display = 'flex';
      }
      form.reset();
      
      setTimeout(() => {
        if (successAlert) successAlert.style.display = 'none';
      }, 5000);
    }
  });

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errorMsg = group.querySelector('.form-error-msg');
      if (errorMsg) {
        errorMsg.textContent = message;
      }
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

/* --------------------------------------------------------------------------
   10. ACCORDÉON FAQ (CONTACT.HTML)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  if (faqQuestions.length === 0) return;

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Fermer tous les autres items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Basculer l'item actuel
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}