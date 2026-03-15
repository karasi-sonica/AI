import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif'
});

const FlowchartRenderer = ({ data }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(null);
  const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!data) return;
      
      try {
        setError(null);
        // Validate diagram text
        await mermaid.parse(data);
        const { svg } = await mermaid.render(id, data);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error('Mermaid rendering failed:', err);
        if (isMounted) {
          setError('Failed to render flowchart. The data format may be invalid.');
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [data, id]);

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm mt-3">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full mt-4 mb-4 bg-white/5 rounded-xl p-4 shadow-sm border border-white/10 overflow-x-auto">
      {svgContent ? (
        <div 
          ref={containerRef}
          className="flex justify-center items-center mermaid-diagram" 
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
      ) : (
        <div className="animate-pulse flex space-x-4">
          <div className="h-32 bg-white/10 rounded w-full"></div>
        </div>
      )}
    </div>
  );
};

export default FlowchartRenderer;
