/**
 * ThemeContext
 * 
 * Contexto de React para gestionar el tema visual de la aplicación.
 * Proporciona funcionalidad para alternar entre modo claro y oscuro,
 * con la siguiente implementación:
 * 
 * - Inicialización siempre en modo claro (brillo) por defecto
 * - Actualización de clases CSS en tiempo real para aplicar estilos
 * - Persistencia de la preferencia del usuario en localStorage
 * - API limpia a través de un hook personalizado (useTheme)
 * 
 * @module ThemeContext
 */
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

/**
 * Tipo que define los posibles valores de tema
 */
export type Theme = 'light' | 'dark';

/**
 * Interfaz que define la estructura del contexto de tema
 */
interface ThemeContextType {
  /** El tema actual ('light' o 'dark') */
  theme: Theme;
  /** Función para alternar entre temas */
  toggleTheme: () => void;
}

/** Contexto para el tema de la aplicación */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props para el componente ThemeProvider
 */
interface ThemeProviderProps {
  /** Componentes hijos que tendrán acceso al contexto */
  children: ReactNode;
}

/**
 * Proveedor del contexto de tema
 * 
 * Envuelve los componentes de la aplicación y les proporciona acceso al tema
 * @param {ThemeProviderProps} props - Props del componente
 * @returns Componente proveedor de contexto
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  /** 
   * Estado del tema, siempre iniciado en modo claro ('light') por defecto
   * Esta configuración asegura que la aplicación siempre se inicie en modo claro
   */
  const [theme, setTheme] = useState<Theme>('light');

  /**
   * Efecto para aplicar el tema seleccionado al DOM y persistirlo
   * Se ejecuta cada vez que cambia el valor del tema
   */
  useEffect(() => {
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', theme);
    // Actualizar clases en el documento HTML
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  /**
   * Función para alternar entre temas claro y oscuro
   * Invierte el tema actual cuando se llama
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de tema
 * @returns Objeto con el tema actual y la función para cambiarlo
 * @throws Error si se utiliza fuera de un ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};
