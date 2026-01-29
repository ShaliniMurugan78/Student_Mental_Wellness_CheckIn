import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MoodCheckInProps {
  navigate: (page: 'dashboard') => void;
}

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😥', label: 'Anxious' },
];

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ navigate }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [stressLevel, setStressLevel] = useState(5);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    const checkInData = {
      mood: selectedMood,
      stress: stressLevel,
      note,
      timestamp: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    history.push(checkInData);
    localStorage.setItem('moodHistory', JSON.stringify(history));

    const lastCheckin = localStorage.getItem('lastCheckinDate');
    const today = new Date().toDateString();

    if (lastCheckin !== today) {
      let streak = parseInt(localStorage.getItem('streak') || '0');
      streak++;
      localStorage.setItem('streak', streak.toString());
      localStorage.setItem('lastCheckinDate', today);
    }

    alert('Check-in saved!');
    navigate('dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 bg-white/50 backdrop-blur-md rounded-xl shadow-soft space-y-8"
    >
      <h1 className="text-3xl font-bold text-dark-text text-center">
        How are you feeling?
      </h1>

      <div>
        <h2 className="font-semibold text-dark-text mb-4 text-center">
          Select your mood
        </h2>

        <div className="flex justify-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`p-4 rounded-full text-4xl transition-all duration-300 transform hover:scale-110 ${
                selectedMood === mood.label
                  ? 'bg-calm-purple/50 ring-2 ring-calm-purple'
                  : 'bg-white/50'
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-dark-text mb-4 text-center">
          Stress Level: {stressLevel}
        </h2>

        <input
          type="range"
          min="1"
          max="10"
          value={stressLevel}
          onChange={(e) => setStressLevel(Number(e.target.value))}
          className="w-full h-2 bg-white/50 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <h2 className="font-semibold text-dark-text mb-2 text-center">
          Add a note (optional)
        </h2>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full p-3 bg-white/50 rounded-lg border-2 border-transparent focus:border-calm-purple transition"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="bg-gradient-to-r from-calm-purple to-calm-pink text-white font-bold py-3 px-8 rounded-full shadow-soft-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Check-in
        </button>
      </div>
    </motion.div>
  );
};

export default MoodCheckIn;
