/* ============================================
   Leon Liang Fang — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // --- Mobile nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Create overlay element for mobile nav
  let navOverlay = document.querySelector('.nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }

  function closeNav() {
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) navToggle.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function openNav() {
    navLinks.classList.add('open');
    navToggle.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on overlay click
    navOverlay.addEventListener('click', closeNav);

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
      }
    });
  }

  // --- Scroll fade-in animations ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Timeline card click → modal ---
  const timelineCards = document.querySelectorAll('.timeline-card[data-detail]');
  const overlay = document.getElementById('timelineDetailOverlay');

  if (timelineCards.length > 0 && overlay) {
    const modal = overlay.querySelector('.timeline-detail-modal');

    timelineCards.forEach(card => {
      card.addEventListener('click', () => {
        const detailId = card.getAttribute('data-detail');
        const detailData = window.timelineDetails?.[detailId];
        if (!detailData) return;

        // Populate modal
        modal.innerHTML = `
          <button class="detail-close" aria-label="Close">&times;</button>
          <div class="detail-header">
            <h2>${detailData.role}</h2>
            <p class="detail-org">${detailData.org}</p>
            <p class="detail-meta">${detailData.location} &middot; ${detailData.period}</p>
          </div>
          ${detailData.about ? `
          <div class="detail-about">
            <p>${detailData.about}</p>
          </div>` : ''}
          <div class="detail-highlights">
            <h4>Key Contributions</h4>
            <ul>
              ${detailData.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Close button
        modal.querySelector('.detail-close').addEventListener('click', closeModal);
      });
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- Active nav link highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
