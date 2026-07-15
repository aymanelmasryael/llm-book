# AEL LLM Engineering Reference 2026

> A comprehensive interactive reference for Large Language Model (LLM) Engineering.

**Version 1.0.0** · 103 Concepts · 10 Categories · Zero Dependencies

---

## Features

- 103 LLM engineering concepts organized into 10 categories
- Interactive Learning Roadmap (Beginner → Intermediate → Advanced)
- Expandable concept cards with details, references, and cross-links
- Instant full-text search with ranking (title > flags > related > description)
- Learning progress tracking (Unread / Learning / Mastered) saved to localStorage
- Section progress counters
- Export to PDF (print), Markdown, or JSON
- Version & Source info on every card (arXiv papers, GitHub repos, official docs)
- Glossary of 25 LLM terms
- Responsive design (desktop, tablet, mobile)
- Dark mode with glassmorphism UI
- Zero dependencies — pure HTML, CSS, and JavaScript

## Categories

| Category | Icon | Concepts |
|----------|------|----------|
| Architecture | 🧠 | Transformer, Decoder-Only, Encoder-Decoder, MoE, and more |
| Inference & Sampling | ⚙️ | Temperature, Top-k, Top-p, Beam Search, KV Cache, and more |
| Prompt Engineering | ✍️ | Zero-shot, Few-shot, Chain-of-Thought, System Prompts, and more |
| Context Engineering | 📦 | RAG, Long Context, Sliding Window, Context Caching, and more |
| Agents & Tool Calling | 🤖 | ReAct, Function Calling, Multi-Agent, Planning, and more |
| Fine-Tuning & Training | 🔧 | SFT, RLHF, DPO, LoRA, QLoRA, and more |
| Evaluation & Benchmarks | 📊 | MMLU, HumanEval, Arena ELO, and more |
| Deployment & APIs | 🚀 | vLLM, TensorRT-LLM, Quantization, Batching, and more |
| Security & Safety | 🛡 | Prompt Injection, Jailbreaking, Guardrails, and more |
| Model Selection Guide | 🎯 | Comparative tables for choosing the right model |

## Live Demo

[https://aymanelmasry.me/llm-book](https://aymanelmasry.me/llm-book)

## Quick Start

No build step required. Open `index.html` in any modern browser.

```bash
git clone https://github.com/aymanelmasryael/ael-llm-engineering-reference-2026.git
cd ael-llm-engineering-reference-2026
open index.html
```

## Project Structure

```
├── index.html          # Main HTML file
├── llm_book.css        # Styles (dark mode, glassmorphism, responsive)
├── llm_book.js         # Logic (search, progress, export, expandable cards)
├── ael-logo.svg        # AEL logo
├── favicon.svg         # Browser tab icon
├── gen_llm_book.py     # Python generator script
├── ICON_GUIDE.md       # Design documentation
├── LICENSE             # MIT License
└── README.md           # This file
```

## Built With

- HTML5
- CSS3 (Custom Properties, Glassmorphism, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Zero external dependencies

## Author

**Ayman Elmasry** — AEL Digital Studio

- Website: [aymanelmasry.me](https://aymanelmasry.me)
- GitHub: [@aymanelmasryael](https://github.com/aymanelmasryael)
- LinkedIn: [aymanelmasryael](https://linkedin.com/in/aymanelmasryael)
- X (Twitter): [@aymanelmasryael](https://x.com/aymanelmasryael)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

> "If you want to understand something, start by building it from scratch."
