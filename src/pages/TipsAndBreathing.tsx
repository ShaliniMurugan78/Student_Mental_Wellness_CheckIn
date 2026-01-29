import React from 'react';
import { motion } from 'framer-motion';

const TipsAndBreathing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white/50 backdrop-blur-md rounded-xl shadow-soft"
    >
      <h1 className="text-3xl font-bold text-dark-text mb-6">
        Tips & Breathing
      </h1>

      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-4">
          <div className="absolute inset-0 bg-calm-blue rounded-full animate-breathe"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-semibold">Breathe</p>
          </div>
        </div>

        <p className="text-dark-text/80">
          Follow the circle. Inhale as it expands, exhale as it contracts.
        </p>
      </div>
    </motion.div>
  );
};

export default TipsAndBreathing;
