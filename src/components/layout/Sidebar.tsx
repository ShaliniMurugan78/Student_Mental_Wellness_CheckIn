import React from 'react';
import { Home, Smile, BarChart2, Leaf, Wind, Book, MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Page =
  | 'dashboard'
  | 'mood-check-in'
  | 'mood-history'
  | 'wellness-garden'
  | 'tips-breathing'
  | 'journal'
  | 'chat-companion';

interface SidebarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'mood-check-in', icon: Smile, label: 'Check-In' },
  { id: 'mood-history', icon: BarChart2, label: 'Mood History' },
  { id: 'wellness-garden', icon: Leaf, label: 'Wellness Garden' },
  { id: 'tips-breathing', icon: Wind, label: 'Tips & Breathing' },
  { id: 'journal', icon: Book, label: 'Journal' },
  { id: 'chat-companion', icon: MessageSquare, label: 'Chat Companion' },
];

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  navigate,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const baseItemClass =
    "flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105";
  const activeItemClass =
    "bg-white/80 shadow-soft text-calm-purple font-semibold";
  const inactiveItemClass =
    "text-dark-text/70 hover:bg-white/50 hover:text-dark-text";

  return (
    <>
      <aside
        className={cn(
          "absolute md:relative z-20 md:z-auto w-64 h-full p-4 bg-white/30 backdrop-blur-lg transition-transform duration-300 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-dark-text">SereneMind</h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-white/50"
          >
            <X size={20} />
          </button>
        </div>

        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  onClick={() => navigate(item.id as Page)}
                  className={cn(
                    baseItemClass,
                    currentPage === item.id ? activeItemClass : inactiveItemClass
                  )}
                >
                  <item.icon className="mr-3" size={20} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
