import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/pages/Dashboard';
import MoodCheckIn from '@/pages/MoodCheckIn';
import MoodHistory from '@/pages/MoodHistory';
import WellnessGarden from '@/pages/WellnessGarden';
import TipsAndBreathing from '@/pages/TipsAndBreathing';
import Journal from '@/pages/Journal';
import ChatCompanion from '@/pages/ChatCompanion';
import { Menu, X } from 'lucide-react';

type Page =
  | 'dashboard'
  | 'mood-check-in'
  | 'mood-history'
  | 'wellness-garden'
  | 'tips-breathing'
  | 'journal'
  | 'chat-companion';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1) as Page;
      if (path) setCurrentPage(path);
    };

    window.addEventListener('popstate', handlePopState);

    const path = window.location.pathname.substring(1) as Page;
    if (path) setCurrentPage(path);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page}`);
    if (isSidebarOpen) setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'mood-check-in':
        return <MoodCheckIn navigate={navigate} />;
      case 'mood-history':
        return <MoodHistory />;
      case 'wellness-garden':
        return <WellnessGarden />;
      case 'tips-breathing':
        return <TipsAndBreathing />;
      case 'journal':
        return <Journal />;
      case 'chat-companion':
        return <ChatCompanion />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-calm-blue via-calm-green to-calm-yellow">
      <Sidebar
        currentPage={currentPage}
        navigate={navigate}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 mb-4 rounded-md text-dark-text bg-white/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-soft"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {renderPage()}
      </main>
    </div>
  );
}

export default App;
