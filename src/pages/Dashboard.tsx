import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface DashboardProps {
  navigate: (page: 'mood-check-in') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  // 🌸 Personalization
  const userName = "Shalini"; // change anytime

  // 🌿 Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // 🌸 Daily quotes
  const quotes = [
    "The greatest wealth is health.",
    "The mind is everything. What you think you become.",
    "Self-care is how you take your power back.",
    "Your calm mind is the ultimate weapon against your challenges.",
    "Small daily habits create big changes."
  ];

  const dailyQuote = quotes[new Date().getDate() % quotes.length];

  // 🌿 Streak
  const streak = parseInt(localStorage.getItem('streak') || '0');

  // 🌿 Calculate average stress from history
  const avgStress = useMemo(() => {
    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    if (history.length === 0) return 0;

    const last7 = history.slice(-7);
    const avg =
      last7.reduce((sum: number, item: any) => sum + item.stress, 0) /
      last7.length;

    return avg.toFixed(1);
  }, []);

  // 🌿 Plant growth based on streak
  const getPlant = () => {
    if (streak >= 10) return "🌳";
    if (streak >= 6) return "🪴";
    if (streak >= 3) return "🌿";
    return "🌱";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-dark-text">
          {getGreeting()}, {userName}! 👋
        </h1>

        <p className="text-dark-text/70 mt-1">
          {dailyQuote}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Streak */}
        <div className="p-6 bg-white/50 backdrop-blur-md rounded-xl shadow-soft">
          <h3 className="font-semibold text-dark-text">Daily Streak</h3>
          <p className="text-4xl font-bold text-calm-purple">
            {streak} day{streak !== 1 && 's'}
          </p>
        </div>

        {/* Avg Stress */}
        <div className="p-6 bg-white/50 backdrop-blur-md rounded-xl shadow-soft">
          <h3 className="font-semibold text-dark-text">Avg. Stress (7d)</h3>
          <p className="text-4xl font-bold text-calm-yellow">
            {avgStress}/10
          </p>
        </div>

        {/* Wellness Plant */}
        <motion.div
          className="p-6 bg-white/50 backdrop-blur-md rounded-xl shadow-soft flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <div className="text-center">
            <h3 className="font-semibold text-dark-text">Wellness Plant</h3>
            <p className="text-5xl">{getPlant()}</p>
          </div>
        </motion.div>
      </div>

      {/* Check-in Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('mood-check-in')}
          className="bg-gradient-to-r from-calm-purple to-calm-pink text-white font-bold py-4 px-8 rounded-full shadow-soft-lg transform hover:scale-105 transition-all duration-300"
        >
          Start Your Daily Check-in
        </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
