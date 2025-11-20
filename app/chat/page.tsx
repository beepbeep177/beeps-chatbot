"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      id: Date.now().toString() + '-user', 
      role: 'user', 
      content: input 
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ message: input }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn't get a response.";
      const botMessage: Message = { 
        id: Date.now().toString() + '-bot', 
        role: 'bot', 
        content: reply 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now().toString() + '-error', 
          role: 'bot', 
          content: "Sorry bow, parang may mali eh" 
        },
      ]);
    } finally {
      setTyping(false);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

 return (
    <div className="flex flex-col h-screen bg-white" style={{display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'white'}}>
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div></div>
          <h1 className="text-lg font-semibold text-gray-900">Resume Chat</h1>
          <button
            onClick={() => window.open('/beeps_resume.pdf', '_blank')}
            className="bg-pink-400 hover:bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
          >
            📄 View PDF
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-gray-500 text-sm">Ask me about Bea's resume</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-1`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-3xl text-sm ${
                msg.role === 'user'
                  ? 'bg-pink-500 text-white rounded-br-lg'
                  : 'bg-gray-200 text-gray-900 rounded-bl-lg'
              }`}
            >
             <div className="whitespace-pre-line">{msg.content}
            </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start mb-1">
            <div className="bg-gray-200 px-4 py-2 rounded-3xl rounded-bl-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm bg-white"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="type yo message"
              disabled={typing}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || typing}
            className="w-8 h-8 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}