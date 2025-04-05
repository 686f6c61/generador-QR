/**
 * Componente FileUpload
 * 
 * Zona de carga de archivos con funcionalidad de arrastrar y soltar.
 * Características principales:
 * - Soporte para drag & drop
 * - Selector de archivos nativo
 * - Validación de tipo de archivo (solo CSV)
 * - Diseño responsivo y accesible
 * - Soporte multiidioma
 * 
 * El componente proporciona una interfaz intuitiva para que los usuarios
 * puedan subir sus archivos CSV con los datos de contacto.
 */
import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Language } from '../types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;  // Callback para manejar el archivo seleccionado
  language: Language;                   // Objeto con las traducciones
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, language }) => {
  /**
   * Maneja el evento de soltar archivos
   * Previene el comportamiento por defecto y valida el tipo de archivo
   */
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'text/csv') {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  /**
   * Maneja la selección de archivos mediante el input nativo
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-black transition-colors bg-white"
    >
      {/* Input oculto para la selección de archivos */}
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      
      {/* Área visible para arrastrar y soltar */}
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <p className="text-lg text-gray-600 font-medium">{language.dropzoneText}</p>
        <p className="mt-2 text-sm text-gray-500">{language.maxRecords}</p>
      </label>
    </div>
  );
};