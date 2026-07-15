# AEL LLM Engineering Cheat Sheet 2026 — Design Documentation

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Blue | `#0074FF` | Primary brand, links, search focus |
| Gold | `#FFD700` | Stats, tips, secondary highlights |
| Teal | `#00FFCC` | Copy hover, accent borders |
| Purple | `#6C47FF` | Prompt Engineering category |
| Pink | `#FF4D8D` | Agents & Tools category |
| Green | `#00FF88` | Architecture, command text |
| Red | `#FF4444` | Security & Safety category |

## Typography

- **Font**: Inter (Google Fonts), fallback: system-ui, -apple-system, sans-serif
- **Mono**: SF Mono, Fira Code, Cascadia Code
- **Header Title**: 16px, weight 700
- **Subtitle**: 11px, uppercase, letter-spacing 1px, white 70% opacity
- **Card Title**: 13px, weight 600, green `#00FF88`
- **Description**: 13px, dim `#7B8FA8`
- **Flags**: 10px, muted `#4B5C73`
- **Tip**: 11px, gold `#FFD700`

## Category Colors

| Category | Icon | Color |
|----------|------|-------|
| Architecture | 🧠 | `#00FF88` |
| Inference & Sampling | ⚙️ | `#FFD700` |
| Prompt Engineering | ✍️ | `#6C47FF` |
| Context Engineering | 📦 | `#00BFFF` |
| Agents & Tool Calling | 🤖 | `#FF4D8D` |
| Fine-Tuning & Training | 🔧 | `#FF8C42` |
| Evaluation & Benchmarks | 📊 | `#A78BFA` |
| Deployment & APIs | 🚀 | `#00FFCC` |
| Security & Safety | 🛡 | `#FF4444` |
| Model Selection Guide | 🎯 | `#E6EEF8` |

## Component Structure

- `.ael-header` — sticky, glassmorphism, blur 20px
- `.ael-brand` — flex row, logo 48px + text
- `.ael-stats` — gold numbers, dim labels
- `.nav-bar` — 4-column grid, sticky below header
- `.search-wrap` — full-width search with keyboard hint
- `.cat-section` — category container with color accent
- `.cat-header` — icon + title + count badge
- `.cat-grid` — auto-fill grid, min 360px
- `.cmd-card` — glassmorphism card with hover effects
- `.cmd-top` — flex row: title + copy button
- `.copy-btn` — clipboard API, 1.5s feedback
- `.cmd-desc` — description text
- `.flag-item` — inline badge for tags
- `.cmd-tip` — gold-bordered tip box

## Responsive Breakpoints

- **Desktop**: 4-column nav grid, auto-fill cards
- **Mobile (< 768px)**: 2-column nav, single-column cards

## File Structure

- `llm_book.html` — structure and content (116KB)
- `llm_book.css` — all styles (10KB)
- `llm_book.js` — search, copy, scroll spy, back-to-top (4KB)
- `ael-logo.svg` — AEL logo (vector)
- `ICON_GUIDE.md` — this file
- `gen_llm_book.py` — generator script

## Content Summary

- **10 categories** covering all LLM engineering domains
- **103 concepts** with formulas, code, and explanations
- References: SANS, OWASP Top 10, PromptWizz, Prompt Architects
- All content in English
- Academic-grade formulas with practical tips
