/**
 * Componente QRCodePreview
 * 
 * Componente encargado de generar y mostrar la previsualización del código QR.
 * Características principales:
 * - Genera códigos QR en formatos PNG y SVG
 * - Permite personalizar colores, tamaño y margen
 * - Soporta la superposición de logos
 * - Ofrece botones de descarga para ambos formatos
 * 
 * El componente maneja diferentes tipos de contenido (URL, texto, vCard, etc.)
 * y genera el formato adecuado para cada tipo.
 */
import React, { useEffect, useState } from 'react';
import { QRCodeData, QRCodeStyle } from '../../types/qr';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

interface QRCodePreviewProps {
  data: QRCodeData;      // Datos para generar el QR
  style: QRCodeStyle;    // Opciones de estilo del QR
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({ data, style }) => {
  // Estados para almacenar las URLs de los QR generados
  const [pngUrl, setPngUrl] = useState<string>('');
  const [svgContent, setSvgContent] = useState<string>('');

  /**
   * Convierte la imagen del QR a blanco y negro puro
   * Esto mejora la legibilidad del código
   */
  const convertQRToBlackAndWhite = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const color = avg < 128 ? 0 : 255;
      data[i] = data[i + 1] = data[i + 2] = color;
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  /**
   * Superpone un logo en el centro del código QR
   * Mantiene los colores originales del logo
   */
  const overlayLogo = async (qrDataUrl: string, logoFile: File, logoSize: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const qrImage = new Image();
      qrImage.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        canvas.width = qrImage.width;
        canvas.height = qrImage.height;

        // Dibuja el código QR
        ctx.fillStyle = style.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(qrImage, 0, 0);

        // Convierte el QR a blanco y negro
        convertQRToBlackAndWhite(ctx, canvas.width, canvas.height);

        // Carga y dibuja el logo con sus colores originales
        const logo = new Image();
        logo.onload = () => {
          const size = (canvas.width * logoSize) / 100;
          const x = (canvas.width - size) / 2;
          const y = (canvas.height - size) / 2;

          // Crea un fondo blanco para el logo
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x - 4, y - 4, size + 8, size + 8);

          // Dibuja el logo
          ctx.drawImage(logo, x, y, size, size);

          resolve(canvas.toDataURL());
        };
        logo.onerror = reject;
        logo.src = URL.createObjectURL(logoFile);
      };
      qrImage.onerror = reject;
      qrImage.src = qrDataUrl;
    });
  };

  /**
   * Genera el código QR basado en el tipo de contenido
   * y las opciones de estilo seleccionadas
   */
  const generateQRCode = async () => {
    try {
      // Genera el contenido según el tipo de QR
      let content = '';
      switch (data.type) {
        case 'url':
          content = data.content.url || '';
          break;
        case 'text':
          content = data.content.text || '';
          break;
        case 'vcard':
          content = `BEGIN:VCARD\nVERSION:3.0\nN:${data.content.lastName};${data.content.firstName};;;\nFN:${data.content.firstName} ${data.content.lastName}\nORG:${data.content.organization}\nTITLE:${data.content.title}\nEMAIL:${data.content.email}\nTEL:${data.content.phone}\nURL:${data.content.website}\nADR:;;${data.content.address};;;;\nEND:VCARD`;
          break;
        case 'email':
          content = `mailto:${data.content.address}?subject=${encodeURIComponent(data.content.subject || '')}&body=${encodeURIComponent(data.content.body || '')}`;
          break;
        case 'phone':
          content = `tel:${data.content.phone}`;
          break;
        case 'wifi':
          content = `WIFI:T:${data.content.encryption};S:${data.content.ssid};P:${data.content.password};H:${data.content.hidden === 'true' ? 'true' : 'false'};;`;
          break;
        case 'geo':
          content = `geo:${data.content.latitude},${data.content.longitude}`;
          break;
        case 'calendar':
          content = `BEGIN:VEVENT\nSUMMARY:${data.content.title}\nLOCATION:${data.content.location}\nDESCRIPTION:${data.content.description}\nDTSTART:${data.content.startDate}\nDTEND:${data.content.endDate}\nEND:VEVENT`;
          break;
        case 'sms':
          content = `smsto:${data.content.phone}:${data.content.message}`;
          break;
        case 'social':
          const platform = data.content.platform;
          const username = data.content.username;
          switch (platform) {
            case 'twitter':
              content = `https://twitter.com/${username}`;
              break;
            case 'linkedin':
              content = `https://linkedin.com/in/${username}`;
              break;
            case 'facebook':
              content = `https://facebook.com/${username}`;
              break;
            case 'instagram':
              content = `https://instagram.com/${username}`;
              break;
          }
          break;
      }

      if (!content) {
        setPngUrl('');
        setSvgContent('');
        return;
      }

      // Genera el PNG
      let pngData = await QRCode.toDataURL(content, {
        width: style.size,
        margin: style.margin,
        color: {
          dark: style.foregroundColor,
          light: style.backgroundColor
        },
        errorCorrectionLevel: style.errorCorrection
      });

      // Añade el logo si se ha proporcionado
      if (style.logo && style.logoSize) {
        pngData = await overlayLogo(pngData, style.logo, style.logoSize);
      }
      
      setPngUrl(pngData);

      // Genera el SVG
      const svgData = await QRCode.toString(content, {
        type: 'svg',
        width: style.size,
        margin: style.margin,
        color: {
          dark: style.foregroundColor,
          light: style.backgroundColor
        },
        errorCorrectionLevel: style.errorCorrection
      });
      setSvgContent(svgData);

    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Regenera el QR cuando cambian los datos o el estilo
  useEffect(() => {
    generateQRCode();
  }, [data, style]);

  /**
   * Maneja la descarga del código QR en el formato seleccionado
   */
  const downloadQR = (format: 'png' | 'svg') => {
    const element = document.createElement('a');
    
    if (format === 'png' && pngUrl) {
      element.href = pngUrl;
      element.download = 'qr-code.png';
    } else if (format === 'svg' && svgContent) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      element.href = URL.createObjectURL(blob);
      element.download = 'qr-code.svg';
    } else {
      return;
    }
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Vista Previa</h3>
      
      <div className="flex flex-col items-center space-y-6">
        {/* Previsualización del QR */}
        {pngUrl ? (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img
              src={pngUrl}
              alt="QR Code Preview"
              className="max-w-full h-auto"
            />
          </div>
        ) : (
          <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm text-center">
              Completa los campos requeridos para generar el QR
            </p>
          </div>
        )}
        
        {/* Botones de descarga */}
        <div className="flex space-x-4">
          <button
            onClick={() => downloadQR('png')}
            disabled={!pngUrl}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar PNG
          </button>
          <button
            onClick={() => downloadQR('svg')}
            disabled={!svgContent}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar SVG
          </button>
        </div>
      </div>
    </div>
  );
};