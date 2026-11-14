/* aQtSOME / BIOMOD 2026 — global header & footer, no page HTML changes.
   Every current Wiki HTML already imports script.js.
   The existing HTML remains the fallback if JavaScript is unavailable. */
(() => {
  'use strict';
  const entries = [
    ['Home', 'index.html'],
    ['Project', 'project.html'],
    ['Design', 'design.html'],
    ['Experiment', 'experiment.html'],
    ['Simulation', 'simulation.html'],
    ['ELSI', 'elsi.html'],
    ['Member', 'member.html']
  ];
  const star = '<svg class="aqs-star" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M12 1.6 15.1 8.9 22.4 12 15.1 15.1 12 22.4 8.9 15.1 1.6 12 8.9 8.9Z" fill="currentColor"></path><circle cx="12" cy="12" r="2" fill="#ffffea"></circle></svg>';
  const path = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  let current = entries.find(([label, href]) => href === path)?.[0];
  if (!current && path.startsWith('simulation-')) current = 'Simulation';
  if (!current) current = 'Home';
  const links = (footer = false) => entries.map(([label, href]) => {
    const active = label === current;
    return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${!footer && active ? star : ''}${label}</a>`;
  }).join('');

  function replaceChrome() {
    const header = document.querySelector('header.site-header');
    const footer = document.querySelector('footer.site-footer');
    if (header) {
      header.innerHTML = `<div class="header-inner">
        <a class="brand aqs-logo-link" href="index.html" aria-label="aQtSOME home">
          <img class="aqs-brand-image" src="assets/logo.png" alt="aQtSOME logo">
          <span class="aqs-logo-fallback" hidden>aQtSOME<span class="aqs-orange">.</span></span>
        </a>
        <button class="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button>
        <nav class="nav" id="main-nav" aria-label="Main navigation">${links()}</nav>
      </div>`;
      attachFallback(header.querySelector('.aqs-brand-image'));
    }
    if (footer) {
      footer.innerHTML = `<div class="footer-inner">
        <div class="footer-top">
          <div class="aqs-footer-identity">
            <a class="aqs-footer-logo" href="index.html" aria-label="aQtSOME home">
              <img src="assets/footer-logo.png" alt="aQtSOME footer logo">
              <span class="aqs-footer-fallback" hidden>aQtSOME<span>.</span></span>
            </a>
            <p>BIOMOD 2026 · Research Wiki</p>
          </div>
          <nav class="footer-nav" aria-label="Footer navigation">${links(true)}</nav>
        </div>
        <div class="footer-bottom"><span>© 2026 aQtSOME</span><span>Kyushu University · BIOMOD 2026</span></div>
      </div>`;
      attachFallback(footer.querySelector('.aqs-footer-logo img'));
    }
    if (header) {
      const button = header.querySelector('.menu-toggle');
      const nav = header.querySelector('#main-nav');
      const setExpanded = expanded => {
        nav.classList.toggle('is-open', expanded);
        nav.classList.toggle('open', expanded);
        button.setAttribute('aria-expanded', String(expanded));
        button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
      };
      // Capture-phase listener prevents double toggles from legacy scripts.
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        setExpanded(button.getAttribute('aria-expanded') !== 'true');
      }, true);
      nav.addEventListener('click', event => { if (event.target.closest('a')) setExpanded(false); });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') setExpanded(false); });
      document.addEventListener('click', event => { if (!header.contains(event.target)) setExpanded(false); });
      window.addEventListener('resize', () => { if (window.innerWidth > 1020) setExpanded(false); }, {passive:true});
    }
  }
  function attachFallback(img) {
    if (!img) return;
    const fallback = img.nextElementSibling;
    img.addEventListener('error', () => { img.hidden = true; if (fallback) fallback.hidden = false; });
    img.addEventListener('load', () => { img.hidden = false; if (fallback) fallback.hidden = true; });
    if (img.complete && img.naturalWidth === 0) { img.hidden = true; if (fallback) fallback.hidden = false; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', replaceChrome, {once:true});
  else replaceChrome();
})();
