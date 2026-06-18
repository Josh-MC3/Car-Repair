/* ============================================
   SHARED: theme toggle + mobile nav + vehicle data
   Loaded on every page.
   ============================================ */

(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('wr-theme');
  if (stored) root.setAttribute('data-theme', stored);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('wr-theme', next);
      });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const expanded = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', String(expanded));
      });
    }
  });
})();

/* ============================================
   VEHICLE DATA MATRIX
   Source: provided historical part-price + flat-rate
   labor-time averages. Shared by index.html (explorer)
   and economics.html (illustrative comparisons).
   ============================================ */

const LABOR_RATE = 140; // national independent-shop benchmark, $/hr

const VEHICLES = {
  ford: {
    label: 'Ford F-150',
    short: 'F-150',
    parts: {
      brakes:   { name: 'Brake Pads & Rotors',      part: 180, labor: 1.5, zone: 'Wheels (all four)' },
      alternator:{ name: 'Alternator',               part: 320, labor: 2.0, zone: 'Engine block, driver side' },
      battery:  { name: 'Car Battery',                part: 210, labor: 0.3, zone: 'Front engine bay' },
      radiator: { name: 'Radiator',                   part: 280, labor: 2.5, zone: 'Front grille / core support' },
      oil:      { name: 'Engine Oil & Filter',        part: 45,  labor: 0.5, zone: 'Lower oil pan' },
      mirror:   { name: 'Side Mirror',                part: 110, labor: 0.8, zone: 'Door assembly' },
      wipers:   { name: 'Windshield Wipers (Pair)',   part: 35,  labor: 0.2, zone: 'Base of windshield' },
    }
  },
  toyota: {
    label: 'Toyota Camry',
    short: 'Camry',
    parts: {
      brakes:   { name: 'Brake Pads & Rotors',      part: 130, labor: 1.2, zone: 'Wheels (all four)' },
      alternator:{ name: 'Alternator',               part: 190, labor: 1.5, zone: 'Engine block, driver side' },
      battery:  { name: 'Car Battery',                part: 170, labor: 0.3, zone: 'Front engine bay' },
      radiator: { name: 'Radiator',                   part: 220, labor: 2.2, zone: 'Front grille / core support' },
      oil:      { name: 'Engine Oil & Filter',        part: 35,  labor: 0.5, zone: 'Lower oil pan' },
      mirror:   { name: 'Side Mirror',                part: 75,  labor: 0.6, zone: 'Door assembly' },
      wipers:   { name: 'Windshield Wipers (Pair)',   part: 30,  labor: 0.2, zone: 'Base of windshield' },
    }
  },
  honda: {
    label: 'Honda CR-V',
    short: 'CR-V',
    parts: {
      brakes:   { name: 'Brake Pads & Rotors',      part: 140, labor: 1.3, zone: 'Wheels (all four)' },
      alternator:{ name: 'Alternator',               part: 210, labor: 1.8, zone: 'Engine block, driver side' },
      battery:  { name: 'Car Battery',                part: 165, labor: 0.3, zone: 'Front engine bay' },
      radiator: { name: 'Radiator',                   part: 240, labor: 2.4, zone: 'Front grille / core support' },
      oil:      { name: 'Engine Oil & Filter',        part: 38,  labor: 0.5, zone: 'Lower oil pan' },
      mirror:   { name: 'Side Mirror',                part: 85,  labor: 0.7, zone: 'Door assembly' },
      wipers:   { name: 'Windshield Wipers (Pair)',   part: 32,  labor: 0.2, zone: 'Base of windshield' },
    }
  },
  nissan: {
    label: 'Nissan Rogue',
    short: 'Rogue',
    parts: {
      brakes:   { name: 'Brake Pads & Rotors',      part: 125, labor: 1.4, zone: 'Wheels (all four)' },
      alternator:{ name: 'Alternator',               part: 240, labor: 1.9, zone: 'Engine block, driver side' },
      battery:  { name: 'Car Battery',                part: 180, labor: 0.4, zone: 'Front engine bay' },
      radiator: { name: 'Radiator',                   part: 260, labor: 2.6, zone: 'Front grille / core support' },
      oil:      { name: 'Engine Oil & Filter',        part: 35,  labor: 0.5, zone: 'Lower oil pan' },
      mirror:   { name: 'Side Mirror',                part: 90,  labor: 0.7, zone: 'Door assembly' },
      wipers:   { name: 'Windshield Wipers (Pair)',   part: 28,  labor: 0.2, zone: 'Base of windshield' },
    }
  }
};

function fmtMoney(n) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function fmtHours(h) {
  return h.toFixed(1) + ' hr' + (h === 1 ? '' : 's');
}
