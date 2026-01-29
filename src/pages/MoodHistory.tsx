import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const MoodHistory = () => {
  const [history, setHistory] = useState<any[]>([]);

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setHistory(data);
  }, []);

  // =========================
  // 🌿 Chart Styling Options
  // =========================

  const commonOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#374151',
          font: {
            size: 14,
            weight: '600'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#4B5563' },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        ticks: { color: '#4B5563' },
        grid: { color: 'rgba(0,0,0,0.05)' },
        min: 1,
        max: 10
      }
    }
  };

  // =========================
  // 📈 Stress Line Chart
  // =========================

  const lineData = {
    labels: history.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Stress Level',
        data: history.map(h => h.stress),
        borderColor: '#A78BFA', // soft purple
        backgroundColor: 'rgba(167,139,250,0.2)',
        pointBackgroundColor: '#A78BFA',
        pointBorderColor: '#fff',
        pointRadius: 6,
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    ]
  };

  // =========================
  // 🥧 Emotion Pie Chart
  // =========================

  const moodCount: any = {};

  history.forEach(h => {
    moodCount[h.mood] = (moodCount[h.mood] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(moodCount),
    datasets: [
      {
        data: Object.values(moodCount),
        backgroundColor: [
          '#34D399', // green happy
          '#60A5FA', // blue calm
          '#FBBF24', // yellow stressed
          '#F472B6', // pink sad
          '#A78BFA'  // purple other
        ],
        borderWidth: 0
      }
    ]
  };

  // =========================
  // 🌸 UI
  // =========================

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-8"
    >
      <h1 className="text-3xl font-bold text-dark-text">
        Your Mood History
      </h1>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="bg-white/50 p-6 rounded-xl shadow-soft text-dark-text/70">
          No check-ins yet 🌿  
          Start tracking your mood today!
        </div>
      )}

      {/* Charts */}
      {history.length > 0 && (
        <>
          {/* Stress Trend */}
          <div className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-soft">
            <h2 className="font-semibold mb-4">Stress Trend</h2>
            <Line data={lineData} options={commonOptions} />
          </div>

          {/* Emotion Distribution */}
          <div className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-soft">
            <h2 className="font-semibold mb-4">Emotion Distribution</h2>
            <Pie data={pieData} options={commonOptions} />
          </div>

          {/* Recent Entries */}
          <div className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-soft">
            <h2 className="font-semibold mb-4">Recent Entries</h2>

            <div className="space-y-2">
              {history.slice(-5).reverse().map((h, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white/60 text-sm"
                >
                  <b>{h.mood}</b> • Stress {h.stress}/10
                  {h.note && (
                    <p className="text-dark-text/70 mt-1">{h.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MoodHistory;
