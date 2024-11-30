import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRType, Theme } from '../types/qr';
import { 
  Link, FileText, UserSquare2, Wifi, Mail, Phone, 
  Calendar, MapPin, UtensilsCrossed, Share2, Link2, Database,
  BadgeCheck
} from 'lucide-react';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onTypeChange: (type: QRType) => void;
  theme: Theme;
}

const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onTypeChange, theme }) => {
  const { t } = useTranslation();

  const types: Array<{ type: QRType; icon: React.ReactNode }> = [
    { type: 'lanyar', icon: <BadgeCheck size={20} /> },
    { type: 'url', icon: <Link size={20} /> },
    { type: 'text', icon: <FileText size={20} /> },
    { type: 'vcard', icon: <UserSquare2 size={20} /> },
    { type: 'wifi', icon: <Wifi size={20} /> },
    { type: 'email', icon: <Mail size={20} /> },
    { type: 'phone', icon: <Phone size={20} /> },
    { type: 'calendar', icon: <Calendar size={20} /> },
    { type: 'location', icon: <MapPin size={20} /> },
    { type: 'menu', icon: <UtensilsCrossed size={20} /> },
    { type: 'social', icon: <Share2 size={20} /> },
    { type: 'multilink', icon: <Link2 size={20} /> },
    { type: 'data', icon: <Database size={20} /> },
  ];

  const getButtonStyles = (type: QRType) => {
    const isSelected = selectedType === type;
    const isLanyar = type === 'lanyar';
    
    return `
      flex items-center gap-2 p-4 rounded-lg border-2 transition-all
      ${isSelected
        ? `border-${theme === 'dark' ? 'white' : 'black'} bg-${theme === 'dark' ? 'white' : 'black'} text-${theme === 'dark' ? 'black' : 'white'}`
        : `border-${theme === 'dark' ? 'white' : 'black'} hover:bg-${theme === 'dark' ? 'gray-800' : 'gray-100'}`
      }
      ${isLanyar ? 'col-span-2' : ''}
    `;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {types.map(({ type, icon }) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={getButtonStyles(type)}
        >
          {icon}
          <span className="font-medium">{t(`types.${type}`)}</span>
        </button>
      ))}
    </div>
  );
};

export default QRTypeSelector;