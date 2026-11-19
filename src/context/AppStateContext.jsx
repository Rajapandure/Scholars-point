import React, { createContext, useContext, useState, useEffect } from 'react';

const AppStateContext = createContext();

const DEFAULT_STUDENTS = [
  {
    id: 'stu_aarav',
    name: 'Aarav',
    classNum: 10,
    board: 'CBSE',
    medium: 'EN',
    session: '2026-27 (NCF-SE / Current)',
    xp: 240,
    streak: 4,
    lessonsCompleted: 1,
    quizzesCompleted: 0,
    dailyTasksDone: 1,
    dailyTasksTarget: 3,
    chaptersMastered: 1,
    currentChapter: {
      subject: 'MATHEMATICS',
      title: 'Ch 1: Real Numbers (Fundamental Theorem of Arithmetic & Irrationality Proofs)',
      summary: 'Prime factorization, HCF × LCM = a × b for two positive integers, and proving √2, √3, √5 are irrational.',
      nextTitle: 'Ch 2: Polynomials (Geometrical Meaning of Zeroes & Relationship with Coefficients)',
    },
    revisionDue: ['Ch 1: Real Numbers'],
    mistakes: [],
  },
  {
    id: 'stu_meera',
    name: 'Meera',
    classNum: 6,
    board: 'MPBSE',
    medium: 'HI',
    session: '2026-27 (NCF-SE / Current)',
    xp: 180,
    streak: 3,
    lessonsCompleted: 2,
    quizzesCompleted: 1,
    dailyTasksDone: 2,
    dailyTasksTarget: 3,
    chaptersMastered: 1,
    currentChapter: {
      subject: 'SCIENCE',
      title: 'Ch 1: Components of Food & Balanced Diet',
      summary: 'Carbohydrates, proteins, fats, vitamins, minerals, and deficiency diseases.',
      nextTitle: 'Ch 2: Sorting Materials into Groups',
    },
    revisionDue: ['Ch 1: Components of Food'],
    mistakes: [],
  },
  {
    id: 'stu_rohan',
    name: 'Rohan',
    classNum: 3,
    board: 'NCERT',
    medium: 'EN',
    session: '2026-27 (NCF-SE / Current)',
    xp: 120,
    streak: 2,
    lessonsCompleted: 3,
    quizzesCompleted: 2,
    dailyTasksDone: 2,
    dailyTasksTarget: 3,
    chaptersMastered: 2,
    currentChapter: {
      subject: 'MATHEMATICS',
      title: 'Ch 1: Where to Look From (Shapes & Symmetry)',
      summary: 'Top view, side view, front view, and mirror halves of everyday objects.',
      nextTitle: 'Ch 2: Fun with Numbers',
    },
    revisionDue: ['Ch 1: Where to Look From'],
    mistakes: [],
  },
];

const STORAGE_KEY = 'scholars_point_v2_state';

export function AppStateProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).students : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  const [activeStudentId, setActiveStudentId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).activeStudentId : 'stu_aarav';
    } catch {
      return 'stu_aarav';
    }
  });

  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSlateOpen, setIsSlateOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isCMSUnlocked, setIsCMSUnlocked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ students, activeStudentId })
      );
    } catch (e) {
      console.error('Failed to persist state:', e);
    }
  }, [students, activeStudentId]);

  const activeStudent =
    students.find((s) => s.id === activeStudentId) || students[0];

  const updateActiveStudent = (updater) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === activeStudent.id
          ? typeof updater === 'function'
            ? updater(s)
            : { ...s, ...updater }
          : s
      )
    );
  };

  const addStudentProfile = ({ name, classNum, board, medium }) => {
    const newStudent = {
      id: `stu_${Date.now()}`,
      name,
      classNum: Number(classNum),
      board,
      medium,
      session: '2026-27 (NCF-SE / Current)',
      xp: 0,
      streak: 1,
      lessonsCompleted: 0,
      quizzesCompleted: 0,
      dailyTasksDone: 0,
      dailyTasksTarget: 3,
      chaptersMastered: 0,
      currentChapter: {
        subject: 'MATHEMATICS',
        title: `Ch 1: Starter Chapter (Class ${classNum})`,
        summary: 'Core concepts, solved examples, and practice exercises.',
        nextTitle: 'Ch 2: Next Chapter',
      },
      revisionDue: [],
      mistakes: [],
    };
    setStudents((prev) => [...prev, newStudent]);
    setActiveStudentId(newStudent.id);
  };

  const addXP = (amount) => {
    updateActiveStudent((s) => ({ ...s, xp: s.xp + amount }));
  };

  const logStudyStep = () => {
    updateActiveStudent((s) => ({
      ...s,
      dailyTasksDone: Math.min(s.dailyTasksTarget, s.dailyTasksDone + 1),
      xp: s.xp + 10,
    }));
  };

  const logMistake = (questionObj) => {
    updateActiveStudent((s) => ({
      ...s,
      mistakes: [
        { id: Date.now(), date: new Date().toLocaleDateString(), ...questionObj },
        ...s.mistakes,
      ],
    }));
  };

  const exportBackupJSON = () => {
    const blob = new Blob(
      [JSON.stringify({ exportedAt: new Date().toISOString(), students }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scholars_point_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isJuniorMode = activeStudent.classNum <= 5;

  return (
    <AppStateContext.Provider
      value={{
        students,
        activeStudent,
        setActiveStudentId,
        addStudentProfile,
        updateActiveStudent,
        activeTab,
        setActiveTab,
        selectedSubject,
        setSelectedSubject,
        isDrawerOpen,
        setIsDrawerOpen,
        isSlateOpen,
        setIsSlateOpen,
        isCMSOpen,
        setIsCMSOpen,
        isCMSUnlocked,
        setIsCMSUnlocked,
        darkMode,
        setDarkMode,
        addXP,
        logStudyStep,
        logMistake,
        exportBackupJSON,
        isJuniorMode,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
