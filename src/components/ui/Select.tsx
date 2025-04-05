import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string; }[];
}

const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-1">
        {label}
      </label>
      <select
        className={cn(
          'w-full px-3 py-2 border border-gray-900 rounded-md',
          'focus:ring-2 focus:ring-gray-900 focus:border-gray-900',
          className
        )}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;