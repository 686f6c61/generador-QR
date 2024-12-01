// Importaciones necesarias
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

// Definición de las props del componente
interface TextFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

/**
 * Componente TextForm
 * 
 * Formulario para generar códigos QR de texto plano.
 * Permite al usuario introducir cualquier texto que será codificado en el QR.
 * Incluye un área de texto multilínea y límite de caracteres sugerido.
 */
export const TextForm: React.FC<TextFormProps> = ({ data, onChange }) => {
  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        <div>
          {/* Campo de entrada para el texto */}
          <div className="flex items-center mb-1">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Texto
            </label>
            {/* Tooltip con información de ayuda */}
            <Tooltip content="Cualquier texto que desees compartir">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <textarea
            id="text"
            rows={4}
            value={data.content.text || ''}
            onChange={(e) => onChange({
              type: 'text',
              content: { text: e.target.value }
            })}
            placeholder="Escribe tu texto aquí..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
          {/* Indicador de límite de caracteres */}
          <p className="mt-1 text-sm text-gray-500">
            Máximo 300 caracteres
          </p>
        </div>
      </div>
    </div>
  );
};