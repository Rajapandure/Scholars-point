import React from 'react';
import { useAppState } from '../../context/AppStateContext';

const TOP_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'learn', label: 'Learn & Practice' },
  { id: 'progress', label: 'My Progress & Revision' },
  { id: 'pdfs', label: 'NCERT & MP PDFs' },
  { id: 'paper-builder', label: 'Paper Builder' },
  { id: 'mistakes', label: 'Mistakes' },
];

const CLASSES = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const BOARDS = ['NCERT', 'CBSE', 'MPBSE', 'All'];

export default function TopNavbar() {
  const {
    activeStudent,
    updateActiveStudent,
    activeTab,
    setActiveTab,
    setIsDrawerOpen,
    setIsSlateOpen,
    setIsCMSOpen,
    darkMode,
    setDarkMode,
  } = useAppState();

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Student Portal Menu"
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <span className="text-lg">☰</span>
          </button>
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              SP
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">
              Scholar&apos;s Point
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center bg-slate-100/90 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/70 dark:border-slate-700">
          {TOP_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {tab.id === 'mistakes' && activeStudent.mistakes.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px]">
                    {activeStudent.mistakes.length}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={() => setIsCMSOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-600 flex items-center gap-1"
          >
            <span>🔒</span> CMS
          </button>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100"
          >
            <span>👤</span> {activeStudent.name}
          </button>

          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Class {activeStudent.classNum} • {activeStudent.board}
          </span>

          <button
            onClick={() =>
              updateActiveStudent({
                medium: activeStudent.medium === 'EN' ? 'HI' : 'EN',
              })
            }
            className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100"
          >
            {activeStudent.medium === 'EN' ? 'English (EN)' : 'हिंदी (HI)'}
          </button>

          <button
            onClick={() => setIsSlateOpen(true)}
            className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 flex items-center gap-1"
          >
            <span>✏️</span> Slate
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-100">
            📱 App
          </span>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CLASSES.map((cls) => {
              const isSelected = activeStudent.classNum === cls;
              return (
                <button
                  key={cls}
                  onClick={() => updateActiveStudent({ classNum: cls })}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                  }`}
                >
                  Class {cls}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              {BOARDS.map((b) => (
                <button
                  key={b}
                  onClick={() => updateActiveStudent({ board: b })}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                    activeStudent.board === b
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => updateActiveStudent({ medium: 'EN' })}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeStudent.medium === 'EN'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => updateActiveStudent({ medium: 'HI' })}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activeStudent.medium === 'HI'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
