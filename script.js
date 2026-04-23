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
let navClosing = false;

function openNav() {
  navLinks.classList.remove('is-closing');
  navLinks.classList.add('open');
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
}

function closeNav({ returnFocus = false } = {}) {
  if (navClosing) return;
  navClosing = true;
  navLinks.classList.remove('open');
  navLinks.classList.add('is-closing');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  setTimeout(() => {
    navLinks.classList.remove('is-closing');
    navClosing = false;
  }, 220);
  if (returnFocus) burger.focus();
}

burger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeNav() : openNav();
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => closeNav());
});

// Escape closes the mobile nav menu and returns focus to the burger
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    e.preventDefault();
    closeNav({ returnFocus: true });
  }
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
const reducedMotionQuery = matchMedia('(prefers-reduced-motion: reduce)');
function scrollToEl(el) {
  const navH = document.getElementById('nav').offsetHeight;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
  // Respect the user's motion preference (SC 2.3.3).
  window.scrollTo({ top, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
}

// Snapshot all cards before pagination hides any
const allWritingCards = Array.from(document.querySelectorAll('.writing-card'));
const allTalkCards = Array.from(document.querySelectorAll('.talk-card'));

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

  // Derive a human-readable label for this group for live announcements.
  const groupLabel = (group.querySelector('.writing-group-label')?.textContent || 'Writing').trim();

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.setAttribute('aria-label', `Previous page of ${groupLabel}`);
  prevBtn.innerHTML = '<span aria-hidden="true">←</span> Prev';

  const info = document.createElement('span');
  info.className = 'page-info';
  info.setAttribute('aria-hidden', 'true');

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.setAttribute('aria-label', `Next page of ${groupLabel}`);
  nextBtn.innerHTML = 'Next <span aria-hidden="true">→</span>';

  bar.append(prevBtn, info, nextBtn);
  group.appendChild(bar);

  // Polite live region for SR announcements of page changes.
  const live = document.createElement('div');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  group.appendChild(live);
  let liveTimer = null;
  function announce(shownCount) {
    clearTimeout(liveTimer);
    live.textContent = '';
    liveTimer = setTimeout(() => {
      live.textContent = `${groupLabel}: page ${page + 1} of ${totalPages}, showing ${shownCount} post${shownCount === 1 ? '' : 's'}.`;
    }, 60);
  }

  function render(opts = {}) {
    const start = page * PER_PAGE;
    let shownCount = 0;
    cards.forEach((card, i) => {
      const show = i >= start && i < start + PER_PAGE;
      card.style.display = show ? '' : 'none';
      if (show) {
        shownCount++;
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = `fadeInUp 0.3s ${(i - start) * 40}ms ease both`;
      }
    });
    info.textContent = `${page + 1} / ${totalPages}`;
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === totalPages - 1;
    if (opts.announce) announce(shownCount);
  }

  prevBtn.addEventListener('click', () => {
    if (page > 0) { page--; render({ announce: true }); scrollToEl(group); }
  });
  nextBtn.addEventListener('click', () => {
    if (page < totalPages - 1) { page++; render({ announce: true }); scrollToEl(group); }
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
talksPrev.setAttribute('aria-label', 'Previous page of talks');
talksPrev.innerHTML = '<span aria-hidden="true">←</span> Prev';
const talksInfo = document.createElement('span');
talksInfo.className = 'page-info';
talksInfo.setAttribute('aria-hidden', 'true');
const talksNext = document.createElement('button');
talksNext.className = 'page-btn';
talksNext.setAttribute('aria-label', 'Next page of talks');
talksNext.innerHTML = 'Next <span aria-hidden="true">→</span>';
talksPagination.append(talksPrev, talksInfo, talksNext);
talksGrid.after(talksPagination);

// Polite live region for announcing page changes to screen readers.
const talksLive = document.createElement('div');
talksLive.className = 'sr-only';
talksLive.setAttribute('aria-live', 'polite');
talksLive.setAttribute('aria-atomic', 'true');
talksPagination.after(talksLive);
let talksLiveTimer = null;
function announceTalksPage(page, totalPages, count) {
  if (!talksLive) return;
  clearTimeout(talksLiveTimer);
  talksLive.textContent = '';
  talksLiveTimer = setTimeout(() => {
    talksLive.textContent = `Page ${page} of ${totalPages}, showing ${count} talk${count === 1 ? '' : 's'}.`;
  }, 60);
}

function renderTalks(opts = {}) {
  const allCards = Array.from(talksGrid.querySelectorAll('.talk-card'));
  const matching = allCards.filter(c => talksYear === 'all' || c.dataset.year === talksYear);
  const total = matching.length;
  const totalPages = Math.max(1, Math.ceil(total / TALKS_PER_PAGE));

  // clamp page
  talksPage = Math.min(talksPage, Math.max(0, totalPages - 1));

  const start = talksPage * TALKS_PER_PAGE;

  allCards.forEach(c => c.style.display = 'none');
  let shownCount = 0;
  matching.forEach((c, i) => {
    const show = i >= start && i < start + TALKS_PER_PAGE;
    c.style.display = show ? '' : 'none';
    if (show) {
      shownCount++;
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

  if (opts.announce) {
    announceTalksPage(talksPage + 1, totalPages, shownCount);
  }
}

talksPrev.addEventListener('click', () => {
  if (talksPage > 0) {
    talksPage--;
    renderTalks({ announce: true });
    scrollToEl(yearFilter);
  }
});
talksNext.addEventListener('click', () => {
  talksPage++;
  renderTalks({ announce: true });
  scrollToEl(yearFilter);
});

if (yearFilter && talksGrid) {
  renderTalks();
  yearFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('.year-btn');
    if (!btn) return;
    yearFilter.querySelectorAll('.year-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    talksYear = btn.dataset.year;
    talksPage = 0;
    renderTalks({ announce: true });
  });
}

// ── Active nav highlight on scroll ───────────────────────────
// Toggle the .is-active class so the CSS underline affordance applies
// (not color alone — SC 1.4.1 Use of Color).
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`);
      });
    }
  }),
  { threshold: 0.35 }
);
sections.forEach(s => sectionObserver.observe(s));

// ── Search ────────────────────────────────────────────────────
const searchToggle = document.getElementById('searchToggle');
const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
searchToggle.dataset.tooltip = isMac ? 'Search (/ or ⌘K)' : 'Search (/ or Ctrl+K)';
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchCloseBtn = document.getElementById('searchClose');
const searchResultsWriting = document.getElementById('searchResultsWriting');
const searchResultsTalks = document.getElementById('searchResultsTalks');
const searchNoResults = document.getElementById('searchNoResults');
const searchEmpty = document.getElementById('searchEmpty');
const searchStatus = document.getElementById('searchStatus');

let searchPreviousFocus = null;
let searchStatusTimer = null;

function announceSearchStatus(msg) {
  if (!searchStatus) return;
  clearTimeout(searchStatusTimer);
  // Clear then set to force SR re-announcement of the same value
  searchStatus.textContent = '';
  searchStatusTimer = setTimeout(() => { searchStatus.textContent = msg; }, 50);
}

// Set `inert` + aria-hidden on background landmarks while a modal dialog
// is open so assistive tech and keyboard users can't reach content
// behind the dialog (SC 2.4.3, modal dialog best practice).
function setBackgroundInert(inert) {
  const bg = document.querySelectorAll('#nav, #main, footer, #linkedinFab');
  bg.forEach(el => {
    if (inert) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    }
  });
}

function openSearch() {
  searchPreviousFocus = document.activeElement;
  searchOverlay.classList.add('open');
  searchOverlay.removeAttribute('aria-hidden');
  setBackgroundInert(true);
  document.body.style.overflow = 'hidden';
  searchInput.focus();
}

function closeSearch() {
  searchOverlay.classList.remove('open');
  searchOverlay.setAttribute('aria-hidden', 'true');
  setBackgroundInert(false);
  document.body.style.overflow = '';
  searchInput.blur();
  searchInput.value = '';
  searchResultsWriting.innerHTML = '';
  searchResultsTalks.innerHTML = '';
  searchNoResults.hidden = true;
  searchEmpty.hidden = false;
  if (searchStatus) searchStatus.textContent = '';
  // Return focus to the element that opened the search (usually searchToggle)
  const target = searchPreviousFocus && typeof searchPreviousFocus.focus === 'function'
    ? searchPreviousFocus
    : searchToggle;
  try { target.focus(); } catch (_) { searchToggle.focus(); }
  searchPreviousFocus = null;
}

// Focus trap inside the search overlay: cycle through ALL focusable
// elements in the dialog (input, close button, result links/buttons).
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(el => !el.hasAttribute('disabled')
      && el.getAttribute('aria-hidden') !== 'true'
      && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
}

searchOverlay.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  if (!searchOverlay.classList.contains('open')) return;
  const focusables = getFocusable(searchOverlay);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  if (e.shiftKey) {
    if (active === first || !searchOverlay.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

searchToggle.addEventListener('click', openSearch);
searchCloseBtn.addEventListener('click', closeSearch);

// Global search shortcuts
document.addEventListener('keydown', e => {
  const isOpen = searchOverlay.classList.contains('open');
  if (e.key === 'Escape' && isOpen) { e.preventDefault(); closeSearch(); return; }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    isOpen ? closeSearch() : openSearch();
    return;
  }
  if (!isOpen) {
    const inInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if (!inInput && e.key === '/') { e.preventDefault(); openSearch(); }
  }
});

function cardMatches(card, terms) {
  const text = card.textContent.toLowerCase();
  return terms.every(t => text.includes(t));
}

function renderGroup(container, cards, label) {
  if (!cards.length) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <div class="search-group-header">${label} <span class="search-count">${cards.length}</span></div>
    <div class="search-results-grid"></div>`;
  const grid = container.querySelector('.search-results-grid');
  cards.forEach(c => {
    const clone = c.cloneNode(true);
    clone.style.display = '';
    clone.style.animation = '';
    grid.appendChild(clone);
  });
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);

  if (!terms.length) {
    searchResultsWriting.innerHTML = '';
    searchResultsTalks.innerHTML = '';
    searchNoResults.hidden = true;
    searchEmpty.hidden = false;
    if (searchStatus) searchStatus.textContent = '';
    return;
  }

  searchEmpty.hidden = true;
  const matchWriting = allWritingCards.filter(c => cardMatches(c, terms));
  const matchTalks = allTalkCards.filter(c => cardMatches(c, terms));

  renderGroup(searchResultsWriting, matchWriting, 'Writing');
  renderGroup(searchResultsTalks, matchTalks, 'Talks');
  searchNoResults.hidden = matchWriting.length + matchTalks.length > 0;

  const w = matchWriting.length;
  const t = matchTalks.length;
  let msg;
  if (w === 0 && t === 0) {
    msg = 'No results found.';
  } else {
    msg = `${w} writing result${w === 1 ? '' : 's'}, ${t} talk result${t === 1 ? '' : 's'}.`;
  }
  announceSearchStatus(msg);
});

// ── External links: announce "opens in new tab" to assistive tech ──
// Strip trailing decorative glyphs (arrows, chevrons, ellipses, pipes) so
// the accessible name ends on a word, not punctuation a screen reader
// either mis-pronounces or narrates as "right arrow".
const DECORATIVE_TRAILING = /[\s\u00A0\u2000-\u200D\u2022\u2013\u2014\u2026\u2190-\u21FF\u25A0-\u25FF\u2700-\u27BF\u3001-\u3003|·•›»→←⇢⇠]+$/u;
document.querySelectorAll('a[target="_blank"]').forEach(a => {
  // Only augment if the link doesn't already carry a descriptive aria-label
  if (a.hasAttribute('aria-label')) return;
  let text = (a.textContent || '').replace(/\s+/g, ' ').trim();
  // Strip decorative trailing glyphs, then re-trim any whitespace left behind.
  text = text.replace(DECORATIVE_TRAILING, '').trim();
  if (!text) return;
  a.setAttribute('aria-label', `${text} (opens in new tab)`);
});
