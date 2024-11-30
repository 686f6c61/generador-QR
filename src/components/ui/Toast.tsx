import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
      <Check size={20} className="text-green-500" />
      {message}
    </div>
  );
}

export default Toast;