"use client";
import { useState, useEffect, useRef } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load latest conversation on mount
  useEffect(() => {
    async function fetchLatest() {
      setError('');
      try {
        const res = await fetch('/api/chat');
        const data = await res.json();
        if (data.conversations && data.conversations.length > 0) {
          const latest = data.conversations[0];
          setConversationId(latest.id);
          setMessages(latest.messages.map((m: any) => ({ role: m.role, text: m.text })));
        } else {
          setConversationId(null);
          setMessages([]);
        }
      } catch (_e) {
        setError('Failed to load conversation.');
      } 
    }
    fetchLatest();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim()) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, message: input }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      setConversationId(data.conversation.id);
      setMessages(data.conversation.messages.map((m: any) => ({ role: m.role, text: m.text })));
      setInput('');
    } catch (_e) {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 rounded-xl p-4 shadow-lg text-slate-700 max-w-xl mx-auto border border-purple-100">
      <div className="mb-4 h-72 overflow-y-auto flex flex-col gap-3 px-1 pb-2 border-b border-purple-200">
        {messages.length === 0 && !loading && <div className="text-slate-400 text-center">Ask anything about health, fitness, or nutrition!</div>}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={
              msg.role === 'user'
                ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white px-4 py-2 rounded-2xl shadow-md max-w-[80%] text-right animate-fade-in'
                : 'bg-gradient-to-r from-emerald-200 to-purple-100 text-emerald-900 px-4 py-2 rounded-2xl shadow max-w-[80%] text-left animate-fade-in'
            }>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-gradient-to-r from-emerald-200 to-purple-100 text-emerald-900 px-4 py-2 rounded-2xl shadow animate-pulse">AI is typing...</div></div>}
        <div ref={messagesEndRef} />
      </div>
      {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 rounded-xl border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 backdrop-blur-sm text-slate-800"
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
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
