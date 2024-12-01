/**
 * Componente WiFiForm
 * 
 * Formulario para generar códigos QR que permiten conectarse a redes WiFi.
 * Características:
 * - Configuración completa de red WiFi
 * - Soporte para diferentes tipos de seguridad (WPA/WPA2, WEP, Sin contraseña)
 * - Opción para redes ocultas
 * - Validación de campos requeridos
 * 
 * El QR generado, al ser escaneado, permitirá:
 * - Conectarse automáticamente a la red WiFi
 * - Ver la configuración antes de conectarse
 * - Guardar la red para futuras conexiones
 */
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface WiFiFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

export const WiFiForm: React.FC<WiFiFormProps> = ({ data, onChange }) => {
  // Manejador para actualizar campos individuales
  const handleInputChange = (field: string, value: string | boolean) => {
    onChange({
      type: 'wifi',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        {/* Campo SSID (nombre de la red) */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="ssid" className="block text-sm font-medium text-gray-700">
              Nombre de Red (SSID)
            </label>
            <Tooltip content="Nombre de la red WiFi">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="ssid"
            value={data.content.ssid || ''}
            onChange={(e) => handleInputChange('ssid', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        {/* Selector de tipo de seguridad */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="encryption" className="block text-sm font-medium text-gray-700">
              Tipo de Seguridad
            </label>
            <Tooltip content="Tipo de encriptación de la red WiFi">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <select
            id="encryption"
            value={data.content.encryption || 'WPA'}
            onChange={(e) => handleInputChange('encryption', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Sin contraseña</option>
          </select>
        </div>

        {/* Campo de contraseña (solo si se requiere) */}
        {data.content.encryption !== 'nopass' && (
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Tooltip content="Contraseña de la red WiFi">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="password"
              id="password"
              value={data.content.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>
        )}

        {/* Opción para red oculta */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hidden"
            checked={data.content.hidden === 'true'}
            onChange={(e) => handleInputChange('hidden', e.target.checked.toString())}
            className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
          />
          <label htmlFor="hidden" className="ml-2 block text-sm text-gray-700">
            Red oculta
          </label>
          <Tooltip content="Marcar si la red WiFi está oculta">
            <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};