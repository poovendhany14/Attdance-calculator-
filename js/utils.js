/* =============================================================
 * utils.js
 * Pure helper functions — no DOM, no side effects.
 * Exposed as: AC.utils.*
 * ============================================================= */

(function (global) {
  'use strict';

  const AC = global.AC || (global.AC = {});

  /** Clamp a number to [lo, hi] inclusive. */
  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }

  /** Shortcut for document.getElementById. */
  function $(id) {
    return document.getElementById(id);
  }

  /** Parse an integer safely, returning fallback on failure. */
  function toInt(v, fallback) {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? fallback : n;
  }

  /** Escape HTML special characters to prevent XSS in innerHTML. */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[c];
    });
  }

  /** Generate a unique id, using crypto when available. */
  function uuid() {
    if (global.crypto && global.crypto.randomUUID) {
      return global.crypto.randomUUID();
    }
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  /** Format a Date as a short localized string. */
  function formatDate(d) {
    return new Date(d).toLocaleString();
  }

  AC.utils = { clamp, $, toInt, escapeHtml, uuid, formatDate };
})(window);
