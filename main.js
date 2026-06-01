document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('section:not(#hero)').forEach(s => observer.observe(s));

  window.filterProjects = function(btn) {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const featured = document.querySelectorAll('.proj-card-featured');
    const grid = document.querySelectorAll('.proj-card-sm');

    [...featured, ...grid].forEach(card => {
      const cats = card.dataset.categories || '';
      const show = filter === 'all' || cats.includes(filter);
      card.style.display = show ? '' : 'none';
    });
  };

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => navObserver.observe(s));
});
