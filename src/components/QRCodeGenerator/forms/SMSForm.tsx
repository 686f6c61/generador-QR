/**
 * Componente SMSForm
 * 
 * Formulario para generar códigos QR que contienen información para enviar SMS.
 * Características:
 * - Entrada de número de teléfono con formato internacional
 * - Campo para el mensaje predefinido
 * - Validación de formato de teléfono
 * - Tooltips informativos
 * - Límite de caracteres para SMS
 * 
 * El QR generado, al ser escaneado, permitirá:
 * - Abrir la aplicación de mensajes del dispositivo
 * - Precargar el número y mensaje
 * - Enviar el SMS directamente
 */
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface SMSFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

export const SMSForm: React.FC<SMSFormProps> = ({ data, onChange }) => {
  // Manejador para actualizar campos individuales
  const handleInputChange = (field: string, value: string) => {
    onChange({
      type: 'sms',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        {/* Campo para el número de teléfono */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <Tooltip content="Número de teléfono con código de país">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="tel"
            id="phone"
            value={data.content.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+34 600000000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
          {/* Ejemplo de formato correcto */}
          <p className="mt-1 text-sm text-gray-500">
            Ejemplo: +34 600000000
          </p>
        </div>

        {/* Campo para el mensaje */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <Tooltip content="Texto del mensaje SMS">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <textarea
            id="message"
            rows={4}
            value={data.content.message || ''}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
          {/* Indicador de límite de caracteres */}
          <p className="mt-1 text-sm text-gray-500">
            Máximo 160 caracteres
          </p>
        </div>
      </div>
    </div>
  );
};