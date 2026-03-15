import React from 'react';
import ReactMarkdown from 'react-markdown';
import ChartRenderer from './ChartRenderer';
import FlowchartRenderer from './FlowchartRenderer';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-message-pop`}>
      <div 
        className={`max-w-[85%] md:max-w-[80%] flex gap-4 p-5 rounded-3xl ${
          isUser 
            ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(59,130,246,0.3)] ml-auto' 
            : 'bg-[#1A1B22]/80 backdrop-blur-md text-gray-100 rounded-tl-sm mr-auto border border-white/5 shadow-lg'
        }`}
      >
        {!isUser && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                <path d="M12 12 2.1 7.1"></path>
                <path d="m12 12 7.1 7.1"></path>
              </svg>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed font-sans text-[15px]">{message.text || message.content}</p>
          ) : (
            <div className="prose prose-invert max-w-none space-y-4 font-sans text-[15px] leading-relaxed">
              {message.type === 'text' && (
                <ReactMarkdown className="leading-relaxed text-[15px] text-gray-200">
                  {message.data || message.content || ''}
                </ReactMarkdown>
              )}
              
              {message.type === 'chart' && (
                <ChartRenderer chartType={message.chartType} data={message.data} />
              )}
              
              {message.type === 'flowchart' && (
                <FlowchartRenderer data={message.data} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
