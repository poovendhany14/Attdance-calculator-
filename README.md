# 🎓 Attendance Calculator

> A beautiful, animation-rich attendance calculator that tells you exactly how many classes you can bunk — and how many you must attend to reach your target.

[![Made with HTML](https://img.shields.io/badge/HTML-5-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020+-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Build Step](https://img.shields.io/badge/Build-None-success)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](#license)

---

## 📑 Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Live Preview](#live-preview)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
   - [Option A — Standalone HTML (zero install)](#option-a--standalone-html-zero-install)
   - [Option B — Next.js Dev Project](#option-b--nextjs-dev-project)
6. [Usage Guide](#usage-guide)
7. [How It Works](#how-it-works)
   - [Attendance Percentage](#1-attendance-percentage)
   - [Classes You Can Bunk](#2-classes-you-can-bunk)
   - [Classes You Must Attend](#3-classes-you-must-attend)
8. [Project Structure](#project-structure)
9. [Customization](#customization)
10. [Accessibility](#accessibility)
11. [Keyboard Shortcuts](#keyboard-shortcuts)
12. [Browser Support](#browser-support)
13. [Roadmap](#roadmap)
14. [Contributing](#contributing)
15. [License](#license)
16. [Acknowledgements](#acknowledgements)

---

## Overview

**Attendance Calculator** is a lightweight, zero-dependency web app built for students who need to track their class attendance and plan around a required minimum threshold (typically 75% in most universities).

Instead of just showing a percentage, it answers the two questions students actually ask:

- *"How many classes can I skip and still stay above the requirement?"*
- *"How many classes do I need to attend to recover?"*

All of this is wrapped in a polished, animation-first UI — count-up numbers, an animated SVG progress ring, floating gradient blobs, spring-bouncing stat cards, and a confetti celebration whenever you cross into the safe zone.

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

After downloading the project, simply open `download/attendance-calculator.html` in any modern browser. No server, no build step, no installation required.

A reference screenshot is included: `download/attendance-calculator-preview.png`.

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

> **Why no framework?** The standalone HTML version is intentionally framework-free so it can be opened from any device, emailed as a single file, hosted on any static host (GitHub Pages, Netlify drop, USB stick), and audited line-by-line. A React/Next.js reference implementation is also available in `src/app/page.tsx` for those who want to integrate it into a larger app.

---

## Getting Started

You have two ways to run the Attendance Calculator.

### Option A — Standalone HTML (zero install)

This is the recommended path for end users.

1. Download `attendance-calculator.html` to your computer.
2. Double-click it, or drag it into a browser window.
3. That's it — the calculator is fully functional.

```bash
# Optional: serve it locally for a cleaner URL
python3 -m http.server 8080 --directory download
# then open http://localhost:8080/attendance-calculator.html
```

### Option B — Next.js Dev Project

For developers who want to extend or integrate the calculator into a larger app, a React/Next.js reference implementation is included.

**Prerequisites**

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh) 1.0+
- Next.js 16 / React 19 / TypeScript 5

**Install & run**

```bash
# 1. install dependencies
bun install      # or: npm install

# 2. start the dev server
bun run dev      # or: npm run dev

# 3. open the app
# dev server runs on http://localhost:3000
```

**Available scripts**

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `bun run dev`      | Start the Next.js dev server (port 3000) |
| `bun run lint`     | Run ESLint on the project                |
| `bun run build`    | Produce a production build               |
| `bun run db:push` | Push Prisma schema to SQLite (if needed) |

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

The calculator uses three simple formulas. All computations happen client-side.

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

## Project Structure

```
my-project/
├── download/                            # ← user-facing deliverables
│   ├── attendance-calculator.html       # ← standalone single-file app (recommended)
│   ├── attendance-calculator-preview.png
│   └── README.md                        # ← this file
│
├── src/                                 # ← Next.js reference implementation
│   └── app/
│       ├── page.tsx                     # ← React + Framer Motion version
│       ├── layout.tsx
│       └── globals.css
│
├── public/
│   ├── logo.svg
│   └── robots.txt
│
├── prisma/schema.prisma                 # ← database schema (optional)
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md                            # ← this file
```

---

## Customization

The HTML file is intentionally readable and easy to hack. All key colors and tokens live at the top of the `<style>` block as CSS custom properties:

```css
:root {
  --emerald: #10b981;   /* safe color    */
  --amber:   #f59e0b;   /* warning color */
  --rose:    #ef4444;   /* danger color  */
  --radius:  16px;      /* global corner radius */
}
```

### Common Tweaks

- **Change the default threshold**: edit `value="75"` on the `<input id="threshold">` element and the matching `threshold` value in the `recalc()` function.
- **Change default attended/total**: edit `value="45"` and `value="60"` on the two stepper inputs.
- **Increase snapshot history limit**: change `.slice(0, 8)` in `saveSnapshot()` to any number you prefer.
- **Disable confetti**: comment out the `fireConfetti()` call in `recalc()`.
- **Change the page title**: edit the `<title>` tag in the `<head>`.

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
- ✅ No motion that triggers photosensitivity — all animations are gentle (≤ 1.4s)

---

## Keyboard Shortcuts

| Key             | Action            |
| --------------- | ----------------- |
| `Tab` / `Shift+Tab` | Move between controls |
| `+` / `-` buttons | Increment / decrement values |
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
- **JS**: 2-space indent, `'use strict'`, IIFE-wrapped, descriptive variable names

---

## License

Released under the **MIT License**.

```
MIT License

Copyright (c) 2026 Attendance Calculator Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgements

This project stands on the shoulders of the open web. Thanks to:

- The **MDN Web Docs** team for the best reference documentation on Earth
- The **Inter** typeface by Rasmus Andersson — designed for screens
- The **Lucide** icon library (the source of the inline SVG paths used here)
- Every student who ever asked *"how many classes can I skip?"* — this is for you

---

<p align="center">
  Made with ❤️ for students everywhere<br>
  <sub>No backend. No tracking. No ads. Just math.</sub>
</p>
