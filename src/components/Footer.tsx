/**
 * Componente Footer
 * 
 * Pie de página simple y elegante para la aplicación.
 * Características:
 * - Texto centrado
 * - Borde superior sutil
 * - Soporte multiidioma
 * - Espaciado consistente
 */
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;  // Objeto con las traducciones
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="mt-12 py-6 text-center text-gray-600 border-t border-gray-200">
      <p>{language.footer}</p>
    </footer>
  );
};