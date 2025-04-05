/**
 * Componente LanyardExamples
 * 
 * Muestra ejemplos visuales de lanyards QR con estilo similar a Google.
 * Características:
 * - Ejemplos visuales de lanyards con QR
 * - Diseño responsive en grid
 * - Estilo limpio y profesional
 * - Soporte para tema claro/oscuro
 */
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

interface LanyardExamplesProps {
  className?: string;
}

export const LanyardExamples: React.FC<LanyardExamplesProps> = ({ className }) => {
  const { theme } = useTheme();

  const lanyards = [
    {
      name: 'Maria García',
      title: 'Software Engineer',
      company: 'Google',
      image: '/examples/google1.png'
    },
    {
      name: 'John Smith',
      title: 'Product Manager',
      company: 'Google Cloud',
      image: '/examples/google2.png'
    },
    {
      name: 'Sarah Johnson',
      title: 'UX Designer',
      company: 'Google',
      image: '/examples/google3.png'
    },
    {
      name: 'David Wong',
      title: 'Developer Advocate',
      company: 'Google',
      image: '/examples/google4.png'
    },
    {
      name: 'Anna Müller',
      title: 'Marketing Director',
      company: 'Google Ads',
      image: '/examples/google5.png'
    }
  ];

  // Simular tarjetas como si fueran ejemplos reales
  return (
    <div className={cn('mt-12', className)}>
      <div className="text-center mb-6">
        <h3 className={cn(
          "text-xl font-semibold",
          theme === 'dark' ? "text-white" : "text-gray-900"
        )}>
          Ejemplos de Lanyards
        </h3>
        <p className={cn(
          "mt-2 text-sm",
          theme === 'dark' ? "text-gray-400" : "text-gray-500"
        )}>
          Basados en el estilo corporativo de Google
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {lanyards.map((lanyard, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg overflow-hidden shadow transition-all duration-200 group hover:shadow-md",
              theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white"
            )}
          >
            {/* Simulación del header de tarjeta Google */}
            <div className={cn(
              "h-2",
              index % 2 === 0 ? "bg-gray-400" : "bg-gray-500"
            )}></div>
            
            {/* QR Code Placeholder */}
            <div className="px-4 pt-4 pb-2 flex justify-center">
              <div className={cn(
                "w-32 h-32 relative rounded-md flex items-center justify-center border",
                theme === 'dark' ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
              )}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className={cn("w-24 h-24", theme === 'dark' ? "text-gray-700" : "text-gray-300")} viewBox="0 0 100 100">
                    <rect x="10" y="10" width="20" height="20" />
                    <rect x="40" y="10" width="20" height="20" />
                    <rect x="70" y="10" width="20" height="20" />
                    <rect x="10" y="40" width="20" height="20" />
                    <rect x="70" y="40" width="20" height="20" />
                    <rect x="10" y="70" width="20" height="20" />
                    <rect x="40" y="70" width="20" height="20" />
                    <rect x="70" y="70" width="20" height="20" />
                  </svg>
                  {/* Google logo placeholder en el centro */}
                  <div className={cn(
                    "absolute w-10 h-10 rounded-full flex items-center justify-center",
                    theme === 'dark' ? "bg-gray-800" : "bg-white"
                  )}>
                    <span className="flex text-xs font-bold">
                      <span className="text-blue-500">G</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">o</span>
                      <span className="text-blue-500">g</span>
                      <span className="text-green-500">l</span>
                      <span className="text-red-500">e</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Información */}
            <div className="p-4 text-center">
              <h4 className={cn(
                "font-medium",
                theme === 'dark' ? "text-white" : "text-gray-900"
              )}>
                {lanyard.name}
              </h4>
              <p className={cn(
                "text-sm",
                theme === 'dark' ? "text-gray-400" : "text-gray-600"
              )}>
                {lanyard.title}
              </p>
              <p className={cn(
                "text-xs font-medium mt-1",
                theme === 'dark' ? "text-blue-400" : "text-blue-600"
              )}>
                {lanyard.company}
              </p>
            </div>
            
            {/* Footer con detalles */}
            <div className={cn(
              "px-4 py-2 text-xs border-t",
              theme === 'dark' ? "border-gray-700 text-gray-500" : "border-gray-100 text-gray-400"
            )}>
              io.github.google/events/2025
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
