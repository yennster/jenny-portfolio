// LinkedIn FAB + bottom sheet. Loads the QR library on first open only.
(function () {
  const LINKEDIN_URL = 'https://www.linkedin.com/in/jennyplunkett';
  const QR_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  const fab = document.getElementById('linkedinFab');
  const overlay = document.getElementById('linkedinOverlay');
  const sheet = document.getElementById('linkedinSheet');
  const closeBtn = document.getElementById('linkedinClose');
  const shareBtn = document.getElementById('linkedinShare');
  const openLinkedInLink = overlay.querySelector('.linkedin-btn-primary');
  let qrGenerated = false;
  let qrLoading = null;
  let sheetOpen = false;
  let previousFocus = null;

  function loadQRLibrary() {
    if (window.QRCode) return Promise.resolve();
    if (qrLoading) return qrLoading;
    qrLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = QR_SRC;
      s.crossOrigin = 'anonymous';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return qrLoading;
  }

  function getFocusables() {
    return [closeBtn, openLinkedInLink, shareBtn].filter(el => {
      if (!el) return false;
      if (el.disabled) return false;
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
  }

  async function openSheet() {
    if (sheetOpen) return;
    sheetOpen = true;
    if (!qrGenerated) {
      try {
        await loadQRLibrary();
        new QRCode(document.getElementById('linkedinQR'), {
          text: LINKEDIN_URL,
          width: 200,
          height: 200,
          colorDark: 'oklch(48% 0.13 192)',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        qrGenerated = true;
      } catch (_) { /* QR unavailable; sheet still works via buttons */ }
    }
    previousFocus = document.activeElement;
    overlay.classList.remove('is-closing');
    overlay.classList.add('is-open');
    overlay.removeAttribute('aria-hidden');
    document.querySelectorAll('#nav, #main, footer').forEach(el => {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    });
    fab.classList.add('is-hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      try { closeBtn.focus(); } catch (_) {}
    });
  }

  function closeSheet() {
    overlay.classList.remove('is-open');
    overlay.classList.add('is-closing');
    overlay.setAttribute('aria-hidden', 'true');
    document.querySelectorAll('#nav, #main, footer').forEach(el => {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    });
    fab.style.animation = 'none';
    fab.classList.remove('is-hidden');
    document.body.style.overflow = '';
    setTimeout(() => overlay.classList.remove('is-closing'), 280);
    sheetOpen = false;
    const target = (previousFocus && typeof previousFocus.focus === 'function'
      && document.body.contains(previousFocus)
      && window.getComputedStyle(previousFocus).display !== 'none')
      ? previousFocus
      : fab;
    try { target.focus(); } catch (_) {}
    previousFocus = null;
  }

  fab.addEventListener('click', openSheet);
  closeBtn.addEventListener('click', closeSheet);

  // Focus trap: cycle Tab / Shift+Tab between close, open LinkedIn, and share
  overlay.addEventListener('keydown', (e) => {
    if (!sheetOpen || e.key !== 'Tab') return;
    const focusables = getFocusables();
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || !overlay.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !overlay.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  });

  // After fab-enter plays on page load, lock the animation inline so removing
  // is-hidden never re-triggers it (inline styles beat class-based animation rules).
  fab.addEventListener('animationend', (e) => {
    if (e.animationName === 'fab-enter') fab.style.animation = 'none';
  });

  setTimeout(() => {
    // Skip if the FAB is hidden (sheet is open) — otherwise fab-beat class would
    // linger and fire unexpectedly when the sheet closes.
    if (getComputedStyle(fab).display !== 'none' && !fab.classList.contains('is-hidden')) {
      fab.style.animation = 'fab-beat 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
      fab.addEventListener('animationend', (e) => {
        if (e.animationName === 'fab-beat') fab.style.animation = 'none';
      }, { once: true });
    }
  }, 1400);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSheet(); });

  const SHARE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  async function copyFallback() {
    try {
      await navigator.clipboard.writeText(LINKEDIN_URL);
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.innerHTML = SHARE_ICON + ' Share'; }, 2000);
    } catch (_) {}
  }

  shareBtn.addEventListener('click', async () => {
    let method = 'copy';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Jenny Speelman on LinkedIn', url: LINKEDIN_URL });
        method = 'native_share';
      } catch (e) {
        if (e.name === 'AbortError') method = 'share_aborted';
        else { await copyFallback(); method = 'copy_after_share_error'; }
      }
    } else {
      await copyFallback();
    }
    if (typeof plausible === 'function') {
      plausible('LinkedIn Share', { props: { method } });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheetOpen) {
      e.preventDefault();
      closeSheet();
    }
  });

  // Swipe-down to dismiss
  let dragStart = null;
  let dragStartTime = 0;
  let dragging = false;

  sheet.addEventListener('touchstart', (e) => {
    dragStart = e.touches[0].clientY;
    dragStartTime = e.timeStamp || Date.now();
    dragging = true;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const dy = Math.max(0, e.touches[0].clientY - dragStart);
    sheet.style.transform = `translateY(${dy}px)`;
  }, { passive: true });

  sheet.addEventListener('touchend', (e) => {
    if (!dragging) return;
    dragging = false;
    sheet.style.transition = '';
    const dy = e.changedTouches[0].clientY - dragStart;
    const endTime = e.timeStamp || Date.now();
    const elapsed = Math.max(1, endTime - dragStartTime);
    const velocity = dy / elapsed;
    if (dy > 80 || velocity > 0.5) {
      closeSheet();
      sheet.style.transform = '';
    } else {
      sheet.style.transform = '';
    }
  }, { passive: true });
})();
