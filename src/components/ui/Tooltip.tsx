import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="inline-flex items-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <span className="ml-1 text-gray-500 cursor-help">?</span>
      </div>
      {isVisible && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-black rounded shadow-lg -top-2 transform -translate-y-full w-48">
          {text}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;