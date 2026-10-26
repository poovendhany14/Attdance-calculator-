/* =============================================================
 * ui.js
 * View layer. Reads from a result bundle (produced by AC.calc)
 * and writes to the DOM. Stateless & idempotent — calling
 * render(result) with the same data twice is a no-op.
 * Exposed as: AC.ui.*
 * ============================================================= */

(function (global) {
  'use strict';

  const AC = global.AC || (global.AC = {});
  const { $, escapeHtml, formatDate } = AC.utils;
  const { bump, animateCountUp, confetti, toast } = AC.anim;
  const { COLORS } = AC.calc;

  // Cached ring geometry (set in init)
  const RING_R = 110;
  const RING_CIRC = 2 * Math.PI * RING_R;

  // Cached icon SVGs (status pill)
  const ICONS = {
    safe:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
    warning:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    danger:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  };

  // ---- init: cache DOM refs & ring setup ---------------------------
  let els = null;
  let ringFg = null;
  let prevStatus = null;

  function init() {
    els = {
      attended:    $('attended'),
      total:       $('total'),
      threshold:   $('threshold'),
      thresholdVal: $('threshold-val'),
      ringFg:      $('ring-fg'),
      ringPct:     $('ring-pct'),
      statusPill:  $('status-pill'),
      statusText:  $('status-text'),
      canBunk:     $('can-bunk'),
      mustAttend:  $('must-attend'),
      mustSub:     $('must-sub'),
      bkAttended:  $('bk-attended'),
      bkTotal:     $('bk-total'),
      bkBunked:    $('bk-bunked'),
      historyGrid: $('history-grid'),
      histBadge:   $('hist-badge'),
      clearBtn:    $('clear-btn'),
      confettiBox: $('confetti'),
      toast:       $('toast'),
    };
    ringFg = els.ringFg;
    ringFg.setAttribute('stroke-dasharray', RING_CIRC);
    ringFg.setAttribute('stroke-dashoffset', RING_CIRC);
    prevStatus = null;
  }

  /** Update ring stroke color via gradient stops. */
  function setRingColor(color) {
    const stops = ringFg.parentNode.querySelectorAll('linearGradient#ringGrad stop');
    if (stops.length >= 2) {
      stops[0].setAttribute('stop-color', color);
      stops[1].setAttribute('stop-color', color);
    }
  }

  /**
   * Render a full result bundle to the UI.
   * @param {object} r  — produced by AC.calc.compute()
   */
  function render(r) {
    // threshold slider visual + value
    const p = ((r.threshold - 50) / 50) * 100;
    els.threshold.style.setProperty('--p', p + '%');
    els.thresholdVal.textContent = r.threshold + '%';

    // ring
    const offset = RING_CIRC - RING_CIRC * (r.percentClamped / 100);
    ringFg.setAttribute('stroke-dashoffset', offset);
    setRingColor(r.color);
    els.ringPct.style.color = r.color;
    animateCountUp(els.ringPct, r.percentClamped, { suffix: '%' });

    // status pill + confetti on transition into safe
    if (r.status !== prevStatus) {
      els.ringPct.style.animation = 'none';
      void els.ringPct.offsetWidth;
      els.ringPct.style.animation = 'popCenter 0.4s cubic-bezier(0.16,1,0.3,1)';

      els.statusPill.style.color = r.color;
      els.statusPill.querySelector('.icon').outerHTML = ICONS[r.status] || ICONS.danger;
      els.statusText.textContent = r.label;

      if (r.status === 'safe') confetti(els.confettiBox);
    }
    prevStatus = r.status;

    // stat cards
    els.canBunk.textContent = r.canBunk;
    bump(els.canBunk);
    els.mustAttend.textContent = r.mustAttend;
    els.mustSub.textContent = 'classes to reach ' + r.threshold + '%';
    bump(els.mustAttend);

    // breakdown
    els.bkAttended.textContent = r.attended;
    els.bkTotal.textContent = r.total;
    els.bkBunked.textContent = r.bunked;
  }

  /** Render the history list (or the empty state). */
  function renderHistory(history) {
    const grid = els.historyGrid;
    grid.innerHTML = '';

    if (!history.length) {
      grid.innerHTML =
        '<div class="empty"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>No snapshots yet. Click <b>Save Snapshot</b> to record your attendance.</div>';
      els.histBadge.style.display = 'none';
      els.clearBtn.style.display = 'none';
      return;
    }

    els.histBadge.style.display = '';
    els.histBadge.textContent = history.length;
    els.clearBtn.style.display = '';

    history.forEach(function (h, i) {
      const card = document.createElement('div');
      card.className = 'hist-card';
      card.style.animationDelay = (i * 0.05) + 's';
      const color = COLORS[h.status] || COLORS.danger;
      card.innerHTML =
        '<div class="hist-bar" style="background:' + color + '"></div>' +
        '<div class="date">' + escapeHtml(h.date) + '</div>' +
        '<div class="pct" style="color:' + color + '">' + h.percent.toFixed(1) + '%</div>' +
        '<div class="meta">' + h.attended + ' / ' + h.total + ' classes</div>';
      grid.appendChild(card);
    });
  }

  /** Show a transient toast. */
  function showToast(msg) {
    toast(els.toast, msg);
  }

  /** Bump the threshold value label. */
  function bumpThreshold() {
    bump(els.thresholdVal);
  }

  AC.ui = {
    init,
    render,
    renderHistory,
    showToast,
    bumpThreshold,
    els: () => els,  // expose cached refs
  };
})(window);
