import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChatCompanion = () => {
  const [messages, setMessages] = useState<any[]>([
    { sender: 'bot', text: 'Hi 🌿 I’m your wellness companion. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');

  // Rule-based responses
  const getBotReply = (text: string) => {
    const msg = text.toLowerCase();

    if (msg.includes('stress') || msg.includes('exam'))
      return 'I hear you 💛 Want to try a 2-minute breathing exercise?';

    if (msg.includes('sad') || msg.includes('down'))
      return 'It’s okay to feel this way. Maybe journaling your thoughts could help ✍️';

    if (msg.includes('tired') || msg.includes('sleep'))
      return 'You might need rest 😴 Drink water and take a short break.';

    if (msg.includes('happy') || msg.includes('good'))
      return 'That’s wonderful to hear 😊 Keep doing what makes you smile!';

    if (msg.includes('hello') || msg.includes('hi'))
      return 'Hey there 🌸 How’s your day going?';

    return 'I’m here with you 💚 Try sharing how you feel or what’s on your mind.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    const botMsg = { sender: 'bot', text: getBotReply(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-2xl mx-auto flex flex-col h-[80vh]"
    >
      <h1 className="text-3xl font-bold text-dark-text mb-4 text-center">
        Chat Companion
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-soft">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] p-3 rounded-xl ${
              msg.sender === 'user'
                ? 'ml-auto bg-calm-purple text-white'
                : 'mr-auto bg-white/80 text-dark-text'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type something..."
          className="flex-1 p-3 rounded-lg bg-white/60 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-calm-purple to-calm-pink text-white px-5 rounded-lg hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default ChatCompanion;
