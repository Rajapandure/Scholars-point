import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const CHAPTER_CONTENT = {
  lesson: [
    'Fundamental Theorem of Arithmetic: Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.',
    'HCF & LCM Formula: For any two positive integers a and b, HCF(a, b) × LCM(a, b) = a × b.',
    'Irrationality Proofs: If a prime p divides a², then p divides a (where a is a positive integer). Used to prove √2, √3, and √5 are irrational.',
  ],
  examples: [
    {
      q: 'Example 1: Find the LCM and HCF of 6 and 20 by the prime factorisation method.',
      steps: '6 = 2¹ × 3¹ and 20 = 2² × 5¹. HCF(6, 20) = 2¹ = 2. LCM(6, 20) = 2² × 3¹ × 5¹ = 60.',
    },
    {
      q: 'Example 2: Given that HCF(306, 657) = 9, find LCM(306, 657).',
      steps: 'LCM = (306 × 657) / 9 = 34 × 657 = 22,338.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'What is the HCF of 26 and 91?',
      options: ['7', '13', '26', '182'],
      answer: '13',
    },
    {
      id: 'q2',
      question: 'Which of the following is an irrational number?',
      options: ['√4', '3/5', '√5', '0.25'],
      answer: '√5',
    },
    {
      id: 'q3',
      question: 'If HCF(a, b) = 12 and a × b = 1800, then LCM(a, b) is:',
      options: ['150', '180', '120', '21600'],
      answer: '150',
    },
  ],
};

export default function LearnAndQuizModule({ initialMode = 'learn' }) {
  const { activeStudent, selectedSubject, setActiveTab, addXP, logMistake, updateActiveStudent } = useAppState();
  const [subTab, setSubTab] = useState(initialMode);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, opt) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: opt }));
  };

  const handleSubmitQuiz = () => {
    if (submitted) return;
    let score = 0;
    CHAPTER_CONTENT.quiz.forEach((item) => {
      if (answers[item.id] === item.answer) {
        score += 1;
      } else {
        logMistake({
          subject: selectedSubject,
          question: item.question,
          answer: item.answer,
        });
      }
    });
    setSubmitted(true);
    addXP(score * 20);
    updateActiveStudent((s) => ({
      ...s,
      quizzesCompleted: s.quizzesCompleted + 1,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-blue-600 uppercase">
            Class {activeStudent.classNum} ({activeStudent.board}) • {selectedSubject}
          </span>
          <h2 className="text-lg font-extrabold mt-0.5">
            {activeStudent.currentChapter.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 'learn', label: '📘 Lesson' },
            { id: 'examples', label: '✏️ Worked Examples' },
            { id: 'tests', label: '⚡ Smart Quiz' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${
                subTab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('home')}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
          >
            ← Home
          </button>
        </div>
      </div>

      {subTab === 'learn' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base">Chapter Notes &amp; Key Theorems</h3>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
            {CHAPTER_CONTENT.lesson.map((point, idx) => (
              <li key={idx} className="leading-relaxed">{point}</li>
            ))}
          </ul>
        </div>
      )}

      {subTab === 'examples' && (
        <div className="space-y-4">
          {CHAPTER_CONTENT.examples.map((ex, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <h4 className="font-extrabold text-sm text-blue-700">{ex.q}</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl font-medium">
                <strong>Step-by-Step Solution:</strong> {ex.steps}
              </p>
            </div>
          ))}
        </div>
      )}

      {subTab === 'tests' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base">⚡ Quick Chapter Assessment (+20 XP per correct answer)</h3>
            {submitted && (
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="text-xs font-bold text-blue-600 underline"
              >
                Retake Quiz
              </button>
            )}
          </div>

          {CHAPTER_CONTENT.quiz.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-3">
              <p className="font-bold text-sm">
                {idx + 1}. {item.question}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {item.options.map((opt) => {
                  const chosen = answers[item.id] === opt;
                  const isCorrect = item.answer === opt;
                  let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700';
                  if (submitted) {
                    if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-600';
                    else if (chosen) style = 'bg-rose-600 text-white border-rose-600';
                  } else if (chosen) {
                    style = 'bg-blue-600 text-white border-blue-600';
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(item.id, opt)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted && (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold"
            >
              Submit Quiz &amp; Log Mistakes
            </button>
          )}
        </div>
      )}
    </div>
  );
}
