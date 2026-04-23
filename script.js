// Email obfuscation — assembled at runtime to deter scrapers
(function () {
  const u = 'hello', d = 'jennyplunkett.me';
  const addr = u + '\u0040' + d;
  const link = document.getElementById('email-link');
  const label = document.getElementById('email-label');
  if (link && label) {
    link.href = 'mailto:' + addr;
    label.textContent = addr;
  }
})();

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Align timeline dots with job title in each card
function alignTimelineMarkers() {
  document.querySelectorAll('.timeline-item').forEach(item => {
    const content = item.querySelector('.timeline-content');
    const h3 = item.querySelector('h3');
    const marker = item.querySelector('.timeline-marker');
    if (!content || !h3 || !marker) return;
    const top = content.offsetTop + h3.offsetTop + h3.offsetHeight / 2 - marker.offsetHeight / 2;
    marker.style.top = top + 'px';
  });
}
alignTimelineMarkers();
window.addEventListener('resize', alignTimelineMarkers);

// Scroll-triggered animations for timeline items
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// ── Card icons ───────────────────────────────────────────────
const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-icon" aria-hidden="true">';
const SVG_CLOSE = '</svg>';

const ICONS = {
  blog:       SVG_OPEN + '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>' + SVG_CLOSE,
  docs:       SVG_OPEN + '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' + SVG_CLOSE,
  tutorial:   SVG_OPEN + '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>' + SVG_CLOSE,
  forum:      SVG_OPEN + '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' + SVG_CLOSE,
  research:   SVG_OPEN + '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>' + SVG_CLOSE,
  webinar:    SVG_OPEN + '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' + SVG_CLOSE,
  conference: SVG_OPEN + '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>' + SVG_CLOSE,
  workshop:   SVG_OPEN + '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' + SVG_CLOSE,
  interview:  SVG_OPEN + '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/>' + SVG_CLOSE,
  demo:       SVG_OPEN + '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>' + SVG_CLOSE,
  keynote:    SVG_OPEN + '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' + SVG_CLOSE,
  panel:      SVG_OPEN + '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' + SVG_CLOSE,
  podcast:    SVG_OPEN + '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>' + SVG_CLOSE,
  video:      SVG_OPEN + '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>' + SVG_CLOSE,
  fireside:   SVG_OPEN + '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' + SVG_CLOSE,
};

function iconFor(text) {
  const t = text.toLowerCase();
  if (t.startsWith('blog'))           return ICONS.blog;
  if (t.startsWith('docs'))           return ICONS.docs;
  if (t.startsWith('tutorial'))       return ICONS.tutorial;
  if (t.startsWith('forum'))          return ICONS.forum;
  if (t.startsWith('arxiv'))          return ICONS.research;
  if (t.startsWith('webinar'))        return ICONS.webinar;
  if (t.includes('conference'))       return ICONS.conference;
  if (t.startsWith('workshop'))       return ICONS.workshop;
  if (t.startsWith('interview') || t.includes('ama')) return ICONS.interview;
  if (t.startsWith('demo'))           return ICONS.demo;
  if (t.startsWith('keynote'))        return ICONS.keynote;
  if (t.startsWith('panel'))          return ICONS.panel;
  if (t.startsWith('podcast'))        return ICONS.podcast;
  if (t.startsWith('video'))          return ICONS.video;
  if (t.startsWith('fireside'))       return ICONS.fireside;
  return '';
}

document.querySelectorAll('.writing-tag, .talk-type').forEach(el => {
  const icon = iconFor(el.textContent);
  if (icon) el.insertAdjacentHTML('afterbegin', icon);
});

// ── Smooth scroll helper (accounts for sticky nav) ───────────
function scrollToEl(el) {
  const navH = document.getElementById('nav').offsetHeight;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ── Writing pagination ────────────────────────────────────────
const PER_PAGE = 6;

document.querySelectorAll('.writing-group').forEach(group => {
  const grid = group.querySelector('.writing-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.writing-card'));
  if (cards.length <= PER_PAGE) return; // no pagination needed

  let page = 0;
  const totalPages = Math.ceil(cards.length / PER_PAGE);

  // Build pagination bar
  const bar = document.createElement('div');
  bar.className = 'pagination';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.setAttribute('aria-label', 'Previous page');
  prevBtn.innerHTML = '← Prev';

  const info = document.createElement('span');
  info.className = 'page-info';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.setAttribute('aria-label', 'Next page');
  nextBtn.innerHTML = 'Next →';

  bar.append(prevBtn, info, nextBtn);
  group.appendChild(bar);

  function render() {
    const start = page * PER_PAGE;
    cards.forEach((card, i) => {
      const show = i >= start && i < start + PER_PAGE;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = `fadeInUp 0.3s ${(i - start) * 40}ms ease both`;
      }
    });
    info.textContent = `${page + 1} / ${totalPages}`;
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === totalPages - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (page > 0) { page--; render(); scrollToEl(group); }
  });
  nextBtn.addEventListener('click', () => {
    if (page < totalPages - 1) { page++; render(); scrollToEl(group); }
  });

  render();
});

// ── Talks: year filter + pagination ──────────────────────────
const TALKS_PER_PAGE = 9;
const yearFilter = document.getElementById('yearFilter');
const talksGrid = document.getElementById('talksGrid');

let talksYear = '2024';
let talksPage = 0;

// Build pagination bar for talks (reused across renders)
const talksPagination = document.createElement('div');
talksPagination.className = 'pagination';
const talksPrev = document.createElement('button');
talksPrev.className = 'page-btn';
talksPrev.innerHTML = '← Prev';
const talksInfo = document.createElement('span');
talksInfo.className = 'page-info';
const talksNext = document.createElement('button');
talksNext.className = 'page-btn';
talksNext.innerHTML = 'Next →';
talksPagination.append(talksPrev, talksInfo, talksNext);
talksGrid.after(talksPagination);

function renderTalks() {
  const allCards = Array.from(talksGrid.querySelectorAll('.talk-card'));
  const matching = allCards.filter(c => talksYear === 'all' || c.dataset.year === talksYear);
  const total = matching.length;
  const totalPages = Math.ceil(total / TALKS_PER_PAGE);

  // clamp page
  talksPage = Math.min(talksPage, Math.max(0, totalPages - 1));

  const start = talksPage * TALKS_PER_PAGE;

  allCards.forEach(c => c.style.display = 'none');
  matching.forEach((c, i) => {
    const show = i >= start && i < start + TALKS_PER_PAGE;
    c.style.display = show ? '' : 'none';
    if (show) {
      c.style.animation = 'none';
      c.offsetHeight;
      c.style.animation = `fadeInUp 0.3s ${(i - start) * 35}ms ease both`;
    }
  });

  // pagination controls
  if (totalPages <= 1) {
    talksPagination.style.display = 'none';
  } else {
    talksPagination.style.display = 'flex';
    talksInfo.textContent = `${talksPage + 1} / ${totalPages}`;
    talksPrev.disabled = talksPage === 0;
    talksNext.disabled = talksPage === totalPages - 1;
  }
}

talksPrev.addEventListener('click', () => {
  if (talksPage > 0) {
    talksPage--;
    renderTalks();
    scrollToEl(yearFilter);
  }
});
talksNext.addEventListener('click', () => {
  talksPage++;
  renderTalks();
  scrollToEl(yearFilter);
});

if (yearFilter && talksGrid) {
  renderTalks();
  yearFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('.year-btn');
    if (!btn) return;
    yearFilter.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    talksYear = btn.dataset.year;
    talksPage = 0;
    renderTalks();
  });
}

// ── Active nav highlight on scroll ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--text)' : '';
      });
    }
  }),
  { threshold: 0.35 }
);
sections.forEach(s => sectionObserver.observe(s));
