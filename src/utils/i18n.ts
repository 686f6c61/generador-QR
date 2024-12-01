import { Language } from '../types';

export const languages: { es: Language; en: Language } = {
  es: {
    header: {
      title: 'Generador QR',
      subtitle: 'Genera códigos QR profesionales para tus credenciales',
      githubAria: 'Ver código en GitHub',
      languageAria: 'Cambiar idioma'
    },
    nav: {
      lanyards: 'QR Lanyards',
      other: 'Otros QR'
    },
    qrTypes: {
      url: 'URL Web',
      text: 'Texto',
      vcard: 'Contacto',
      email: 'Email',
      phone: 'Teléfono',
      wifi: 'Wi-Fi',
      geo: 'Ubicación',
      calendar: 'Evento',
      sms: 'SMS',
      social: 'Redes Sociales'
    },
    qrOptions: {
      title: 'Estilo del QR',
      backgroundColor: 'Color de Fondo',
      foregroundColor: 'Color del QR',
      size: 'Tamaño (px)',
      margin: 'Margen',
      errorCorrection: 'Corrección de Error',
      cornerStyle: 'Estilo de Esquinas',
      logo: 'Logo',
      logoSize: 'Tamaño del Logo (%)',
      logoMaxSize: 'Máximo 500KB',
      uploadLogo: 'Subir Logo',
      preview: 'Vista Previa',
      download: {
        png: 'Descargar PNG',
        svg: 'Descargar SVG'
      },
      errorLevels: {
        L: 'Bajo (7%)',
        M: 'Medio (15%)',
        Q: 'Cuartil (25%)',
        H: 'Alto (30%)'
      },
      corners: {
        square: 'Cuadradas',
        rounded: 'Redondeadas'
      }
    },
    downloadTemplate: 'Descargar Plantilla',
    uploadFile: 'Subir Archivo',
    generateQR: 'Generar QR',
    dropzoneText: 'Arrastre el archivo CSV aquí o haga clic para seleccionar',
    processing: 'Procesando...',
    downloadZip: 'Descargar ZIP',
    maxRecords: 'Máximo 150 registros por archivo',
    instructions: [
      'Descargue la plantilla CSV',
      'Complete la información requerida',
      'Suba el archivo CSV',
      'Configure las opciones del QR y añada su logo',
      'Genere los códigos QR',
      'Descargue el archivo ZIP con los resultados'
    ],
    footer: '2024 - Generador QR Lanyards',
    tooltips: {
      firstName: 'Nombre de la persona',
      lastName: 'Apellidos de la persona',
      organization: 'Nombre de la empresa u organización',
      title: 'Cargo o posición en la empresa',
      email: 'Correo electrónico de contacto',
      phone: 'Número de teléfono (formato internacional)',
      website: 'Sitio web personal o de la empresa',
      address: 'Dirección postal completa',
      size: 'Tamaño del código QR en píxeles',
      errorCorrection: 'Nivel de corrección de errores. Mayor nivel = más resistente a daños',
      margin: 'Margen blanco alrededor del código QR',
      logo: 'Logotipo de la empresa para superponer en el QR',
      logoSize: 'Tamaño del logotipo en relación al código QR',
      backgroundColor: 'Color del fondo del código QR',
      foregroundColor: 'Color de los módulos del código QR',
      cornerStyle: 'Forma de las esquinas del código QR'
    },
    preview: {
      title: 'Vista Previa de Datos',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      formatSelection: 'Formato de QR:',
      qrOptions: 'Opciones de QR:',
      png: 'PNG',
      svg: 'SVG',
      both: 'Ambos',
      generate: 'Generar QRs',
      logoUpload: 'Subir Logo',
      logoPreview: 'Vista Previa',
      validation: {
        email: 'Email inválido',
        phone: 'Teléfono inválido',
        required: 'Campo requerido',
        logoSize: 'El logo es demasiado grande'
      }
    }
  },
  en: {
    header: {
      title: 'QR Generator',
      subtitle: 'Generate professional QR codes for your credentials',
      githubAria: 'View code on GitHub',
      languageAria: 'Change language'
    },
    nav: {
      lanyards: 'QR Lanyards',
      other: 'Other QR'
    },
    qrTypes: {
      url: 'Web URL',
      text: 'Text',
      vcard: 'Contact',
      email: 'Email',
      phone: 'Phone',
      wifi: 'Wi-Fi',
      geo: 'Location',
      calendar: 'Event',
      sms: 'SMS',
      social: 'Social Media'
    },
    qrOptions: {
      title: 'QR Style',
      backgroundColor: 'Background Color',
      foregroundColor: 'QR Color',
      size: 'Size (px)',
      margin: 'Margin',
      errorCorrection: 'Error Correction',
      cornerStyle: 'Corner Style',
      logo: 'Logo',
      logoSize: 'Logo Size (%)',
      logoMaxSize: 'Maximum 500KB',
      uploadLogo: 'Upload Logo',
      preview: 'Preview',
      download: {
        png: 'Download PNG',
        svg: 'Download SVG'
      },
      errorLevels: {
        L: 'Low (7%)',
        M: 'Medium (15%)',
        Q: 'Quartile (25%)',
        H: 'High (30%)'
      },
      corners: {
        square: 'Square',
        rounded: 'Rounded'
      }
    },
    downloadTemplate: 'Download Template',
    uploadFile: 'Upload File',
    generateQR: 'Generate QR',
    dropzoneText: 'Drop CSV file here or click to select',
    processing: 'Processing...',
    downloadZip: 'Download ZIP',
    maxRecords: 'Maximum 150 records per file',
    instructions: [
      'Download the CSV template',
      'Fill in the required information',
      'Upload the CSV file',
      'Configure QR options and add your logo',
      'Generate QR codes',
      'Download the ZIP file with results'
    ],
    footer: '2024 - QR Generator for Lanyards',
    tooltips: {
      firstName: 'Person\'s first name',
      lastName: 'Person\'s last name',
      organization: 'Company or organization name',
      title: 'Position or role in the company',
      email: 'Contact email address',
      phone: 'Phone number (international format)',
      website: 'Personal or company website',
      address: 'Complete postal address',
      size: 'QR code size in pixels',
      errorCorrection: 'Error correction level. Higher level = more resistant to damage',
      margin: 'White margin around the QR code',
      logo: 'Company logo to overlay on the QR code',
      logoSize: 'Logo size relative to QR code',
      backgroundColor: 'QR code background color',
      foregroundColor: 'QR code module color',
      cornerStyle: 'Shape of QR code corners'
    },
    preview: {
      title: 'Data Preview',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      formatSelection: 'QR Format:',
      qrOptions: 'QR Options:',
      png: 'PNG',
      svg: 'SVG',
      both: 'Both',
      generate: 'Generate QRs',
      logoUpload: 'Upload Logo',
      logoPreview: 'Preview',
      validation: {
        email: 'Invalid email',
        phone: 'Invalid phone',
        required: 'Required field',
        logoSize: 'Logo is too large'
      }
    }
  }
};