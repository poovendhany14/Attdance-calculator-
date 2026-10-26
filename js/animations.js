/* =============================================================
 * animations.js
 * Imperative animation helpers built on requestAnimationFrame
 * and direct DOM manipulation. No animation library needed.
 * Exposed as: AC.anim.*
 * ============================================================= */

(function (global) {
  'use strict';

  const AC = global.AC || (global.AC = {});
  const { clamp } = AC.utils;

  // ---- count-up ---------------------------------------------------
  let _pctRAF = null;
  let _pctCurrent = 0;

  /**
   * Animate a number from its previous value to `target`.
   * Writes the formatted value into `el.textContent`.
   */
  function animateCountUp(el, target, opts) {
    opts = opts || {};
    const suffix = opts.suffix || '';
    const decimals = opts.decimals != null ? opts.decimals : 1;
    const dur = opts.duration || 800;

    if (_pctRAF) cancelAnimationFrame(_pctRAF);
    const start = _pctCurrent;
    const t0 = performance.now();

    function tick(t) {
      const k = clamp((t - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = start + (target - start) * eased;
      _pctCurrent = v;
      el.textContent = v.toFixed(decimals) + suffix;
      if (k < 1) {
        _pctRAF = requestAnimationFrame(tick);
      }
    }
    _pctRAF = requestAnimationFrame(tick);
  }

  /** Reset the count-up cursor (used by external reset). */
  function resetCountUp() {
    _pctCurrent = 0;
    if (_pctRAF) cancelAnimationFrame(_pctRAF);
  }

  // ---- bump (scale pop) -------------------------------------------
  /**
   * Re-trigger a CSS keyframe animation by toggling class
   * after a forced reflow.
   */
  function bump(el, className) {
    if (!el) return;
    className = className || 'bump';
    el.classList.remove(className);
    void el.offsetWidth; // force reflow
    el.classList.add(className);
  }

  // ---- confetti ---------------------------------------------------
  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  /**
   * Spawn a brief confetti shower in the given container.
   * Cleans itself up after 2.4s.
   */
  function confetti(container) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
      const span = document.createElement('span');
      span.style.left = Math.random() * 100 + '%';
      span.style.background = COLORS[i % COLORS.length];
      span.style.animationDelay = Math.random() * 0.4 + 's';
      span.style.animationDuration = (1.6 + Math.random() * 0.8) + 's';
      container.appendChild(span);
    }
    setTimeout(() => { container.innerHTML = ''; }, 2400);
  }

  // ---- toast -----------------------------------------------------
  let _toastTimer = null;

  /** Show a brief toast message; auto-hides after 2s. */
  function toast(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
  }

  AC.anim = {
    animateCountUp,
    resetCountUp,
    bump,
    confetti,
    toast,
  };
})(window);
