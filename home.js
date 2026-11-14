/* HOME only. Existing script.js still controls the global navigation. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.body;
  if (!root.classList.contains('aqs-home-page')) return;

  // Do not hide images before loading. The placeholder remains below the image
  // until successful load; a missing image is hidden and its placeholder remains.
  document.querySelectorAll('[data-home-asset]').forEach(slot => {
    const img = slot.querySelector('img');
    if (!img) return;
    const ready = () => { slot.classList.add('is-loaded'); img.hidden = false; };
    const failed = () => { slot.classList.remove('is-loaded'); img.hidden = true; };
    img.addEventListener('load', ready);
    img.addEventListener('error', failed);
    if (img.complete) {
      if (img.naturalWidth > 0) ready();
      else if (img.currentSrc || img.src) failed();
    }
  });

  // Progressive enhancement: no IntersectionObserver -> content remains visible.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealNodes = [...document.querySelectorAll('.hm-reveal')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('hm-in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px 36px 0px' });
    // First mark items that are already visible before enabling transition CSS.
    revealNodes.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight + 70) el.classList.add('hm-in-view');
    });
    root.classList.add('hm-motion-ready');
    revealNodes.forEach(el => observer.observe(el));
  }
});
