import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent pt-8 pb-6 px-4 absolute bottom-0 z-20">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end w-full p-2 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 focus-within:bg-[#1f1f1f]/90 transition-all duration-300"
        >
          <textarea
            ref={textareaRef}
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask a question about your data..."
            className="w-full max-h-[120px] bg-transparent text-gray-100 placeholder-gray-500 border-none focus:ring-0 resize-none py-3 px-4 m-0 flex-1 outline-none text-[15px] leading-relaxed font-sans"
            style={{ overflowY: input.length > 50 ? 'auto' : 'hidden' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className={`flex-shrink-0 p-2 ml-2 rounded-xl h-10 w-10 flex items-center justify-center transition-all duration-300 ${
              input.trim() && !disabled 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${input.trim() && !disabled ? 'transform translate-x-0.5 -translate-y-0.5' : ''} transition-transform`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <div className="text-center mt-4 tracking-wide text-xs text-gray-500 font-sans font-medium">
          AI Data Agent can make mistakes. Consider verifying critical data.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
