import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Journal = () => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('😊');
  const [entries, setEntries] = useState<any[]>([]);

  const moods = ['😊', '😐', '😔', '😣', '😴'];

  // Load saved entries
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setEntries(saved);
  }, []);

  // Save entry
  const handleSave = () => {
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      text,
      mood,
      date: new Date().toLocaleDateString()
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));

    setText('');
  };

  // Delete entry
  const handleDelete = (id: number) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-3xl mx-auto space-y-8"
    >
      <h1 className="text-3xl font-bold text-dark-text text-center">
        Your Private Journal
      </h1>

      {/* Write Section */}
      <div className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-soft space-y-4">

        {/* Mood Picker */}
        <div className="flex gap-3 justify-center text-2xl">
          {moods.map(m => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`transition transform hover:scale-125 ${
                mood === m ? 'scale-125' : ''
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={4}
          className="w-full p-3 rounded-lg bg-white/60 focus:outline-none"
        />

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-calm-purple to-calm-pink text-white font-semibold py-2 rounded-lg hover:scale-105 transition"
        >
          Save Entry
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-center text-dark-text/60">
            No journal entries yet 🌿 Start writing today
          </p>
        )}

        {entries.map(entry => (
          <div
            key={entry.id}
            className="bg-white/50 backdrop-blur-md p-4 rounded-xl shadow-soft flex justify-between items-start"
          >
            <div>
              <div className="text-lg">
                {entry.mood} <span className="text-sm text-dark-text/50">{entry.date}</span>
              </div>
              <p className="text-dark-text/80">{entry.text}</p>
            </div>

            <button
              onClick={() => handleDelete(entry.id)}
              className="text-sm text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Journal;
