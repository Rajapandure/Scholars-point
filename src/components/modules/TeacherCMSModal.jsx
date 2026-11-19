import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';

export default function TeacherCMSModal() {
  const { isCMSOpen, setIsCMSOpen, isCMSUnlocked, setIsCMSUnlocked } = useAppState();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isCMSOpen) return null;

  const verifyPin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsCMSUnlocked(true);
      setError('');
    } else {
      setError('Invalid Teacher PIN (Default: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base">🔒 Teacher CMS Studio</h3>
          <button
            onClick={() => setIsCMSOpen(false)}
            className="text-slate-400 hover:text-slate-700 font-bold"
          >
            ✕
          </button>
        </div>

        {!isCMSUnlocked ? (
          <form onSubmit={verifyPin} className="space-y-3">
            <p className="text-xs text-slate-500">
              Enter Coaching Administrator PIN to edit chapters, worked examples, or offline JSON packs.
            </p>
            <input
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN (1234)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm tracking-widest font-bold"
            />
            {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Unlock CMS Studio
            </button>
          </form>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold">
              ✓ Teacher Mode Active — All changes save directly to LocalStorage / IndexedDB.
            </div>
            <p className="text-slate-600">
              Use this panel to import curriculum JSON packs for Classes 2–10 (NCERT, CBSE, MPBSE) or publish custom coaching worksheets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
