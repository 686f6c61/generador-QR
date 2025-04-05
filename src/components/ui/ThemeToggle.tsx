/**
 * Componente ThemeToggle
 * 
 * Botón para alternar entre tema claro y oscuro
 * Muestra un ícono de sol o luna según el tema actual
 */
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors", 
        theme === 'dark' 
          ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" 
          : "bg-gray-100 hover:bg-gray-200 text-gray-800",
        className
      )}
      aria-label={theme === 'dark' ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
