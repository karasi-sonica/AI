import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { sendMessageToAI } from '../services/api';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMsg = { role: 'user', content: text, type: 'text' };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Call backend api
      const response = await sendMessageToAI(text);
      
      // format response based on our api design
      const aiMsg = {
        role: 'assistant',
        content: response.data, // Default to text content
        type: response.type || 'text',
        chartType: response.chartType,
        data: response.data
      };
      
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'assistant', 
          type: 'text',
          content: 'Sorry, I encountered an error communicating with the server. Please try again.' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#111111] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#111111] to-[#111111] text-gray-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-[#111111] border-b border-white/5 flex items-center justify-between px-6 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2v20"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          <h1 className="text-lg font-display font-semibold tracking-wide text-gray-100 group-hover:text-white transition-colors">AI Data Agent</h1>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] px-2 py-0.5 rounded-full ml-2 font-medium tracking-wider">BETA</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <button className="p-2 hover:bg-white/5 rounded-full hover:text-white transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main ref={containerRef} className="flex-1 flex flex-col relative overflow-hidden">
        {/* Chat window with padding for absolute input form */}
        <div className="flex-1 overflow-y-auto pb-[140px] scroll-smooth" id="chat-container">
          <ChatWindow messages={messages} isTyping={isTyping} />
        </div>
        
        {/* Input area anchored to bottom */}
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </main>
    </div>
  );
};

export default Home;
