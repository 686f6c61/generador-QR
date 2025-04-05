/**
 * Componente ActionButton
 * 
 * Botón de acción reutilizable con soporte para iconos y diferentes variantes.
 * Características principales:
 * - Dos variantes de estilo: primaria y secundaria
 * - Integración con iconos de Lucide
 * - Soporte para enlaces y botones
 * - Diseño responsivo y accesible
 * - Transiciones suaves
 * 
 * El componente puede funcionar como botón o enlace dependiendo de las props
 * proporcionadas, manteniendo una apariencia consistente en ambos casos.
 */
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick?: () => void;           // Manejador de clic opcional
  icon: LucideIcon;               // Icono de Lucide a mostrar
  label: string;                  // Texto del botón
  variant?: 'primary' | 'secondary'; // Variante de estilo
  href?: string;                  // URL para modo enlace
  download?: string;              // Nombre de archivo para descarga
  disabled?: boolean;             // Estado deshabilitado
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon: Icon,
  label,
  variant = 'primary',
  href,
  download,
  disabled = false
}) => {
  // Estilos base comunes para botón y enlace
  const baseStyles = "flex items-center justify-center px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Estilos específicos para cada variante
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-800 text-white hover:bg-gray-700"
  };

  // Contenido interno del botón/enlace
  const ButtonContent = () => (
    <>
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </>
  );

  // Renderiza un enlace si se proporciona href
  if (href) {
    return (
      <a 
        href={href} 
        download={download} 
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        <ButtonContent />
      </a>
    );
  }

  // Renderiza un botón en caso contrario
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      <ButtonContent />
    </button>
  );
};