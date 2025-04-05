/**
 * Componente Tooltip
 * 
 * Proporciona información adicional al usuario cuando se coloca el cursor sobre un elemento.
 * Características principales:
 * - Aparece y desaparece suavemente
 * - Posicionamiento automático
 * - Diseño minimalista y elegante
 * - Flecha indicadora de contexto
 * - Soporte para cualquier contenido hijo
 * 
 * El tooltip se muestra encima del elemento al que está asociado y
 * utiliza un sistema de posicionamiento absoluto para mantenerse
 * alineado correctamente.
 */
import React, { useState } from 'react';

interface TooltipProps {
  content: string;           // Texto a mostrar en el tooltip
  children: React.ReactNode; // Elemento sobre el que se mostrará el tooltip
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  // Estado para controlar la visibilidad del tooltip
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Contenedor del elemento activador */}
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>

      {/* Tooltip */}
      {show && (
        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm -top-2 -translate-y-full left-1/2 -translate-x-1/2 min-w-max">
          {content}
          {/* Flecha indicadora */}
          <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
};