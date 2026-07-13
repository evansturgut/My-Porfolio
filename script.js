// ============================================================
// script.js — enhanced interactions
// ============================================================

(function() {
  "use strict";

  // ---- DOM references ----
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');

  // ---- MOBILE NAV TOGGLE ----
  if (toggle && navLinks) {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });

    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // ---- DARK MODE ----
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // ---- SCROLL SPY ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === '#' + current) {
        anchor.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  // ---- BACK TO TOP BUTTON ----
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- TYPING EFFECT ----
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      'ICT Professional with 3+ years experience',
      'Network Administrator · Cybersecurity Enthusiast',
      'Frontend Developer · React · TypeScript'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ---- CONTACT FORM ----
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thanks for reaching out, ' + name + '! I\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  // ---- RESUME DOWNLOAD ----
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function(e) {
    // Option A: Direct download (if PDF is in same folder)
    // Just use href="Evans_Resume_2026.pdf" download in HTML
    
    // Option B: Track download with analytics
    console.log('Resume downloaded');
    // window.location.href = 'Evans_Resume_2026.pdf';
  });
}

  // ---- PROGRESS BAR ANIMATION ON SCROLL ----
  const progressBars = document.querySelectorAll('.progress');
  let animated = false;

  function animateProgressBars() {
    if (animated) return;
    const section = document.getElementById('skills');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
      animated = true;
    }
  }

  window.addEventListener('scroll', animateProgressBars);
  window.addEventListener('load', animateProgressBars);

})();