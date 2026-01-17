const body = document.body;
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-toggle-text');
const segments = document.querySelectorAll('.segment');
const tabPanels = document.querySelectorAll('.tab-panel');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('.modal-body');
const modalFocusable = () => modal.querySelectorAll('button, [href], input, textarea');
const cards = document.querySelectorAll('.card[data-modal]');
const navLinks = document.querySelectorAll('.nav-links a');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

const THEME_KEY = 'xeth-theme';
let lastFocusedElement = null;

const setTheme = (theme) => {
  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeText.textContent = 'Dark';
  } else {
    body.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeText.textContent = 'Light';
  }
};

const initTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    setTheme(stored);
    return;
  }
  setTheme(prefersDark.matches ? 'dark' : 'light');
};

const toggleTheme = () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  setTheme(next);
};

const closeNav = () => {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 860) {
      closeNav();
    }
  });
});

themeToggle?.addEventListener('click', toggleTheme);

prefersDark.addEventListener('change', (event) => {
  if (!localStorage.getItem(THEME_KEY)) {
    setTheme(event.matches ? 'dark' : 'light');
  }
});

segments.forEach((segment) => {
  segment.addEventListener('click', () => {
    segments.forEach((button) => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });
    segment.classList.add('active');
    segment.setAttribute('aria-selected', 'true');
    const target = segment.dataset.tab;
    tabPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === target);
    });
  });
});

const openModal = (title) => {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = title;
  modalBody.textContent = `Placeholder details for ${title}. Add summary, role, and links here.`;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  const focusables = modalFocusable();
  focusables[0]?.focus();
};

const closeModal = () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  lastFocusedElement?.focus();
};

const trapFocus = (event) => {
  if (!modal.classList.contains('active')) return;
  if (event.key !== 'Tab') return;
  const focusables = Array.from(modalFocusable());
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

cards.forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', () => openModal(card.dataset.modal));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(card.dataset.modal);
    }
  });
});

modal.addEventListener('click', (event) => {
  if (event.target.dataset.close) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
  trapFocus(event);
});

const handleScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', handleScroll, { passive: true });

const observerOptions = {
  threshold: 0.3,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.5 });

const sections = document.querySelectorAll('main section');
sections.forEach((section) => {
  sectionObserver.observe(section);
  if (!prefersReduced.matches) {
    section.classList.add('reveal');
    revealObserver.observe(section);
  }
});

initTheme();
handleScroll();
