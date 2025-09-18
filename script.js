// Helper: on DOM ready
const onReady = (cb) => (document.readyState !== 'loading') ? cb() : document.addEventListener('DOMContentLoaded', cb);

onReady(() => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close when clicking a link
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Typing effect
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const full = typingEl.getAttribute('data-text') || '';
    let i = 0;
    const speed = 22; // ms per char
    const type = () => {
      if (i <= full.length) {
        typingEl.textContent = full.slice(0, i) + (i < full.length ? '|' : '');
        i++;
        setTimeout(type, speed);
      } else {
        // blink cursor
        let visible = true;
        setInterval(() => {
          visible = !visible;
          typingEl.textContent = full + (visible ? '|' : '');
        }, 500);
      }
    };
    setTimeout(type, 400);
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));

  // Project filters
  const filterBar = document.querySelector('.filters');
  const chips = document.querySelectorAll('.filters .chip');
  const cards = document.querySelectorAll('.project');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target;
      if (!(btn instanceof HTMLElement)) return;
      const filter = btn.getAttribute('data-filter');
      if (!filter) return;

      chips.forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category') || '';
        const show = filter === 'all' || cat.split(/\s+/).includes(filter);
        card.classList.toggle('hide', !show);
      });
    });
  }
});
