/**
 * Componente Instructions
 * 
 * Muestra las instrucciones paso a paso para usar el generador de QR.
 * Características:
 * - Diseño moderno con tarjetas para cada paso
 * - Iconos indicativos
 * - Efectos de hover
 * - Soporte multiidioma
 * 
 * Las instrucciones se muestran en un grid responsivo que se adapta
 * a diferentes tamaños de pantalla.
 */
import React from 'react';
import { Language } from '../types';
import { CheckCircle } from 'lucide-react';

interface InstructionsProps {
  language: Language;  // Objeto con las traducciones
}

export const Instructions: React.FC<InstructionsProps> = ({ language }) => {
  return (
    <div className="bg-black rounded-lg shadow-xl p-8 text-white">
      {/* Título de la sección */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        {language.instructions.length > 0 ? 'Instrucciones' : 'Instructions'}
      </h2>

      {/* Grid de instrucciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {language.instructions.map((instruction, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-start space-x-4">
              {/* Icono indicador */}
              <div className="flex-shrink-0">
                <div className="bg-white rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-black" />
                </div>
              </div>
              {/* Contenido de la instrucción */}
              <div>
                <span className="text-xl font-semibold mb-2 block">
                  {index + 1}
                </span>
                <p className="text-white">{instruction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};