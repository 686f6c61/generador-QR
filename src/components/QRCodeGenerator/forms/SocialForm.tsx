/**
 * Componente SocialForm
 * 
 * Formulario para generar códigos QR que enlazan a perfiles de redes sociales.
 * Soporta las principales plataformas:
 * - Twitter
 * - LinkedIn
 * - Facebook
 * - Instagram
 * 
 * El QR generado, al ser escaneado, redirigirá al perfil del usuario
 * en la red social seleccionada.
 */
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface SocialFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

export const SocialForm: React.FC<SocialFormProps> = ({ data, onChange }) => {
  // Manejador para actualizar campos individuales
  const handleInputChange = (field: string, value: string) => {
    onChange({
      type: 'social',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        {/* Selector de plataforma */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
              Plataforma
            </label>
            <Tooltip content="Red social a la que pertenece el perfil">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <select
            id="platform"
            value={data.content.platform || ''}
            onChange={(e) => handleInputChange('platform', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          >
            <option value="">Selecciona una plataforma</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        {/* Campo de nombre de usuario */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de Usuario
            </label>
            <Tooltip content="Tu nombre de usuario en la red social">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          {/* Input con prefijo @ */}
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              @
            </span>
            <input
              type="text"
              id="username"
              value={data.content.username || ''}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>
          {/* Ejemplos específicos según la plataforma seleccionada */}
          <p className="mt-1 text-sm text-gray-500">
            {data.content.platform === 'twitter' && 'Ejemplo: @usuario'}
            {data.content.platform === 'linkedin' && 'Ejemplo: in/usuario'}
            {data.content.platform === 'facebook' && 'Ejemplo: usuario.ejemplo'}
            {data.content.platform === 'instagram' && 'Ejemplo: @usuario.ejemplo'}
          </p>
        </div>
      </div>
    </div>
  );
};