/* ═══════════════════════════════════════════════════════════════════════════════
   AEL LLM Engineering Reference 2026 — JavaScript
   Author: Ayman Elmasry — AEL Digital Studio
   Version: AEL Vision Framework v2.2
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─── COPY TO CLIPBOARD ────────────────────────────────────────────────────────
function copyCmd(btn, text) {
  event.stopPropagation();
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.textContent = '✅ Copied';
    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '📋 Copy'; }, 1500);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    btn.classList.add('copied'); btn.textContent = '✅ Copied';
    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '📋 Copy'; }, 1500);
  });
}

// ─── LEARNING PROGRESS (localStorage) ─────────────────────────────────────────
const STORAGE_KEY = 'ael-llm-ref-progress';

function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

function setProgress(cardId, status) {
  const prog = getProgress();
  if (prog[cardId] === status) { delete prog[cardId]; } else { prog[cardId] = status; }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
  applyProgress();
  updateProgressStats();
}

function applyProgress() {
  const prog = getProgress();
  document.querySelectorAll('.cmd-card').forEach(card => {
    const id = card.id;
    card.querySelectorAll('.prog-btn').forEach(btn => btn.classList.remove('active-prog'));
    if (prog[id]) {
      const btn = card.querySelector('.prog-' + prog[id]);
      if (btn) btn.classList.add('active-prog');
    }
  });
}

function updateProgressStats() {
  const prog = getProgress();
  const total = document.querySelectorAll('.cmd-card').length;
  const mastered = Object.values(prog).filter(v => v === 'mastered').length;
  const learning = Object.values(prog).filter(v => v === 'learning').length;
  const el = document.getElementById('progressStats');
  if (el) el.textContent = mastered + '/' + total + ' mastered';
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
function exportMarkdown() {
  let md = '# AEL LLM Engineering Reference 2026\n\n';
  document.querySelectorAll('.cat-section').forEach(sec => {
    const title = sec.querySelector('.cat-title')?.textContent || '';
    md += '## ' + title + '\n\n';
    sec.querySelectorAll('.cmd-card').forEach(card => {
      const name = card.querySelector('.cmd-text')?.textContent || '';
      const desc = card.querySelector('.cmd-desc')?.textContent || '';
      const diff = card.querySelector('.diff-tag')?.textContent || '';
      md += '### ' + name + ' [' + diff + ']\n\n';
      md += desc + '\n\n';
      const code = card.querySelector('.cmd-code-block code')?.textContent || '';
      if (code) md += '```\n' + code + '\n```\n\n';
      const tip = card.querySelector('.cmd-tip')?.textContent || '';
      if (tip) md += '> ' + tip + '\n\n';
      md += '---\n\n';
    });
  });
  downloadFile('ael-llm-reference.md', md, 'text/markdown');
}

function exportJSON() {
  const data = { title: 'AEL LLM Engineering Reference 2026', version: '2.0', categories: [] };
  document.querySelectorAll('.cat-section').forEach(sec => {
    const cat = { title: sec.querySelector('.cat-title')?.textContent || '', cards: [] };
    sec.querySelectorAll('.cmd-card').forEach(card => {
      cat.cards.push({
        title: card.querySelector('.cmd-text')?.textContent || '',
        description: card.querySelector('.cmd-desc')?.textContent || '',
        difficulty: card.querySelector('.diff-tag')?.textContent || '',
        code: card.querySelector('.cmd-code-block code')?.textContent || '',
        tip: card.querySelector('.cmd-tip')?.textContent || '',
      });
    });
    data.categories.push(cat);
  });
  downloadFile('ael-llm-reference.json', JSON.stringify(data, null, 2), 'application/json');
}

function exportPDF() { window.print(); }

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ─── EXPAND / COLLAPSE ────────────────────────────────────────────────────────
document.querySelectorAll('.cmd-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.copy-btn') || e.target.closest('.related-link')) return;
    card.classList.toggle('expanded');
  });
});

// ─── SEARCH (Ranked) ──────────────────────────────────────────────────────────
const searchInput = document.getElementById('searchInput');
const searchHint = document.getElementById('searchHint');
const clearBtn = document.getElementById('clearBtn');
const noResults = document.getElementById('noResults');
const allCards = document.querySelectorAll('.cmd-card');
const allSections = document.querySelectorAll('.cat-section');

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
  if (e.key === 'Escape') { searchInput.blur(); clearSearch(); }
});

searchInput.addEventListener('focus', () => { searchHint.classList.add('hidden'); clearBtn.classList.add('visible'); });
searchInput.addEventListener('blur', () => { if (!searchInput.value) { searchHint.classList.remove('hidden'); clearBtn.classList.remove('visible'); } });

function getCardScore(card, q) {
  const title = (card.querySelector('.cmd-text')?.textContent || '').toLowerCase();
  const desc = (card.querySelector('.cmd-desc')?.textContent || '').toLowerCase();
  const flags = (card.getAttribute('data-flags') || '').toLowerCase();
  const related = (card.getAttribute('data-related') || '').toLowerCase();
  const searchData = (card.getAttribute('data-search') || '').toLowerCase();

  // Exact title match = highest score
  if (title === q) return 100;
  // Title starts with query
  if (title.startsWith(q)) return 90;
  // Title contains query
  if (title.includes(q)) return 80;
  // Flags/keywords match
  if (flags.includes(q)) return 60;
  // Related terms match
  if (related.includes(q)) return 50;
  // Full search data match (desc + example)
  if (searchData.includes(q)) return 40;
  return 0;
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  if (!q) { clearSearch(); return; }

  // Score and sort cards
  const scored = [];
  allCards.forEach(card => {
    const score = getCardScore(card, q);
    if (score > 0) scored.push({ card, score });
  });
  scored.sort((a, b) => b.score - a.score);

  // Hide all, then show scored
  allCards.forEach(c => c.classList.add('hidden'));
  scored.forEach(({ card }) => card.classList.remove('hidden'));

  // Show/hide sections
  allSections.forEach(sec => {
    const visCards = sec.querySelectorAll('.cmd-card:not(.hidden)');
    sec.classList.toggle('hidden', visCards.length === 0);
  });

  noResults.classList.toggle('visible', scored.length === 0);
});

function clearSearch() {
  searchInput.value = '';
  allCards.forEach(c => c.classList.remove('hidden'));
  allSections.forEach(s => s.classList.remove('hidden'));
  noResults.classList.remove('visible');
  clearBtn.classList.remove('visible');
  searchHint.classList.remove('hidden');
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
});

// ─── ACTIVE NAV + SECTION PROGRESS ────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.cat-section');

function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

function updateSectionProgress() {
  sections.forEach(section => {
    const cards = section.querySelectorAll('.cmd-card');
    const total = cards.length;
    if (total === 0) return;
    const progressEl = section.querySelector('.nav-progress');
    if (!progressEl) return;
    let visible = 0;
    cards.forEach(c => { if (!c.classList.contains('hidden')) visible++; });
    progressEl.textContent = visible + '/' + total;
  });
}

window.addEventListener('scroll', () => { updateActiveNav(); updateSectionProgress(); });
updateActiveNav();
updateSectionProgress();
applyProgress();
updateProgressStats();
