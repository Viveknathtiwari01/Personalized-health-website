"use client";
import { useState } from 'react';
import { askGeminiChat } from '../lib/ai';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const aiText = await askGeminiChat(input);
      setMessages(msgs => [...msgs, { role: 'ai', text: aiText }]);
    } catch (_e) {
      setMessages(msgs => [...msgs, { role: 'ai', text: 'Sorry, there was an error.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 shadow text-slate-700 dark:text-slate-100 max-w-xl mx-auto">
      <div className="mb-4 h-64 overflow-y-auto flex flex-col gap-2 border-b border-slate-300 dark:border-slate-700 pb-4">
        {messages.length === 0 && <div className="text-slate-400">Ask anything about health, fitness, or nutrition!</div>}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100 px-3 py-1 rounded-lg inline-block' : 'bg-emerald-200 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100 px-3 py-1 rounded-lg inline-block'}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-emerald-500">AI is typing...</div>}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-900"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
