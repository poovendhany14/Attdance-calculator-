# 🎓 Attendance Calculator

> A beautiful, animation-rich attendance calculator that tells you exactly how many classes you can bunk — and how many you must attend to reach your threshold.

[![Made with HTML](https://img.shields.io/badge/HTML-5-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020+-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Build Step](https://img.shields.io/badge/Build-None-success)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## 📑 Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Live Preview](#live-preview)
4. [Tech Stack](#tech-stack)
5. [Project Architecture](#project-architecture)
6. [Getting Started](#getting-started)
7. [Usage Guide](#usage-guide)
8. [How It Works](#how-it-works)
9. [Module Reference](#module-reference)
10. [Customization](#customization)
11. [Accessibility](#accessibility)
12. [Keyboard Shortcuts](#keyboard-shortcuts)
13. [Browser Support](#browser-support)
14. [Roadmap](#roadmap)
15. [Contributing](#contributing)
16. [License](#license)
17. [Acknowledgements](#acknowledgements)

---

## Overview

**Attendance Calculator** is a lightweight, zero-dependency web app built for students who need to track their class attendance and plan around a required minimum threshold (typically 75% in most universities).

Instead of just showing a percentage, it answers the two questions students actually ask:

- *"How many classes can I skip and still stay above the requirement?"*
- *"How many classes do I need to attend to recover?"*

All of this is wrapped in a polished, animation-first UI — count-up numbers, an animated SVG progress ring, floating gradient blobs, spring-bouncing stat cards, and a confetti celebration whenever you cross into the safe zone.

The project follows a **professional, layered architecture** with strict separation of concerns: presentation (CSS) is fully divorced from logic (JS), and the JS itself is split into focused modules (utils / storage / calculator / animations / ui / main).

---

## Key Features

### 🎨 Visual & Animation
- **Animated SVG circular progress ring** with gradient stroke, glow filter, and smooth `stroke-dashoffset` transitions
- **Count-up number animation** driven by `requestAnimationFrame` with cubic easing
- **Three floating gradient blobs** in emerald / amber / rose, each on its own organic floating loop
- **Animated radial gradient background** that drifts continuously
- **Spring-bouncing stat cards** for "Can Bunk" and "Must Attend" values
- **Confetti celebration** that fires automatically the moment your attendance crosses into the safe zone
- **Cross-fading status pill** that smoothly swaps between Safe / Borderline / At-risk
- **Pop-in card animations** for newly saved snapshots
- Respects `prefers-reduced-motion`

### 🧮 Calculation Engine
- Live attendance percentage with safe color coding (green / amber / red)
- **Can Bunk** — exact count of classes you may still skip while maintaining your threshold
- **Must Attend** — exact count of additional consecutive classes you must attend to reach the threshold
- Adjustable **required-threshold slider** (50% → 100%) with live preview
- Smart status classification: Safe ≥ threshold · Borderline within 15% below · At-risk otherwise

### 💾 Data & Privacy
- **Save Snapshot** stores your last 8 attendance snapshots to `localStorage`
- Snapshot cards include timestamp, percentage, breakdown, and color-coded status bar
- **No backend, no analytics, no cookies** — your data never leaves your browser
- One-click **Clear** to wipe all saved snapshots
- One-click **Reset** to restore default values

### ♿ Accessibility & UX
- Semantic HTML5 landmarks (`main`, `section`, `header`, `footer`)
- Full keyboard navigation with visible focus styles
- ARIA labels on all icon-only buttons
- `prefers-color-scheme` based **automatic dark mode**
- Toast notifications for save / reset / clear actions
- Mobile-first responsive layout — works perfectly on phones, tablets, and desktops

---

## Live Preview

Open `index.html` in any modern browser. No server, no build step, no installation required.

If you want a clean local URL instead of a `file://` path:

```bash
# from this project root
python3 -m http.server 8080
# then visit http://localhost:8080/
```

---

## Tech Stack

| Layer       | Choice                                            | Why                                                       |
| ----------- | ------------------------------------------------- | --------------------------------------------------------- |
| Markup      | Semantic HTML5                                    | Accessibility, SEO, future-proof                          |
| Styling     | Modern CSS (custom properties, `color-mix`)       | No preprocessor, fully self-contained                     |
| Animations  | CSS `@keyframes` + `requestAnimationFrame`         | 60fps without a 50KB animation library                    |
| Icons       | Inline SVG                                        | Crisp at any size, no icon-font HTTP requests             |
| Typography  | Inter via Google Fonts (with system fallback)    | Excellent CJK + Latin coverage                            |
| Storage     | `localStorage`                                    | Persists between sessions, no server needed               |
| JS Standard | Vanilla ES2020+ (no transpilation)               | Runs natively in every evergreen browser                  |

**Zero dependencies. Zero build steps. Zero trackers.**

---

## Project Architecture

This project follows a classic **separation-of-concerns** architecture. Each file has a single, well-defined responsibility:

```
attendance-calculator/
│
├── index.html                  # Root markup — pure structure, no styles or logic
│
├── css/                        # All presentation, ordered by cascade
│   ├── reset.css              # Modern CSS reset
│   ├── variables.css          # Design tokens (colors, type, spacing, shadows)
│   ├── base.css                # Body, typography, layout shell, header, footer
│   ├── components.css          # Stepper, slider, ring, cards, history, toast
│   ├── animations.css         # All @keyframes declarations
│   └── responsive.css          # Mobile-first media queries
│
├── js/                         # All behavior, ordered by dependency
│   ├── utils.js               # Pure helpers (clamp, $, escapeHtml, uuid)
│   ├── storage.js             # localStorage CRUD for snapshots
│   ├── calculator.js          # Pure calculation logic (no DOM)
│   ├── animations.js          # rAF-based count-up, bump, confetti, toast
│   ├── ui.js                  # View layer — renders results to DOM
│   └── main.js                # Entry point — wires events, bootstraps app
│
├── assets/                     # (Reserved for future static assets — icons, fonts)
│
├── README.md
└── LICENSE
```

### Why this structure?

| Principle | How this repo honors it |
| --- | --- |
| **Separation of concerns** | HTML = structure, CSS = presentation, JS = behavior. None of them cross boundaries. |
| **Single responsibility** | Each CSS and JS file owns one concern. `animations.css` has only `@keyframes`. `calculator.js` has only pure math. |
| **Layered CSS** | Tokens → base → components, so a color change in `variables.css` cascades everywhere. |
| **Dependency-ordered JS** | Files are loaded in dependency order, so each module can assume its prerequisites exist. |
| **Namespaced globals** | Each JS module attaches to `window.AC.*`, keeping the global scope clean. |
| **Pure functions for logic** | `AC.calc.compute()` has no DOM access — fully unit-testable in isolation. |
| **Mobile-first** | Base styles assume small screens; `responsive.css` progressively enhances. |
| **Progressive enhancement** | The app works without JS for the very first paint (default values render), then JS hydrates interactivity. |

---

## Getting Started

### Quick Start (zero install)

1. Unzip this package.
2. Open `index.html` in any modern browser.
3. Done — the calculator is fully functional.

### Optional: Local Server

For a clean `http://localhost` URL (useful when extending the project):

```bash
# Python 3 (built-in)
python3 -m http.server 8080

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8080
```

Then visit `http://localhost:8080/` in your browser.

### Development Workflow

Because there is no build step, development is delightfully simple:

1. Edit any CSS or JS file.
2. Save.
3. Refresh the browser.

That's it. No `npm install`, no `npm run dev`, no transpiler, no hot-reload to configure.

---

## Usage Guide

### Basic Calculation

1. **Enter Classes Attended** — the number of classes you've actually shown up to.
2. **Enter Total Classes Held** — the total number of classes conducted so far.
3. The progress ring and percentage update instantly.

### Adjusting the Threshold

Drag the **Required Threshold** slider anywhere between 50% and 100%. The default is 75%, which is the standard at most universities. All calculations — *Can Bunk*, *Must Attend*, and the status pill — recompute live as you drag.

### Reading the Results

| Indicator     | Meaning                                                                |
| -------------- | ---------------------------------------------------------------------- |
| **Big ring**   | Your current attendance percentage, color-coded by status               |
| **Safe** pill  | You're at or above the threshold — confetti fires automatically        |
| **Borderline** | You're within 15% below the threshold — skip nothing until recovered   |
| **At risk**    | You're more than 15% below — focus on attending every class           |
| **Can Bunk**   | Exact number of additional classes you may skip and stay above target |
| **Must Attend**| Exact number of consecutive classes you must attend to reach target   |

### Saving Snapshots

Click **Save Snapshot** to record your current attendance state. Up to 8 snapshots are stored locally; each appears as a card with timestamp, percentage, and a colored status bar.

### Resetting

Click the **Reset** button (circular arrow icon) to restore the inputs to their default values. Saved snapshots are preserved.

---

## How It Works

The calculator uses three simple formulas. All computations happen client-side, in `js/calculator.js`.

### 1. Attendance Percentage

$$\text{percent} = \frac{\text{attended}}{\text{total}} \times 100$$

If `total` is 0, the percentage is treated as 0 to avoid division-by-zero.

### 2. Classes You Can Bunk

We want the largest integer $x$ such that adding $x$ more "skipped" classes still keeps attendance at or above the threshold:

$$\frac{\text{attended}}{\text{total} + x} \geq \frac{\text{threshold}}{100}$$

Solving for $x$:

$$x = \left\lfloor \frac{\text{attended} \times 100}{\text{threshold}} - \text{total} \right\rfloor$$

Clamped to a minimum of 0.

### 3. Classes You Must Attend

We want the smallest integer $y$ such that attending $y$ more classes (which also increases the total by $y$) reaches the threshold:

$$\frac{\text{attended} + y}{\text{total} + y} \geq \frac{\text{threshold}}{100}$$

Solving for $y$ (when threshold < 100%):

$$y = \left\lceil \frac{k \cdot \text{total} - \text{attended}}{1 - k} \right\rceil \quad \text{where } k = \frac{\text{threshold}}{100}$$

Clamped to a minimum of 0.

### Status Classification

| Status      | Condition                                  | Color   |
| ----------- | ------------------------------------------ | ------- |
| **Safe**    | `percent ≥ threshold`                      | Emerald |
| **Borderline** | `threshold - 15 ≤ percent < threshold` | Amber   |
| **At risk** | `percent < threshold - 15`                 | Rose    |

---

## Module Reference

Each JS module exposes a small, well-documented API on `window.AC`.

### `AC.utils` — pure helpers

```js
AC.utils.clamp(n, lo, hi)        // → number
AC.utils.$(id)                    // → HTMLElement
AC.utils.toInt(v, fallback)       // → number
AC.utils.escapeHtml(s)            // → string (XSS-safe)
AC.utils.uuid()                   // → string
AC.utils.formatDate(date)         // → string
```

### `AC.storage` — localStorage CRUD

```js
AC.storage.load()                 // → HistoryItem[]
AC.storage.save(history)          // → boolean
AC.storage.add(item)              // → HistoryItem[] (after add + trim)
AC.storage.clear()                // void
AC.storage.LIMIT                  // 8
```

### `AC.calc` — pure calculation engine

```js
AC.calc.compute(attended, total, threshold)
// → { attended, total, threshold, percent, percentClamped,
//     canBunk, mustAttend, bunked, status, color, label }

AC.calc.STATUS                    // { SAFE, WARNING, DANGER }
AC.calc.COLORS                    // status → hex color
AC.calc.classify(percent, threshold)
AC.calc.statusLabel(status)
```

### `AC.anim` — animation helpers

```js
AC.anim.animateCountUp(el, target, { suffix, decimals, duration })
AC.anim.resetCountUp()
AC.anim.bump(el, className?)
AC.anim.confetti(containerEl)
AC.anim.toast(el, msg)
```

### `AC.ui` — view layer

```js
AC.ui.init()                      // cache DOM refs, setup ring
AC.ui.render(result)              // render a calc result bundle
AC.ui.renderHistory(history)      // render snapshot list
AC.ui.showToast(msg)
AC.ui.bumpThreshold()
AC.ui.els()                       // → cached element refs
```

### `main.js` — entry point

Auto-bootstraps on `DOMContentLoaded`. Wires input events, stepper buttons, save/reset/clear actions, and keyboard shortcuts to the calculation pipeline.

---

## Customization

### Colors

All colors live in `css/variables.css`. Change the three palette variables and the entire UI updates:

```css
:root {
  --emerald:  #10b981;   /* safe color    */
  --amber:    #f59e0b;   /* warning color */
  --rose:     #ef4444;   /* danger color  */
}
```

### Defaults

Edit `index.html` to change the starting values:

```html
<input id="attended"  value="45" ... />
<input id="total"     value="60" ... />
<input id="threshold" value="75" ... />
```

### History Limit

In `js/storage.js`:

```js
const LIMIT = 8;   // change to any number
```

### Disable Confetti

In `js/ui.js`, comment out the `confetti(...)` call inside `render()`.

---

## Accessibility

This project follows modern accessibility best practices:

- ✅ All interactive elements are reachable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`)
- ✅ Icon-only buttons have descriptive `aria-label`s
- ✅ Form inputs have visible labels above them
- ✅ Status changes are announced to screen readers via the toast's `role="status"` + `aria-live="polite"`
- ✅ Color is never the only signal — text labels accompany every status indicator
- ✅ Maintains at least a 4.5:1 contrast ratio for body text in both light and dark mode
- ✅ Respects `prefers-color-scheme` for automatic light/dark theme switching
- ✅ Respects `prefers-reduced-motion` — all animations are disabled for users who request reduced motion

---

## Keyboard Shortcuts

| Key             | Action            |
| --------------- | ----------------- |
| `Tab` / `Shift+Tab` | Move between controls |
| `+` / `−` buttons | Increment / decrement values |
| `S`             | Save snapshot     |
| `R`             | Reset all inputs   |
| `←` / `→` on slider | Decrease / increase threshold |

---

## Browser Support

Tested and working on:

| Browser          | Version  | Status |
| ---------------- | -------- | ------ |
| Chrome / Edge    | 110+     | ✅     |
| Firefox          | 110+     | ✅     |
| Safari (macOS / iOS) | 16.1+ | ✅     |
| Arc              | Latest   | ✅     |

**Requirements**: support for CSS `color-mix()`, custom properties, `localStorage`, and `requestAnimationFrame`. All of these have been baseline-supported in evergreen browsers since 2023.

---

## Roadmap

Planned for future releases:

- [ ] Weekly trend chart of saved snapshots (line graph)
- [ ] Subject-wise tracker — multiple attendance streams with weighted average
- [ ] Export snapshots to CSV / JSON
- [ ] PWA install with offline support
- [ ] Calendar view showing which days you attended
- [ ] Predicted "drop below threshold" date estimator
- [ ] Theme picker (Forest / Sunset / Ocean / Mono)

Have a feature request? [Open an issue](#contributing).

---

## Contributing

Contributions are welcome — bug reports, feature requests, accessibility improvements, performance optimizations, and especially new theme palettes.

### Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes — keep the standalone HTML file self-contained (no external JS/CSS dependencies beyond Google Fonts)
4. Test in at least Chrome + Firefox
5. Open a Pull Request describing what changed and why

### Code Style

- **HTML**: 2-space indent, lowercase tags, double-quoted attributes
- **CSS**: 2-space indent, custom properties at the top of `:root`, mobile-first media queries
- **JS**: 2-space indent, `'use strict'`, IIFE-wrapped, descriptive variable names, JSDoc on public APIs

### Architecture Rules

When adding a new feature:

- **New CSS component?** → add to `css/components.css` (or split into a new file)
- **New animation?** → add the `@keyframes` to `css/animations.css`
- **New calculation?** → add to `js/calculator.js` (must be pure, no DOM access)
- **New DOM rendering?** → add to `js/ui.js`
- **New event listener?** → wire it in `js/main.js`

Never mix concerns across these boundaries.

---

## License

Released under the **MIT License** — see [LICENSE](./LICENSE) for full text.

```
MIT License — Copyright (c) 2026 Attendance Calculator Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

---

## Acknowledgements

This project stands on the shoulders of the open web. Thanks to:

- The **MDN Web Docs** team for the best reference documentation on Earth
- The **Inter** typeface by Rasmus Andersson — designed for screens
- The **Lucide** icon library (the source of the inline SVG paths used here)
- **Andy Bell** for the modern CSS reset that `css/reset.css` is based on
- Every student who ever asked *"how many classes can I skip?"* — this is for you

---

<p align="center">
  Made with ❤️ for students everywhere<br>
  <sub>No backend. No tracking. No ads. Just math.</sub>
</p>
