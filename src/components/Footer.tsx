import React from 'react';
import { Theme } from '../types/qr';
import { Github } from 'lucide-react';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-black text-white'} py-6`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm">
            2024 - Generador de códigos QR
          </span>
          <a
            href="https://github.com/686f6c61/generador-QR"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="GitHub repository"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;