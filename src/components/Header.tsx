import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, QrCode, Github } from 'lucide-react';
import { Theme } from '../types/qr';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-black'} text-white py-6`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QrCode size={32} />
            <h1 className="text-4xl font-bold">
              {t('app.title')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/686f6c61/generador-QR"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-md border-2 border-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;