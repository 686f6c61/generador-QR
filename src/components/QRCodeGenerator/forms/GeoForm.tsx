/**
 * Componente GeoForm
 * 
 * Formulario para generar códigos QR que contienen información de ubicación geográfica.
 * Características:
 * - Entrada de coordenadas (latitud y longitud)
 * - Campo de búsqueda por nombre de lugar
 * - Validación de formato de coordenadas
 * - Tooltips informativos
 * 
 * El QR generado, al ser escaneado, permitirá:
 * - Abrir la ubicación en la aplicación de mapas predeterminada
 * - Ver la ubicación antes de abrirla
 * - Obtener direcciones hasta el punto
 */
import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface GeoFormProps {
  data: QRCodeData;          // Datos actuales del QR
  onChange: (data: QRCodeData) => void;  // Función para actualizar los datos
}

export const GeoForm: React.FC<GeoFormProps> = ({ data, onChange }) => {
  // Manejador para actualizar campos individuales
  const handleInputChange = (field: string, value: string) => {
    onChange({
      type: 'geo',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        {/* Campo de búsqueda de ubicación */}
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              Buscar Ubicación
            </label>
            <Tooltip content="Nombre del lugar o dirección">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="query"
            value={data.content.query || ''}
            onChange={(e) => handleInputChange('query', e.target.value)}
            placeholder="Ej: Plaza Mayor, Madrid"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        {/* Campos de coordenadas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Campo de latitud */}
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                Latitud
              </label>
              <Tooltip content="Coordenada de latitud">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="number"
              id="latitude"
              step="any"
              value={data.content.latitude || ''}
              onChange={(e) => handleInputChange('latitude', e.target.value)}
              placeholder="40.4168"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>

          {/* Campo de longitud */}
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                Longitud
              </label>
              <Tooltip content="Coordenada de longitud">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="number"
              id="longitude"
              step="any"
              value={data.content.longitude || ''}
              onChange={(e) => handleInputChange('longitude', e.target.value)}
              placeholder="-3.7038"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Ejemplo de coordenadas */}
        <p className="text-sm text-gray-500">
          Ejemplo: Latitud 40.4168, Longitud -3.7038 (Madrid)
        </p>
      </div>
    </div>
  );
};