import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
        variant === 'primary' && 'bg-black text-white hover:bg-gray-800',
        variant === 'secondary' && 'bg-gray-200 text-black hover:bg-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;