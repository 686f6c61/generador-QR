/**
 * Componente Navigation
 * 
 * Barra de navegación principal para alternar entre las secciones de la aplicación.
 * Características:
 * - Diseño responsivo
 * - Indicador visual de la pestaña activa
 * - Iconos descriptivos para cada sección
 * - Transiciones suaves
 * 
 * Secciones disponibles:
 * - QR Lanyards: Para generación masiva de QRs para credenciales
 * - Otros QR: Para generación individual de QRs de diferentes tipos
 */
import React from 'react';
import { QrCode, Users } from 'lucide-react';

interface NavigationProps {
  activeTab: 'lanyards' | 'other';  // Pestaña actualmente seleccionada
  onTabChange: (tab: 'lanyards' | 'other') => void;  // Manejador de cambio de pestaña
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {/* Botón para QR Lanyards */}
            <button
              onClick={() => onTabChange('lanyards')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'lanyards'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>QR Lanyards</span>
              </div>
            </button>

            {/* Botón para Otros QR */}
            <button
              onClick={() => onTabChange('other')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'other'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Otros QR</span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};