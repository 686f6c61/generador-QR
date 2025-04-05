import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-1">
        {label}
      </label>
      <input
        className={cn(
          'w-full px-3 py-2 border border-gray-900 rounded-md',
          'focus:ring-2 focus:ring-gray-900 focus:border-gray-900',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;