import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const DAILY_QUESTIONS = [
  {
    tag: 'Ch 1: Real Numbers (Fundamental Theorem of Arithmetic & Irrationality Proofs) — Practice Q1',
    prompt: 'Evaluate (13 + 5) using Class 10 operation rules:',
    answer: '18',
  },
  {
    tag: 'Ch 1: Real Numbers — Practice Q2',
    prompt: 'Find HCF(26, 91) using prime factorization:',
    answer: '13',
  },
  {
    tag: 'English Grammar — Tenses Check',
    prompt: 'Identify the tense: "She has been studying for three hours."',
    answer: 'Present Perfect Continuous',
  },
];

const SUBJECT_CARDS = [
  { name: 'Mathematics', chapters: 10, qs: 200, progress: 10, icon: '📐', color: 'bg-blue-600' },
  { name: 'English Reader', chapters: 4, qs: 80, progress: 0, icon: '📗', color: 'bg-emerald-600' },
  { name: 'English Grammar', chapters: 2, qs: 40, progress: 0, icon: '✍️', color: 'bg-purple-600' },
  { name: 'Science / EVS', chapters: 12, qs: 240, progress: 0, icon: '🔬', color: 'bg-amber-500' },
  { name: 'Social Science', chapters: 14, qs: 280, progress: 0, icon: '🌍', color: 'bg-teal-600' },
  { name: 'Hindi (हिन्दी)', chapters: 8, qs: 160, progress: 0, icon: '🕉️', color: 'bg-rose-600' },
];

export default function HomeDashboard() {
  const {
    students,
    activeStudent,
    setActiveTab,
    setSelectedSubject,
    setIsDrawerOpen,
    setIsSlateOpen,
    logStudyStep,
    addXP,
    isJuniorMode,
  } = useAppState();

  const [qIndex, setQIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentQ = DAILY_QUESTIONS[qIndex % DAILY_QUESTIONS.length];
  const goalPercent = Math.round(
    (activeStudent.dailyTasksDone / activeStudent.dailyTasksTarget) * 100
  );

  const handleRevealAnswer = () => {
    if (!revealed) {
      setRevealed(true);
      addXP(15);
    }
  };

  const handleSkipQuestion = () => {
    setRevealed(false);
    setQIndex((prev) => prev + 1);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-2xl">
                🚀
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Welcome back, {activeStudent.name}!
                </h1>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Class {activeStudent.classNum} • {activeStudent.board} •{' '}
                  {activeStudent.medium === 'EN' ? 'English Medium' : 'हिन्दी माध्यम'} •{' '}
                  {isJuniorMode
                    ? 'Adaptive Junior Mode (Classes 2–5)'
                    : 'Board Scholar Mode (Classes 6–10)'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
            >
              <span>👥</span> Switch Student ({students.length})
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-blue-600 uppercase tracking-wide">
                ▶️ Continue Learning (📐 {activeStudent.currentChapter.subject})
              </span>
              <span className="text-slate-400">Recent: Completed Lesson (Today)</span>
            </div>

            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              {activeStudent.currentChapter.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStudent.currentChapter.summary}
            </p>

            <p className="text-xs pt-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                ✨ Recommended Next:{' '}
              </span>
              <button
                onClick={() => setActiveTab('learn')}
                className="text-emerald-700 dark:text-emerald-400 underline font-semibold hover:text-emerald-800 text-left"
              >
                {activeStudent.currentChapter.nextTitle}
              </button>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveTab('learn')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <span>📘</span> Open Lesson
              </button>
              <button
                onClick={() => setActiveTab('examples')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <span>✏️</span> Practice Examples
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <span>⚡</span> Take Quiz
              </button>
            </div>

            <button
              onClick={() => setIsSlateOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 border border-amber-200"
            >
              <span>✏️</span> Rough Slate
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              🔥 {activeStudent.streak} Day Streak
            </span>
            <span className="text-sm font-extrabold text-blue-600">
              ⚡ {activeStudent.xp} XP
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800 dark:text-slate-200">
                🎯 Daily Learning Goal
              </span>
              <span className="text-blue-600">
                {activeStudent.dailyTasksDone} / {activeStudent.dailyTasksTarget} Tasks ({goalPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500">
                Chapters Mastered: {activeStudent.chaptersMastered}
              </span>
              <button
                onClick={logStudyStep}
                className="font-bold text-emerald-600 hover:underline"
              >
                + Log Study Step
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                📅 Revision Due Today: {activeStudent.revisionDue.length}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {activeStudent.revisionDue[0] || 'All caught up!'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('progress')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0"
            >
              Review →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setActiveTab('mistakes')}
              className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>💡</span> Mistakes ({activeStudent.mistakes.length})
            </button>
            <button
              onClick={() => setActiveTab('pdfs')}
              className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>📥</span> Books &amp; PDFs
            </button>
          </div>
        </section>
      </div>

      <section className="p-4 sm:p-5 rounded-3xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[11px] font-extrabold">
              🏆 DAILY CHALLENGE (+15 XP)
            </span>
            <span className="text-xs text-slate-500 font-medium">
              1-Tap Quick Concept Check
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            [{currentQ.tag}] {currentQ.prompt}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRevealAnswer}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
          >
            {revealed ? `Answer: ${currentQ.answer}` : 'Reveal Answer (+15 XP)'}
          </button>
          <button
            onClick={handleSkipQuestion}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold"
          >
            Skip / Other
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Subject Cards • Class {activeStudent.classNum} ({activeStudent.board})
          </h3>
          <button
            onClick={() => setActiveTab('subjects')}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Open Full Subjects Catalogue →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECT_CARDS.map((sub) => (
            <div
              key={sub.name}
              onClick={() => {
                setSelectedSubject(sub.name);
                setActiveTab('learn');
              }}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 cursor-pointer transition shadow-2xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl ${sub.color} text-white flex items-center justify-center text-xl shadow-xs`}
                >
                  {sub.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {sub.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {sub.chapters} Chapters • {sub.qs} Qs
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-blue-600">
                  {sub.progress}%
                </span>
                <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
