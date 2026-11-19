import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const SAMPLE_BANK = [
  { id: 1, marks: 1, type: 'MCQ', q: 'The HCF of 96 and 404 is: (A) 4 (B) 9696 (C) 12 (D) 2' },
  { id: 2, marks: 2, type: 'Short', q: 'Explain why 7 × 11 × 13 + 13 is a composite number.' },
  { id: 3, marks: 3, type: 'Proof', q: 'Prove that √5 is an irrational number.' },
  { id: 4, marks: 4, type: 'Case Study', q: 'Find the zeroes of x² − 2x − 8 and verify the relationship between zeroes and coefficients.' },
];

export default function PaperBuilder() {
  const { activeStudent, selectedSubject } = useAppState();
  const [selectedIds, setSelectedIds] = useState([1, 2, 3]);
  const [instituteName, setInstituteName] = useState("Scholar's Point Coaching Institute, Tirodi");

  const toggleQ = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const chosenQuestions = SAMPLE_BANK.filter((q) => selectedIds.includes(q.id));
  const totalMarks = chosenQuestions.reduce((acc, item) => acc + item.marks, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-extrabold">📄 Worksheet &amp; Exam Paper Builder</h2>
        <input
          type="text"
          value={instituteName}
          onChange={(e) => setInstituteName(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
        />
        <div className="space-y-2">
          {SAMPLE_BANK.map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleQ(item.id)}
                className="mt-1"
              />
              <div className="text-xs">
                <span className="font-bold text-blue-600">[{item.marks} Mark • {item.type}] </span>
                <span>{item.q}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white text-slate-900 rounded-3xl p-6 border border-slate-300 shadow-sm space-y-4">
        <div className="text-center border-b border-slate-300 pb-3">
          <h3 className="font-extrabold text-base uppercase">{instituteName}</h3>
          <p className="text-xs font-semibold text-slate-600">
            Class {activeStudent.classNum} ({activeStudent.board}) • Subject: {selectedSubject} • Max Marks: {totalMarks}
          </p>
        </div>
        <ol className="list-decimal pl-5 space-y-3 text-xs">
          {chosenQuestions.map((q) => (
            <li key={q.id} className="leading-relaxed">
              <div className="flex justify-between gap-2">
                <span>{q.q}</span>
                <span className="font-bold shrink-0">[{q.marks}M]</span>
              </div>
            </li>
          ))}
        </ol>
        <button
          onClick={() => window.print()}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          🖨️ Print / Save Test Paper as PDF
        </button>
      </div>
    </div>
  );
}
