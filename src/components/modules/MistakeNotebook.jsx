import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export default function MistakeNotebook() {
  const { activeStudent, updateActiveStudent, addXP } = useAppState();

  const resolveMistake = (id) => {
    updateActiveStudent((s) => ({
      ...s,
      mistakes: s.mistakes.filter((m) => m.id !== id),
    }));
    addXP(10);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold">
            💡 {activeStudent.name}&apos;s Mistake Notebook
          </h2>
          <p className="text-xs text-slate-500">
            Questions missed in quizzes appear here automatically. Master them to earn +10 XP.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs">
          {activeStudent.mistakes.length} Pending
        </span>
      </div>

      {activeStudent.mistakes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-3xl">🎉</p>
          <p className="font-bold text-sm">Zero unresolved mistakes for Class {activeStudent.classNum}!</p>
          <p className="text-xs text-slate-500">Take a practice quiz to test your chapter mastery.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeStudent.mistakes.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-600">{m.subject} • {m.date}</span>
                <p className="font-bold text-sm">{m.question}</p>
                <p className="text-xs text-emerald-700 font-semibold">Correct Answer: {m.answer}</p>
              </div>
              <button
                onClick={() => resolveMistake(m.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0"
              >
                ✓ Mark Mastered (+10 XP)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
