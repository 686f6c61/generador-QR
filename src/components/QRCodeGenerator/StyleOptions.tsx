/**
 * Componente StyleOptions
 * 
 * Panel de configuración para personalizar la apariencia visual del código QR.
 * Características principales:
 * - Selección de colores para fondo y primer plano
 * - Control de dimensiones (tamaño y márgenes)
 * - Nivel de corrección de errores
 * - Estilo de esquinas (cuadradas o redondeadas)
 * - Gestión de logo (subida y tamaño)
 * 
 * El componente está organizado en secciones lógicas para una mejor experiencia de usuario:
 * - Colores y dimensiones
 * - Configuración técnica
 * - Gestión del logo
 */
import React, { useRef } from 'react';
import { QRCodeStyle } from '../../types/qr';
import { HelpCircle, Upload } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface StyleOptionsProps {
  style: QRCodeStyle;                    // Estado actual del estilo
  onChange: (style: QRCodeStyle) => void; // Manejador de cambios
}

export const StyleOptions: React.FC<StyleOptionsProps> = ({ style, onChange }) => {
  // Referencia para el input de archivo oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Maneja la subida del logo
   * Valida el tamaño máximo permitido (500KB)
   */
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        alert('El logo es demasiado grande. Máximo 500KB.');
        return;
      }
      onChange({ ...style, logo: file });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Estilo del QR</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección de colores y dimensiones */}
        <div className="space-y-4">
          {/* Selector de color de fondo */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Color de Fondo
              <Tooltip content="Color del fondo del código QR">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="color"
              value={style.backgroundColor}
              onChange={(e) => onChange({ ...style, backgroundColor: e.target.value })}
              className="w-full h-10 p-1 rounded-md border border-gray-300"
            />
          </div>

          {/* Selector de color del QR */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Color del QR
              <Tooltip content="Color de los módulos del código QR">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="color"
              value={style.foregroundColor}
              onChange={(e) => onChange({ ...style, foregroundColor: e.target.value })}
              className="w-full h-10 p-1 rounded-md border border-gray-300"
            />
          </div>

          {/* Control de tamaño */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Tamaño (px)
              <Tooltip content="Tamaño del código QR en píxeles">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="number"
              min="100"
              max="1000"
              step="50"
              value={style.size}
              onChange={(e) => onChange({ ...style, size: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Sección de configuración técnica */}
        <div className="space-y-4">
          {/* Control de margen */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Margen
              <Tooltip content="Margen alrededor del código QR">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={style.margin}
              onChange={(e) => onChange({ ...style, margin: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Selector de nivel de corrección de errores */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Corrección de Error
              <Tooltip content="Mayor nivel = más resistente a daños">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </label>
            <select
              value={style.errorCorrection}
              onChange={(e) => onChange({ ...style, errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="L">Bajo (7%)</option>
              <option value="M">Medio (15%)</option>
              <option value="Q">Cuartil (25%)</option>
              <option value="H">Alto (30%)</option>
            </select>
          </div>

          {/* Selector de estilo de esquinas */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              Estilo de Esquinas
              <Tooltip content="Forma de las esquinas del código QR">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </label>
            <select
              value={style.cornerStyle}
              onChange={(e) => onChange({ ...style, cornerStyle: e.target.value as 'square' | 'rounded' })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="square">Cuadradas</option>
              <option value="rounded">Redondeadas</option>
            </select>
          </div>
        </div>

        {/* Sección de gestión del logo */}
        <div className="col-span-full">
          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                Logo
                <Tooltip content="Logo para superponer en el centro del QR">
                  <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
                </Tooltip>
              </label>
              <p className="text-xs text-gray-500 mt-1">Máximo 500KB</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Input oculto para la subida de archivos */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {/* Botón para activar la subida de archivos */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Subir Logo
              </button>
              {/* Control de tamaño del logo (solo visible si hay logo) */}
              {style.logo && (
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    Tamaño del Logo (%)
                    <Tooltip content="Tamaño del logo en relación al QR">
                      <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="30"
                    value={style.logoSize}
                    onChange={(e) => onChange({ ...style, logoSize: Number(e.target.value) })}
                    className="w-20 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};