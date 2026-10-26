/* =============================================================
 * main.js
 * Application entry point. Wires DOM events to the calculation
 * pipeline and storage layer. Bootstraps the UI on DOM ready.
 *
 * Load order (set in index.html):
 *   utils.js → storage.js → calculator.js → animations.js →
 *   ui.js   → main.js
 * ============================================================= */

(function (global) {
  'use strict';

  const AC = global.AC || (global.AC = {});
  const { $, toInt, clamp, uuid, formatDate } = AC.utils;
  const storage = AC.storage;
  const calc = AC.calc;
  const ui = AC.ui;
  const anim = AC.anim;

  // ---- bootstrap -------------------------------------------------
  function bootstrap() {
    ui.init();

    // render any persisted snapshots
    ui.renderHistory(storage.load());

    // initial calculation
    recalc();

    // wire up events
    bindEvents();
  }

  // ---- read inputs & recompute -----------------------------------
  function readInputs() {
    return {
      attended:  clamp(toInt(AC.ui.els().attended.value, 0), 0, 1e5),
      total:     clamp(toInt(AC.ui.els().total.value, 0), 0, 1e5),
      threshold: clamp(toInt(AC.ui.els().threshold.value, 75), 50, 100),
    };
  }

  function recalc() {
    const i = readInputs();
    const result = calc.compute(i.attended, i.total, i.threshold);
    ui.render(result);
  }

  // ---- actions ---------------------------------------------------
  function saveSnapshot() {
    const i = readInputs();
    if (i.total <= 0) {
      ui.showToast('Total classes must be greater than 0');
      return;
    }
    const r = calc.compute(i.attended, i.total, i.threshold);
    const item = {
      id:        uuid(),
      date:      formatDate(new Date()),
      attended:  r.attended,
      total:     r.total,
      threshold: r.threshold,
      percent:   parseFloat(r.percent.toFixed(2)),
      status:    r.status,
    };
    const next = storage.add(item);
    ui.renderHistory(next);
    ui.showToast('Snapshot saved');
  }

  function resetAll() {
    const els = AC.ui.els();
    els.attended.value = 0;
    els.total.value = 0;
    els.threshold.value = 75;
    ui.bumpThreshold();
    anim.resetCountUp();
    recalc();
    ui.showToast('Reset');
  }

  function clearHistory() {
    storage.clear();
    ui.renderHistory([]);
    ui.showToast('History cleared');
  }

  function stepValue(id, delta) {
    const el = AC.ui.els()[id];
    if (!el) return;
    const cur = toInt(el.value, 0);
    el.value = clamp(cur + delta, 0, 1e5);
    recalc();
  }

  // ---- event wiring ----------------------------------------------
  function bindEvents() {
    const els = AC.ui.els();

    // live recompute on any input change
    els.attended.addEventListener('input', recalc);
    els.total.addEventListener('input', recalc);
    els.threshold.addEventListener('input', function () {
      ui.bumpThreshold();
      recalc();
    });

    // +/- stepper buttons (use data-inc / data-dec attributes)
    document.querySelectorAll('[data-inc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        stepValue(btn.getAttribute('data-inc'), +1);
      });
    });
    document.querySelectorAll('[data-dec]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        stepValue(btn.getAttribute('data-dec'), -1);
      });
    });

    // primary actions
    $('save-btn').addEventListener('click', saveSnapshot);
    $('reset-btn').addEventListener('click', resetAll);
    els.clearBtn.addEventListener('click', clearHistory);

    // keyboard shortcuts (skip when typing in a number input)
    document.addEventListener('keydown', function (e) {
      const t = e.target;
      if (t && t.tagName === 'INPUT' && t.type === 'number') return;
      const k = e.key.toLowerCase();
      if (k === 's') { e.preventDefault(); saveSnapshot(); }
      if (k === 'r') { e.preventDefault(); resetAll(); }
    });
  }

  // ---- DOM ready -------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})(window);
