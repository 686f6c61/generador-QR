/**
 * Componente EmailForm
 * 
 * Formulario para generar códigos QR que contienen información para enviar emails.
 * Características:
 * - Campos para dirección de email, asunto y cuerpo del mensaje
 * - Validación de formato de email
 * - Tooltips informativos para cada campo
 * - Diseño responsivo y accesible
 * 
 * El QR generado, al ser escaneado, abrirá el cliente de correo predeterminado
 * con los campos prellenados según la información proporcionada.
 */
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface EmailFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

export const EmailForm: React.FC<EmailFormProps> = ({ data, onChange }) => {
  // Manejador para actualizar campos individuales
  const handleInputChange = (field: string, value: string) => {
    onChange({
      type: 'email',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        {/* Campo de dirección de email */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección de Email
            </label>
            <Tooltip content="Dirección de correo electrónico del destinatario">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="email"
            id="address"
            value={data.content.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="ejemplo@correo.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        {/* Campo de asunto */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Asunto
            </label>
            <Tooltip content="Asunto del correo electrónico">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="subject"
            value={data.content.subject || ''}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        {/* Campo de mensaje */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <Tooltip content="Contenido del correo electrónico">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <textarea
            id="body"
            rows={4}
            value={data.content.body || ''}
            onChange={(e) => handleInputChange('body', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};