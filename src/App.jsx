import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import TopNavbar from './components/layout/TopNavbar';
import SidebarDrawer from './components/layout/SidebarDrawer';
import HomeDashboard from './components/dashboard/HomeDashboard';
import RoughSlateModal from './components/modules/RoughSlateModal';
import TeacherCMSModal from './components/modules/TeacherCMSModal';
import MistakeNotebook from './components/modules/MistakeNotebook';
import PaperBuilder from './components/modules/PaperBuilder';
import TextbookVault from './components/modules/TextbookVault';
import LearnAndQuizModule from './components/modules/LearnAndQuizModule';

function AppContent() {
  const { activeTab, darkMode } = useAppState();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'mistakes':
        return <MistakeNotebook />;
      case 'paper-builder':
        return <PaperBuilder />;
      case 'pdfs':
        return <TextbookVault />;
      case 'examples':
        return <LearnAndQuizModule key="examples" initialMode="examples" />;
      case 'tests':
        return <LearnAndQuizModule key="tests" initialMode="tests" />;
      case 'learn':
      case 'subjects':
      case 'progress':
      case 'profile':
      default:
        return <LearnAndQuizModule key="learn" initialMode="learn" />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <TopNavbar />
        <SidebarDrawer />
        <RoughSlateModal />
        <TeacherCMSModal />
        {renderActiveView()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
