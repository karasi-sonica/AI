import React, { useEffect, useRef } from 'react';
import Message from './Message';

const ChatWindow = ({ messages, isTyping }) => {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to the bottom when messages or typing status changes
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 bg-[#202123] scroll-smooth">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center mt-20 opacity-70 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] border border-blue-500/20 animate-slide-up">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M12 2v20"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-100 mb-3 animate-slide-up" style={{animationDelay: "0.1s"}}>AI Data Agent</h2>
            <p className="text-gray-400 max-w-sm text-[15px] animate-slide-up leading-relaxed font-sans" style={{animationDelay: "0.2s"}}>
              Ask me questions about your data. I can generate charts, flowcharts, and insights instantly.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4 animate-slide-up" style={{animationDelay: "0.3s"}}>
              <div className="bg-[#1A1B22]/60 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:bg-[#252630]/80 hover:border-white/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 text-left text-sm text-gray-300 font-medium">
                "Show me a pie chart of our customer segments"
              </div>
              <div className="bg-[#1A1B22]/60 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:bg-[#252630]/80 hover:border-white/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 text-left text-sm text-gray-300 font-medium">
                "Show top 5 products by revenue"
              </div>
              <div className="bg-[#1A1B22]/60 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:bg-[#252630]/80 hover:border-white/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 text-left text-sm text-gray-300 font-medium">
                "Draw a payment process flowchart"
              </div>
              <div className="bg-[#1A1B22]/60 backdrop-blur-sm p-4 rounded-2xl border border-white/5 hover:bg-[#252630]/80 hover:border-white/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 text-left text-sm text-gray-300 font-medium">
                "What is the overall trend in sales?"
              </div>
            </div>
          </div>
        )}

        {Object.values(messages).map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        
        {isTyping && (
          <div className="flex w-full justify-start mb-6 animate-fade-in">
            <div className="bg-[#1A1B22]/80 backdrop-blur-md text-gray-100 rounded-2xl rounded-tl-sm p-4 mr-auto border border-white/5 shadow-lg flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                    <path d="M12 12 2.1 7.1"></path>
                    <path d="m12 12 7.1 7.1"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center space-x-2 my-auto ml-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible target for auto-scrolling */}
        <div ref={endOfMessagesRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatWindow;
