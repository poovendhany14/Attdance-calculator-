/* =============================================================
 * storage.js
 * localStorage-backed persistence for attendance snapshots.
 * Exposed as: AC.storage.*
 *
 * Shape of a snapshot:
 * {
 *   id:        string  — uuid
 *   date:      string  — localized timestamp
 *   attended:  number
 *   total:     number
 *   percent:   number  — rounded to 2 dp
 *   threshold: number
 *   status:    'safe' | 'warning' | 'danger'
 * }
 * ============================================================= */

(function (global) {
  'use strict';

  const AC = global.AC || (global.AC = {});
  const KEY = 'attendance-calculator:history';
  const LIMIT = 8;

  /** Read history from localStorage; returns [] on any error. */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      console.warn('[storage] load failed', e);
      return [];
    }
  }

  /** Persist history; silently fails on quota errors. */
  function save(history) {
    try {
      localStorage.setItem(KEY, JSON.stringify(history));
      return true;
    } catch (e) {
      console.warn('[storage] save failed', e);
      return false;
    }
  }

  /** Prepend a new snapshot and trim to LIMIT. */
  function add(item) {
    const next = [item, ...load()].slice(0, LIMIT);
    save(next);
    return next;
  }

  /** Remove every snapshot. */
  function clear() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      console.warn('[storage] clear failed', e);
    }
  }

  AC.storage = { load, save, add, clear, LIMIT };
})(window);
