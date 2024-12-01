// Importaciones necesarias
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

// Definición de las props del componente
interface URLFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

/**
 * Componente URLForm
 * 
 * Formulario para generar códigos QR de URLs.
 * Permite al usuario introducir una dirección web que será codificada en el QR.
 * Incluye validación básica de URL y ayuda contextual.
 */
export const URLForm: React.FC<URLFormProps> = ({ data, onChange }) => {
  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        <div>
          {/* Campo de entrada para la URL */}
          <div className="flex items-center mb-1">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            {/* Tooltip con información de ayuda */}
            <Tooltip content="Dirección web completa incluyendo https://">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="url"
            id="url"
            value={data.content.url || ''}
            onChange={(e) => onChange({
              type: 'url',
              content: { url: e.target.value }
            })}
            placeholder="https://www.ejemplo.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
          {/* Texto de ejemplo para guiar al usuario */}
          <p className="mt-1 text-sm text-gray-500">
            Ejemplo: https://www.ejemplo.com
          </p>
        </div>
      </div>
    </div>
  );
};