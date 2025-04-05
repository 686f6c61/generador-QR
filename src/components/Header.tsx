import React from 'react';
import { Languages, Github } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  onLanguageToggle: () => void;
  language: Language;
}

export const Header: React.FC<HeaderProps> = ({ onLanguageToggle, language }) => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{language.header.title}</h1>
            <p className="text-gray-400 mt-2">{language.header.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/686f6c61/generador-QR"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={language.header.githubAria}
            >
              <Github className="h-6 w-6" />
            </a>
            <button
              onClick={onLanguageToggle}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={language.header.languageAria}
            >
              <Languages className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};