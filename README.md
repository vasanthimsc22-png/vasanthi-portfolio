## 📁 File Structure

| File | Purpose |
|------|---------|
| `index.html` | HTML structure — all page content, navigation, chatbot markup, and print resume |
| `styles.css` | Portfolio styles — layout, nav, hero, cards, skills, timeline, projects, contact, responsive, and print resume CSS |
| `chatbot.css` | Chatbot widget styles — FAB button, chat panel, messages, chips, input area |
| `portfolio.js` | Portfolio logic — page navigation, theme toggle, mobile menu, and the pattasu (sparkle) mouse effect |
| `chatbot.js` | Chatbot logic — draggable FAB, panel open/close, knowledge base, regex intent matching, typing effect |

## 🔗 How They Connect

```
index.html
  ├── <link href="styles.css">      → Portfolio styling
  ├── <link href="chatbot.css">     → Chatbot widget styling
  ├── <script src="portfolio.js">   → Navigation + theme + sparkle effect
  └── <script src="chatbot.js">     → Chatbot IIFE (FAB, panel, KB, replies)
```

- `styles.css` defines CSS variables (`:root`) used by ALL files (including `chatbot.css` and inline styles in HTML)
- `portfolio.js` runs inside `DOMContentLoaded` — sets up nav, theme, and canvas sparkles
- `chatbot.js` is a self-contained IIFE — manages the chatbot independently

## 🚀 How to Use

### Local
Just open `index.html` in any browser. That's it — no server needed.

### GitHub Pages
1. Create a repository (e.g., `vasanthi-portfolio`)
2. Upload ALL 5 files into the same folder (root of repo):
   - `index.html`
   - `styles.css`
   - `chatbot.css`
   - `portfolio.js`
   - `chatbot.js`
3. Go to Settings → Pages → Deploy from branch → `main` / `root`
4. Your site will be live at `https://yourusername.github.io/vasanthi-portfolio/`

## ✨ Features

- Dark/Light theme toggle with localStorage persistence
- Single-page app navigation (no page reloads)
- Responsive mobile menu
- Mouse sparkle (pattasu) effect on canvas
- Draggable chatbot FAB button
- AI-style chatbot with typing effect and knowledge base
- Print-optimized resume layout
- SEO meta tags + Open Graph support
