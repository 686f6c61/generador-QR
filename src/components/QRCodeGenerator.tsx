import React, { useState } from 'react';
import { QRCodeConfig, QRType, Theme } from '../types/qr';
import Header from './Header';
import Footer from './Footer';
import QRTypeSelector from './QRTypeSelector';
import QRForm from './QRForm';
import QRPreview from './QRPreview';
import { cn } from '../utils/cn';

const QRCodeGenerator: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [config, setConfig] = useState<QRCodeConfig>({
    type: 'lanyar',
    value: '',
    size: 256,
    level: 'M',
    foreground: '#000000',
    background: '#ffffff',
    cornerStyle: 'sharp',
    margin: 4
  });

  const handleTypeChange = (type: QRType) => {
    setConfig(prev => ({ ...prev, type, value: '' }));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const containerStyles = cn(
    'border-2 rounded-xl p-6',
    theme === 'dark' ? 'border-white bg-gray-800' : 'border-black bg-white',
    theme === 'dark' ? 'shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  );

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header theme={theme} onThemeToggle={toggleTheme} />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <QRTypeSelector 
            selectedType={config.type} 
            onTypeChange={handleTypeChange}
            theme={theme}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={containerStyles}>
            <QRForm config={config} setConfig={setConfig} theme={theme} />
          </div>

          <div className={containerStyles}>
            <QRPreview config={config} />
          </div>
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default QRCodeGenerator;