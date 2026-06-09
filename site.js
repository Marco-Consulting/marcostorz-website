/* ════════════════════════════════════════════════════════════════════════
   MARCO STORZ · COACHING + CONSULTING
   Site-wide JS: nav, hero slider, reveal, mobile menu, simple calendar
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  // ── COOKIE CONSENT ──
  const cookie = document.getElementById('cookieConsent');
  if (cookie) {
    try {
      if (!localStorage.getItem('ms-consent')) { cookie.hidden = false; }
    } catch (e) { cookie.hidden = false; }
    cookie.querySelectorAll('[data-consent]').forEach((b) => {
      b.addEventListener('click', () => {
        try { localStorage.setItem('ms-consent', b.dataset.consent); } catch (e) {}
        cookie.hidden = true;
      });
    });
  }

  // ── NAV SCROLL ──
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── HAMBURGER ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    const toggle = () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', toggle);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  // ── HERO SLIDER ──
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length > 0 && dots.length > 0) {
    let current = 0;
    let timer = null;

    const go = (n) => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    };
    const startAuto = () => {
      stopAuto();
      timer = setInterval(() => go(current + 1), 6000);
    };
    const stopAuto = () => { if (timer) clearInterval(timer); };

    dots.forEach((d) => d.addEventListener('click', () => {
      const n = +d.dataset.slide;
      go(n); startAuto();
    }));
    startAuto();
  }

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add('visible'));
  }

  // ── ACTIVE NAV LINK ──
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.split('#')[0] === path) a.classList.add('active');
  });

  // ── SIMPLE BOOKING CALENDAR (mock HubSpot/Outlook embed) ──
  const cal = document.getElementById('booking-calendar');
  if (cal) {
    const monthsDE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
    const today = new Date();
    let cursor = new Date(today.getFullYear(), today.getMonth(), 1);
    let selected = null;

    const slotPool = ['08:30','09:30','10:30','13:30','14:30','15:30','16:30'];
    const taken = new Set(['10:30', '15:30']);

    const render = () => {
      const monthName = monthsDE[cursor.getMonth()];
      const year = cursor.getFullYear();
      const firstDow = (new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay() + 6) % 7; // Mon=0
      const daysIn = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

      let html = `
        <div class="cal-head">
          <div class="cal-month">${monthName} ${year}</div>
          <div class="cal-nav">
            <button data-act="prev" aria-label="Vorheriger Monat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
            <button data-act="next" aria-label="Nächster Monat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
          </div>
        </div>
        <div class="cal-grid">
          <div class="dow">Mo</div><div class="dow">Di</div><div class="dow">Mi</div><div class="dow">Do</div><div class="dow">Fr</div><div class="dow">Sa</div><div class="dow">So</div>
      `;
      for (let i = 0; i < firstDow; i++) html += `<div class="day off"></div>`;
      for (let d = 1; d <= daysIn; d++) {
        const date = new Date(cursor.getFullYear(), cursor.getMonth(), d);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selected && date.toDateString() === selected.toDateString();
        const off = isPast || isWeekend;
        const cls = ['day'];
        if (off) cls.push('off');
        if (isToday) cls.push('today');
        if (isSelected) cls.push('selected');
        html += `<div class="${cls.join(' ')}" ${off ? '' : `data-day="${d}"`}>${d}</div>`;
      }
      cal.innerHTML = html;

      cal.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        cursor = new Date(cursor.getFullYear(), cursor.getMonth() + (b.dataset.act === 'next' ? 1 : -1), 1);
        render();
      }));
      cal.querySelectorAll('[data-day]').forEach(c => c.addEventListener('click', () => {
        selected = new Date(cursor.getFullYear(), cursor.getMonth(), +c.dataset.day);
        renderSlots();
        render();
      }));
    };
    const slotsEl = document.getElementById('booking-slots');
    const renderSlots = () => {
      if (!slotsEl) return;
      if (!selected) {
        slotsEl.innerHTML = '<div class="slots-label">Datum wählen für verfügbare Zeitfenster</div>';
        return;
      }
      const dateLabel = selected.toLocaleDateString('de-CH', { weekday: 'long', day: '2-digit', month: 'long' });
      slotsEl.innerHTML = `<div class="slots-label">${dateLabel}</div>` +
        slotPool.map(t => `<button class="slot ${taken.has(t) ? 'taken' : ''}" ${taken.has(t) ? 'disabled' : ''}>${t}<span>30 min</span></button>`).join('');
    };
    render();
    renderSlots();
  }
})();

/* ── Kachel-Klicklogik: ganze Karte klickbar (blau) wenn Link vorhanden,
      sonst neutral (grau) ohne Pointer ───────────────────────────────── */
(function () {
  const run = () => {
    document.querySelectorAll('.leistung-card').forEach(card => {
      const link = card.querySelector('a[href]');
      if (link && link.getAttribute('href')) {
        card.classList.add('is-clickable');
        card.addEventListener('click', e => {
          if (e.target.closest('a')) return;          // echte Links normal lassen
          const href = link.getAttribute('href');
          if (href) window.location.href = href;
        });
      } else {
        card.classList.add('no-link');
      }
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else { run(); }
})();
