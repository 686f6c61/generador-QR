/**
 * Componente QRCodeGenerator
 * 
 * Componente principal para la generación de códigos QR.
 * Integra todos los subcomponentes necesarios para crear QRs personalizados:
 * - Selector de tipo de QR
 * - Formulario de contenido según el tipo
 * - Opciones de estilo
 * - Vista previa en tiempo real
 * 
 * Gestiona el estado global del generador y coordina la comunicación
 * entre los diferentes subcomponentes.
 */
import React, { useState } from 'react';
import { TypeSelector } from './TypeSelector';
import { StyleOptions } from './StyleOptions';
import { QRCodePreview } from './QRCodePreview';
import { ContentForm } from './forms';
import { QRCodeType, QRCodeStyle, QRCodeData } from '../../types/qr';

interface QRCodeGeneratorProps {
  language: any;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ language }) => {
  // Estado para el tipo de QR seleccionado
  const [qrType, setQrType] = useState<QRCodeType>('url');
  
  // Estado para las opciones de estilo del QR
  const [qrStyle, setQrStyle] = useState<QRCodeStyle>({
    backgroundColor: '#FFFFFF',
    foregroundColor: '#000000',
    size: 300,
    margin: 4,
    errorCorrection: 'M',
    cornerStyle: 'square',
    logoSize: 20
  });

  // Estado para los datos del QR según el tipo
  const [qrData, setQrData] = useState<QRCodeData>({
    type: 'url',
    content: {}
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Sección de selección de tipo de QR */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {language.qrTypes ? 'Selecciona el Tipo de QR' : 'Select QR Type'}
        </h2>
        <TypeSelector 
          selectedType={qrType} 
          onTypeChange={(type) => {
            setQrType(type);
            setQrData({ type, content: {} });
          }} 
        />
      </div>

      {/* Layout principal con formulario y vista previa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda: Formulario y opciones */}
        <div className="space-y-8">
          {/* Formulario de contenido específico del tipo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {language.qrOptions ? 'Contenido del QR' : 'QR Content'}
            </h2>
            <ContentForm 
              type={qrType} 
              data={qrData} 
              onChange={setQrData} 
            />
          </div>

          {/* Opciones de estilo del QR */}
          <StyleOptions 
            style={qrStyle} 
            onChange={setQrStyle} 
          />
        </div>

        {/* Columna derecha: Vista previa fija */}
        <div className="lg:sticky lg:top-8">
          <QRCodePreview 
            data={qrData} 
            style={qrStyle} 
          />
        </div>
      </div>
    </div>
  );
};