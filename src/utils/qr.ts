/**
 * Utilidades para la generación de códigos QR
 * 
 * Este módulo contiene las funciones principales para:
 * - Generar vCards (tarjetas de contacto virtuales)
 * - Convertir imágenes a blanco y negro
 * - Superponer logos en códigos QR
 * - Generar códigos QR en diferentes formatos
 */
import QRCode from 'qrcode';
import { Contact, QRFormat, QRGenerationOptions } from '../types';

/**
 * Genera una cadena de texto en formato vCard 3.0
 * @param contact Objeto con la información del contacto
 * @returns Cadena de texto formateada como vCard
 */
export const generateVCard = (contact: Contact): string => {
  return `BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName};;;
FN:${contact.firstName} ${contact.lastName}
ORG:${contact.organization}
TITLE:${contact.title}
EMAIL:${contact.email}
TEL:${contact.phone}
URL:${contact.website}
ADR:;;${contact.address};;;;
END:VCARD`;
};

/**
 * Convierte una imagen a blanco y negro puro
 * Mejora la legibilidad del código QR
 * @param ctx Contexto del canvas
 * @param width Ancho de la imagen
 * @param height Alto de la imagen
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
 * Superpone un logo sobre un código QR
 * @param qrDataUrl URL de datos del código QR
 * @param logoFile Archivo del logo a superponer
 * @param logoSize Tamaño del logo en porcentaje
 * @returns Promise con la URL de datos de la imagen resultante
 */
const overlayLogo = async (
  qrDataUrl: string,
  logoFile: File,
  logoSize: number
): Promise<string> => {
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
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(qrImage, 0, 0);

      // Convierte el QR a blanco y negro
      convertQRToBlackAndWhite(ctx, canvas.width, canvas.height);

      // Carga y dibuja el logo con los colores originales
      const logo = new Image();
      logo.onload = () => {
        const size = (canvas.width * logoSize) / 100;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;

        // Crea un fondo blanco para el logo
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x - 4, y - 4, size + 8, size + 8);

        // Dibuja el logo manteniendo sus colores originales
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
 * Genera un código QR para un contacto
 * @param contact Información del contacto
 * @param format Formato deseado (PNG, SVG o ambos)
 * @param options Opciones de generación del QR
 * @returns Promise con las URLs de los códigos generados
 */
export const generateQRCode = async (
  contact: Contact,
  format: QRFormat,
  options: QRGenerationOptions
): Promise<{ png?: string; svg?: string }> => {
  const vcard = generateVCard(contact);
  const result: { png?: string; svg?: string } = {};

  const qrOptions = {
    errorCorrectionLevel: options.errorCorrection,
    margin: options.margin,
    width: options.size,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  };

  // Genera PNG si se solicita
  if (format === 'png' || format === 'both') {
    let pngData = await QRCode.toDataURL(vcard, qrOptions);
    
    // Añade el logo si se proporciona
    if (options.logo && options.logoSize) {
      pngData = await overlayLogo(pngData, options.logo, options.logoSize);
    }
    
    result.png = pngData;
  }

  // Genera SVG si se solicita
  if (format === 'svg' || format === 'both') {
    result.svg = await QRCode.toString(vcard, {
      ...qrOptions,
      type: 'svg'
    });
  }

  return result;
};

/**
 * Genera un nombre de archivo para el código QR
 * @param contact Información del contacto
 * @param format Extensión del archivo
 * @returns Nombre del archivo formateado
 */
export const getQRFileName = (contact: Contact, format: string): string => {
  const paddedId = contact.id.padStart(3, '0');
  return `${paddedId}_${contact.firstName}_${contact.lastName}_QR.${format}`;
};