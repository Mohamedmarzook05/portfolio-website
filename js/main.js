(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── NAVIGATION ─── */
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  }

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let currentId = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) currentId = sec.id;
    });
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('nav__link--active', isActive);
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  handleNavScroll();
  updateActiveLink();

  /* ─── MOBILE MENU ─── */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMenu);
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) toggleMenu();
    });
  });

  /* ─── SMOOTH SCROLL POLYFILL ─── */
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.getElementById(this.getAttribute('href').slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── SCROLL REVEAL ─── */
  function initReveal() {
    // Stagger setup for new classes
    document.querySelectorAll('.index-row').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
    });
    document.querySelectorAll('.prog-row').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', (i * 100) + 'ms');
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  /* ─── CONTACT FORM DEMO ─── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit');
      const originalText = btn.textContent;
      
      btn.textContent = 'PAYLOAD RECEIVED';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
      }, 3000);
    });
  }

})();
