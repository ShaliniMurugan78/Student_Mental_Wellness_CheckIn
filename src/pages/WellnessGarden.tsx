import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WellnessGarden = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('streak') || '0');
    setStreak(saved);
  }, []);

  // 🌿 Choose plant based on streak
  const getPlant = () => {
    if (streak >= 10) return '🌳';
    if (streak >= 6) return '🪴';
    if (streak >= 3) return '🌿';
    return '🌱';
  };

  const getMessage = () => {
    if (streak >= 10) return 'Your garden is thriving beautifully!';
    if (streak >= 6) return 'Great consistency! Your plant is growing strong!';
    if (streak >= 3) return 'Nice start! Keep nurturing your mind 🌿';
    return 'Start checking in daily to grow your garden 🌱';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 text-center space-y-10"
    >
      <h1 className="text-3xl font-bold text-dark-text">
        Your Wellness Garden
      </h1>

      {/* Plant */}
      <motion.div
        className="text-9xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {getPlant()}
      </motion.div>

      {/* Streak */}
      <div className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-soft inline-block">
        <p className="text-lg font-semibold text-dark-text">
          🌞 Streak: {streak} day{streak !== 1 && 's'}
        </p>
      </div>

      {/* Message */}
      <p className="text-dark-text/70 text-lg">
        {getMessage()}
      </p>

      {/* Floating leaves animation */}
      <div className="relative h-24 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: -40, opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              delay: i * 0.8
            }}
            style={{ left: `${10 + i * 12}%` }}
          >
            🍃
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessGarden;
