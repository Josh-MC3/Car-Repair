/* ============================================
   CAR EXPLORER — hotspot clicks → readout panel
   Used only on index.html
   ============================================ */

(function () {
  let currentVehicle = 'ford';
  let currentPart = null;

  function renderReadout(partKey) {
    const vehicle = VEHICLES[currentVehicle];
    const part = vehicle.parts[partKey];
    const empty = document.querySelector('.readout-empty');
    const body = document.querySelector('.readout-body');
    const vehicleLabel = document.querySelector('.readout-vehicle');

    if (!part) {
      empty.style.display = 'flex';
      body.classList.remove('show');
      return;
    }

    vehicleLabel.textContent = vehicle.label;
    empty.style.display = 'none';
    body.classList.add('show');

    const shopLabor = part.labor * LABOR_RATE;
    const totalShopBill = part.part + shopLabor;
    const diySavings = totalShopBill - part.part;

    body.innerHTML = `
      <div class="readout-part-name">${part.name}</div>
      <div class="readout-line" style="animation-delay:0.05s">
        <span class="rl-label">Location</span>
        <span class="rl-value" style="font-size:0.85rem;font-weight:500;">${part.zone}</span>
      </div>
      <div class="readout-line" style="animation-delay:0.1s">
        <span class="rl-label">Avg. Part Cost (DIY)</span>
        <span class="rl-value">${fmtMoney(part.part)}</span>
      </div>
      <div class="readout-line" style="animation-delay:0.18s">
        <span class="rl-label">Flat-Rate Labor Time</span>
        <span class="rl-value">${fmtHours(part.labor)}</span>
      </div>
      <div class="readout-line" style="animation-delay:0.26s">
        <span class="rl-label">Shop Labor Cost <span style="opacity:0.6">(@ $${LABOR_RATE}/hr)</span></span>
        <span class="rl-value">${fmtMoney(shopLabor)}</span>
      </div>
      <hr class="readout-divider" />
      <div class="readout-line total" style="animation-delay:0.34s">
        <span class="rl-label">Total Pro Shop Bill</span>
        <span class="rl-value">${fmtMoney(totalShopBill)}</span>
      </div>
      <div class="readout-savings">
        <span class="rs-label">DIY Savings Potential</span>
        <span class="rs-value">${fmtMoney(diySavings)}</span>
      </div>
    `;
  }

  function setActiveHotspot(partKey) {
    document.querySelectorAll('.hotspot-group').forEach((g) => {
      g.classList.toggle('selected', g.dataset.part === partKey);
    });
  }

  function setVehicle(key) {
    currentVehicle = key;
    document.querySelectorAll('.segmented button[data-vehicle]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.vehicle === key);
    });
    if (currentPart) renderReadout(currentPart);
  }

  function positionTooltip(group, tooltip, wrap, pointerEvent) {
    const dots = group.querySelectorAll('.hotspot-dot');
    if (!dots.length) return;
    const svg = group.closest('svg');
    const wrapRect = wrap.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = svgRect.width / viewBox.width;
    const scaleY = svgRect.height / viewBox.height;

    let dot = dots[0];

    // Groups like "brakes" have one dot per wheel. Pick whichever dot is
    // physically closest to the pointer so the tooltip lands on the wheel
    // that was actually hovered, not always the first one in markup order.
    if (dots.length > 1 && pointerEvent) {
      let closestDist = Infinity;
      dots.forEach((d) => {
        const dCx = parseFloat(d.getAttribute('cx'));
        const dCy = parseFloat(d.getAttribute('cy'));
        const dScreenX = svgRect.left + dCx * scaleX;
        const dScreenY = svgRect.top + dCy * scaleY;
        const dist = Math.hypot(pointerEvent.clientX - dScreenX, pointerEvent.clientY - dScreenY);
        if (dist < closestDist) {
          closestDist = dist;
          dot = d;
        }
      });
    }

    const cx = parseFloat(dot.getAttribute('cx'));
    const cy = parseFloat(dot.getAttribute('cy'));

    const screenX = (svgRect.left - wrapRect.left) + cx * scaleX;
    const screenY = (svgRect.top - wrapRect.top) + cy * scaleY;

    tooltip.style.left = screenX + 'px';
    tooltip.style.top = screenY + 'px';
    tooltip.textContent = group.dataset.label;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.car-svg-wrap');
    const tooltip = document.getElementById('hotspot-tooltip');

    document.querySelectorAll('.segmented button[data-vehicle]').forEach((btn) => {
      btn.addEventListener('click', () => setVehicle(btn.dataset.vehicle));
    });

    document.querySelectorAll('.hotspot-group').forEach((group) => {
      const activate = () => {
        currentPart = group.dataset.part;
        setActiveHotspot(currentPart);
        renderReadout(currentPart);
      };
      group.addEventListener('click', activate);
      group.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });

      const showTip = (e) => {
        if (!wrap || !tooltip) return;
        positionTooltip(group, tooltip, wrap, e);
        tooltip.classList.add('show');
      };
      const hideTip = () => {
        if (tooltip) tooltip.classList.remove('show');
      };
      group.addEventListener('pointerenter', showTip);
      group.addEventListener('pointermove', showTip);
      group.addEventListener('pointerleave', hideTip);
      group.addEventListener('focus', showTip);
      group.addEventListener('blur', hideTip);
    });

    setVehicle('ford');
  });
})();
