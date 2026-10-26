/* =============================================================
 * calculator.js
 * Pure calculation layer. No DOM, no side effects, fully
 * testable in isolation. Exposed as: AC.calc.*
 *
 * Formulas (see README § How It Works):
 *   percent     = attended / total * 100
 *   canBunk (x) = floor(attended * 100 / threshold - total)
 *   mustAttend(y) = ceil((k * total - attended) / (1 - k))
 *                  where k = threshold / 100
 * ============================================================= */

(function (global) {
  'use strict';

  const AC = global.AC || (global.AC = {});
  const { clamp } = AC.utils;

  /** Constants returned in the result object. */
  const STATUS = {
    SAFE: 'safe',
    WARNING: 'warning',
    DANGER: 'danger',
  };

  const COLORS = {
    safe: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  /** Map a status to a human label. */
  function statusLabel(s) {
    switch (s) {
      case STATUS.SAFE:
        return 'You are safe — keep it up!';
      case STATUS.WARNING:
        return 'Borderline — be careful';
      case STATUS.DANGER:
        return 'At risk — attend more classes';
      default:
        return '';
    }
  }

  /** Classify attendance into a status bucket. */
  function classify(percent, threshold) {
    if (percent >= threshold) return STATUS.SAFE;
    if (percent >= threshold - 15) return STATUS.WARNING;
    return STATUS.DANGER;
  }

  /**
   * Compute every derived value from raw inputs.
   * @param {number} attended
   * @param {number} total
   * @param {number} threshold  (50–100)
   * @returns {object} full result bundle
   */
  function compute(attended, total, threshold) {
    attended = clamp(attended || 0, 0, 1e5);
    total = clamp(total || 0, 0, 1e5);
    threshold = clamp(threshold || 75, 50, 100);

    const percent = total > 0 ? (attended / total) * 100 : 0;
    const pClamped = clamp(percent, 0, 100);
    const status = classify(percent, threshold);
    const color = COLORS[status];

    // Can bunk: max x such that attended / (total + x) >= threshold/100
    let canBunk = 0;
    if (attended > 0) {
      canBunk = Math.max(0, Math.floor((attended * 100) / threshold - total));
    }

    // Must attend: min y such that (attended + y) / (total + y) >= threshold/100
    let mustAttend = 0;
    const k = threshold / 100;
    if (k >= 1) {
      mustAttend = attended >= total ? 0 : total - attended;
    } else {
      mustAttend = Math.max(0, Math.ceil((k * total - attended) / (1 - k)));
    }

    const bunked = Math.max(0, total - attended);

    return {
      attended,
      total,
      threshold,
      percent,
      percentClamped: pClamped,
      canBunk,
      mustAttend,
      bunked,
      status,
      color,
      label: statusLabel(status),
    };
  }

  AC.calc = {
    STATUS,
    COLORS,
    classify,
    statusLabel,
    compute,
  };
})(window);
