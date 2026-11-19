# Scholar's Point — Offline-First Learning Platform (Classes 1–10)

An offline-first, age-adaptive personal coaching and learning PWA for **Classes 1–10** aligned with **NCERT**, **CBSE**, and **MPBSE (Madhya Pradesh Board)** in **English** and **Hindi** medium.

## Key Features

- **Zero-Build Offline Architecture**: Runs directly in any modern browser or installs as a standalone PWA (`manifest.json` + `sw.js`) with zero cloud backend or external CDN dependencies.
- **Partitioned IndexedDB Storage (`ScholarsPointDB_v6`)**: 15 dedicated object stores behind `StorageAbstraction` with local PDF Blob storage, storage quota monitoring, and `.json` backup/restore. `localStorage` is strictly limited to theme, active student ID, and lightweight UI preferences.
- **Multi-Student Isolation**: Unlimited independent student profiles on a single device (`studentId`-scoped progress, XP, streaks, bookmarks, mistake notebook, test attempts, and revision schedules) with a built-in Profile Isolation Self-Test.
- **Age-Adaptive UI Modes**:
  - **Junior Explorer (Classes 1–5)**: Playful cards, large touch targets, read-aloud (`speechSynthesis`), and flashcards.
  - **Young Scholar (Classes 6–8)**: Structured subject cards, chapter progress bars, and interactive quizzes.
  - **Senior Scholar (Classes 9–10)**: Clean exam-prep layout, timed mock tests, and revision focus.
- **Subject Workspace**: Dedicated `LEARN`, `PRACTICE`, `EXERCISES`, and `MOCK PAPERS` workflows, plus Hindi phonetic pronunciation (`उच्चारण`), word meanings (`शब्दार्थ`) with audio, chapter summaries, and textbook Q&A.
- **Teacher CMS Studio (PIN: `1234`)**: Separated from student navigation with 5 management tabs (Chapter & Review Manager, Textbook Catalogue, Question-Bank Editor, PDF Import Vault, and Backup/Export).
- **Rough Slate**: Built-in touch & mouse drawing scratchpad for math and rough work.

## Project Structure

```text
scholars-point/
├── index.html          # Complete single-file Scholar's Point v6 application
├── manifest.json       # PWA Web App Manifest
├── sw.js               # Offline-first Service Worker
├── icons/
│   └── icon.svg        # App icon
├── .gitignore
└── README.md
```

## Quick Start

### Run Locally
1. Serve the folder with any static server (required for Service Worker & PWA features):
   ```bash
   python3 -m http.server 8080
   ```
   Or open `http://localhost:8080` in Chrome/Safari/Edge.

### Upload to Git / GitHub
```bash
git init
git add .
git commit -m "Initial commit: Scholar's Point v6 offline learning platform"
git branch -M main
git remote add origin https://github.com/<your-username>/scholars-point.git
git push -u origin main
```

You can also deploy directly by enabling **GitHub Pages** (`Settings -> Pages -> Deploy from branch: main`) or dragging the folder to **Netlify Drop**.
