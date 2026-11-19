import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

const NAV_MODULES = [
  { id: 'home', label: 'Home Dashboard', icon: '🏠' },
  { id: 'learn', label: 'Learn & Question Bank', icon: '📖' },
  { id: 'pdfs', label: 'NCERT & MP Board PDFs', icon: '📚' },
  { id: 'subjects', label: 'Subjects Catalogue', icon: '🧭' },
  { id: 'examples', label: 'Practice & Worked Examples', icon: '✏️' },
  { id: 'tests', label: 'Tests & Timed Assessments', icon: '⚡' },
  { id: 'mistakes', label: 'My Mistake Notebook', icon: '💡', badgeKey: 'mistakes' },
  { id: 'progress', label: 'Mastery, Bookmarks & Revision', icon: '🎯', badgeKey: 'revision' },
  { id: 'slate', label: 'Rough Slate Scratchpad', icon: '🎨', isAction: 'slate' },
  { id: 'profile', label: 'Student Profile & Switcher', icon: '👤' },
  { id: 'paper-builder', label: 'Worksheet & Paper Builder', icon: '📄' },
];

const SUBJECT_JUMPS = [
  { name: 'Mathematics', icon: '📐' },
  { name: 'English', icon: '📘' },
  { name: 'Science', icon: '🔬' },
  { name: 'Social', icon: '🌍' },
  { name: 'Hindi', icon: '🕉️' },
];

export default function SidebarDrawer() {
  const {
    students,
    activeStudent,
    setActiveStudentId,
    addStudentProfile,
    updateActiveStudent,
    activeTab,
    setActiveTab,
    setSelectedSubject,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsSlateOpen,
    setIsCMSOpen,
    exportBackupJSON,
  } = useAppState();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newClass, setNewClass] = useState(6);
  const [newBoard, setNewBoard] = useState('CBSE');

  if (!isDrawerOpen) return null;

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addStudentProfile({
      name: newName.trim(),
      classNum: newClass,
      board: newBoard,
      medium: 'EN',
    });
    setNewName('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
      />

      <aside className="relative w-80 max-w-[88vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              SP
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                {activeStudent.name}&apos;s Portal
              </h2>
              <p className="text-[11px] text-emerald-600 font-medium">
                • Class {activeStudent.classNum} • {activeStudent.board} •{' '}
                {activeStudent.medium === 'EN' ? 'English' : 'हिंदी'} (2026-27)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 text-sm"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Coaching Student
              </span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                + Add / Manage
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {students.map((stu) => {
                const isCurrent = stu.id === activeStudent.id;
                return (
                  <button
                    key={stu.id}
                    onClick={() => setActiveStudentId(stu.id)}
                    className={`px-2.5 py-1 rounded-full font-semibold text-[11px] transition ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {stu.name} (C{stu.classNum}•{stu.board})
                  </button>
                );
              })}
            </div>

            {showAddForm && (
              <form
                onSubmit={handleAddStudent}
                className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2"
              >
                <input
                  type="text"
                  placeholder="Student Name (e.g., Kabir)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
                <div className="flex gap-1.5">
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="flex-1 px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs"
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newBoard}
                    onChange={(e) => setNewBoard(e.target.value)}
                    className="flex-1 px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="NCERT">NCERT</option>
                    <option value="MPBSE">MPBSE</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Create Student Profile
                </button>
              </form>
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Student Navigation (10 Modules)
            </p>
            <div className="space-y-1">
              {NAV_MODULES.map((item) => {
                const isActive = activeTab === item.id;
                const badgeCount =
                  item.badgeKey === 'mistakes'
                    ? activeStudent.mistakes.length
                    : item.badgeKey === 'revision'
                    ? activeStudent.revisionDue.length
                    : null;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isAction === 'slate') {
                        setIsSlateOpen(true);
                      } else {
                        setActiveTab(item.id);
                      }
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {badgeCount !== null && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white ${
                          item.badgeKey === 'mistakes'
                            ? 'bg-rose-500'
                            : 'bg-blue-600'
                        }`}
                      >
                        {badgeCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Teacher Administration (PIN Locked)
            </p>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsCMSOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50/60 transition"
            >
              <span className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <span>🔒</span> Teacher CMS Studio
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                PIN 1234
              </span>
            </button>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Syllabus Board (Distinct Sequence)
            </p>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {['NCERT', 'CBSE', 'MPBSE', 'Both'].map((b) => (
                <button
                  key={b}
                  onClick={() => updateActiveStudent({ board: b })}
                  className={`py-1.5 rounded-lg font-semibold text-[11px] ${
                    activeStudent.board === b
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {b === 'MPBSE' ? 'MP Board' : b}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Medium &amp; Academic Session
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateActiveStudent({ medium: 'EN' })}
                className={`py-2 rounded-xl font-semibold ${
                  activeStudent.medium === 'EN'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                English Medium
              </button>
              <button
                onClick={() => updateActiveStudent({ medium: 'HI' })}
                className={`py-2 rounded-xl font-semibold ${
                  activeStudent.medium === 'HI'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                हिन्दी माध्यम
              </button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 text-[11px]">Academic Session:</span>
              <select
                value={activeStudent.session}
                onChange={(e) => updateActiveStudent({ session: e.target.value })}
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-[11px]"
              >
                <option>2026-27 (NCF-SE / Current)</option>
                <option>2025-26 (Archive)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Select Class (2–10)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[10px]">
                Class {activeStudent.classNum}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                <button
                  key={cls}
                  onClick={() => updateActiveStudent({ classNum: cls })}
                  className={`py-2 rounded-xl font-semibold border transition ${
                    activeStudent.classNum === cls
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quick Subject Jump
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SUBJECT_JUMPS.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setSelectedSubject(sub.name);
                    setActiveTab('learn');
                    setIsDrawerOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 font-semibold text-slate-700 dark:text-slate-200 text-left"
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Student Mastery
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                🔥 {activeStudent.streak} Day Streak
              </span>
            </div>
            <div className="grid grid-cols-3 text-center pt-1">
              <div>
                <p className="text-lg font-extrabold text-amber-400">
                  {activeStudent.xp}
                </p>
                <p className="text-[10px] text-slate-400">Total XP</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-sky-400">
                  {activeStudent.lessonsCompleted}
                </p>
                <p className="text-[10px] text-slate-400">Lessons</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-emerald-400">
                  {activeStudent.quizzesCompleted}
                </p>
                <p className="text-[10px] text-slate-400">Quizzes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={exportBackupJSON}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100"
          >
            💾 Backup JSON
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100"
          >
            👥 Switch Profile
          </button>
        </div>
      </aside>
    </div>
  );
}
