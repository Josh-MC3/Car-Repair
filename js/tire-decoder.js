/* ============================================
   TIRE SIDEWALL DECODER
   Example string: P215/65R15 95H
   ============================================ */

const TIRE_DECODE = {
  P: {
    title: 'P — Tire Type',
    desc: 'Indicates a passenger-vehicle tire, the most common construction type for cars, crossovers, and light SUVs. You may also see "LT" (light truck) on heavier-duty vehicles.'
  },
  215: {
    title: '215 — Section Width',
    desc: 'The overall width of the tire tread, measured in millimeters from sidewall to sidewall. A wider tire generally offers more grip; a narrower one can help fuel efficiency.'
  },
  65: {
    title: '65 — Aspect Ratio',
    desc: 'The sidewall\'s height expressed as a percentage of the tread width. Here, the sidewall height is 65% of 215mm — about 140mm tall. Lower numbers mean a stiffer, sportier ride; higher numbers mean more cushion.'
  },
  R: {
    title: 'R — Construction',
    desc: 'Radial internal construction, the modern industry standard. The internal cords run straight across from side to side, with extra layers added around the tread for strength.'
  },
  15: {
    title: '15 — Wheel Diameter',
    desc: 'The nominal diameter of the wheel rim, in inches, that this tire is built to fit. This must match your wheel exactly — there is no tolerance here.'
  },
  95: {
    title: '95 — Load Index',
    desc: 'A standardized code for the maximum weight a single tire can safely support when fully inflated. A load index of 95 corresponds to about 1,521 lbs per tire — multiplied across four tires, that\'s roughly 6,084 lbs of total carrying capacity. Never replace a tire with one rated lower than the original.'
  },
  H: {
    title: 'H — Speed Rating',
    desc: 'A letter code for the tire\'s maximum safe sustained speed under its rated load. An H rating allows speeds up to 130 mph. Most drivers never approach this, but the rating is also a rough signal of overall construction quality and responsiveness.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const chars = document.querySelectorAll('.tire-char[data-key]');
  const panel = document.getElementById('decode-panel');

  chars.forEach((el) => {
    el.addEventListener('click', () => {
      chars.forEach((c) => c.classList.remove('active'));
      el.classList.add('active');

      const data = TIRE_DECODE[el.dataset.key];
      panel.innerHTML = `
        <span class="dp-key">Decoding "${el.dataset.key}"</span>
        <div class="dp-title">${data.title}</div>
        <p class="dp-desc">${data.desc}</p>
      `;
    });
  });
});
