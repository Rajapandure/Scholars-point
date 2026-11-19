import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const BOOK_LINKS = [
  { title: 'NCERT Mathematics Official Textbook', board: 'NCERT / CBSE', url: 'https://ncert.nic.in/textbook.php' },
  { title: 'NCERT Science & EVS Official Textbook', board: 'NCERT / CBSE', url: 'https://ncert.nic.in/textbook.php' },
  { title: 'NCERT English (First Flight / Beehive / Marigold)', board: 'NCERT / CBSE', url: 'https://ncert.nic.in/textbook.php' },
  { title: 'MP Board (MPBSE) State Curriculum Textbooks', board: 'MPBSE', url: 'https://mpbse.nic.in/' },
];

export default function TextbookVault() {
  const { activeStudent } = useAppState();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-extrabold">
          📚 NCERT &amp; MP Board PDFs — Class {activeStudent.classNum}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Direct chapter-wise textbook repositories for offline download and classroom reference.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BOOK_LINKS.map((book) => (
          <a
            key={book.title}
            href={book.url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 flex items-center justify-between gap-3 transition"
          >
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {book.board}
              </span>
              <h3 className="font-bold text-sm mt-1.5">{book.title}</h3>
            </div>
            <span className="text-xs font-bold text-blue-600 shrink-0">Open PDF →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
