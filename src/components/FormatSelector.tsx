/**
 * Componente FormatSelector
 * 
 * Selector de formato para los códigos QR generados.
 * Características principales:
 * - Permite elegir entre PNG, SVG o ambos formatos
 * - Diseño minimalista y elegante
 * - Radio buttons personalizados
 * - Soporte multiidioma
 * - Transiciones suaves
 * 
 * El componente utiliza un diseño de radio buttons estilizados
 * para ofrecer una experiencia de usuario intuitiva y atractiva.
 */
import React from 'react';
import { QRFormat, Language } from '../types';

interface FormatSelectorProps {
  format: QRFormat;                    // Formato actualmente seleccionado
  onChange: (format: QRFormat) => void; // Manejador de cambio de formato
  language: Language;                   // Objeto con las traducciones
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  format,
  onChange,
  language
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
      {/* Encabezado del selector */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {language.preview.formatSelection}
        </h3>
      </div>

      {/* Opciones de formato */}
      <div className="p-4">
        <div className="flex space-x-6">
          {/* Mapeo de las opciones disponibles */}
          {(['png', 'svg', 'both'] as const).map((option) => (
            <label key={option} className="relative flex items-center group">
              {/* Input radio oculto */}
              <input
                type="radio"
                value={option}
                checked={format === option}
                onChange={(e) => onChange(e.target.value as QRFormat)}
                className="peer sr-only"
              />
              {/* Círculo exterior personalizado */}
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-black peer-checked:bg-black group-hover:border-gray-400" />
              {/* Círculo interior (punto blanco) */}
              <div className="absolute w-2 h-2 bg-white rounded-full left-1 top-1 peer-checked:block hidden" />
              {/* Etiqueta del formato */}
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                {language.preview[option]}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};