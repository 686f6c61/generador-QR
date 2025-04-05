/**
 * Componente PhoneForm
 * 
 * Formulario para generar códigos QR que contienen números de teléfono.
 * Características:
 * - Entrada de número de teléfono con formato internacional
 * - Validación básica del formato
 * - Ejemplo de formato correcto
 * - Tooltip informativo
 * 
 * El QR generado, al ser escaneado, permitirá:
 * - Llamar directamente al número
 * - Guardar el número en contactos
 * - Ver el número antes de realizar la acción
 */
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface PhoneFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

export const PhoneForm: React.FC<PhoneFormProps> = ({ data, onChange }) => {
  return (
    <div className="max-w-2xl">
      <div>
        {/* Campo de número de teléfono */}
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
          onChange={(e) => onChange({
            type: 'phone',
            content: { phone: e.target.value }
          })}
          placeholder="+34 600000000"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          required
        />
        {/* Ejemplo de formato correcto */}
        <p className="mt-1 text-sm text-gray-500">
          Ejemplo: +34 600000000
        </p>
      </div>
    </div>
  );
};