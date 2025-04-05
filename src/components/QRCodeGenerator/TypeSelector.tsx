/**
 * Componente TypeSelector
 * 
 * Selector de tipo de código QR que permite al usuario elegir entre diferentes formatos.
 * Características:
 * - Interfaz visual con iconos para cada tipo
 * - Diseño responsivo en grid
 * - Feedback visual del tipo seleccionado
 * - Transiciones suaves
 * 
 * Tipos de QR soportados:
 * - URL Web
 * - Texto plano
 * - Tarjeta de contacto (vCard)
 * - Email
 * - Teléfono
 * - WiFi
 * - Ubicación
 * - Evento de calendario
 * - SMS
 * - Redes sociales
 */
import React from 'react';
import { QRCodeType } from '../../types/qr';
import { 
  Globe, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Wifi, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Share2 
} from 'lucide-react';

interface TypeSelectorProps {
  selectedType: QRCodeType;         // Tipo de QR actualmente seleccionado
  onTypeChange: (type: QRCodeType) => void;  // Manejador de cambio de tipo
}

// Configuración de tipos de QR disponibles con sus iconos y etiquetas
const types: { type: QRCodeType; icon: React.ElementType; label: string }[] = [
  { type: 'url', icon: Globe, label: 'URL Web' },
  { type: 'text', icon: FileText, label: 'Texto' },
  { type: 'vcard', icon: User, label: 'Contacto' },
  { type: 'email', icon: Mail, label: 'Email' },
  { type: 'phone', icon: Phone, label: 'Teléfono' },
  { type: 'wifi', icon: Wifi, label: 'Wi-Fi' },
  { type: 'geo', icon: MapPin, label: 'Ubicación' },
  { type: 'calendar', icon: Calendar, label: 'Evento' },
  { type: 'sms', icon: MessageSquare, label: 'SMS' },
  { type: 'social', icon: Share2, label: 'Redes Sociales' }
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {types.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`flex flex-col items-center p-4 rounded-lg transition-all ${
            selectedType === type
              ? 'bg-black text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Icon className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};