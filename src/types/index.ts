import { QRCodeToDataURLOptions, QRCodeToStringOptions } from 'qrcode';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface QRGenerationOptions {
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  logo?: File | null;
  logoSize?: number;
}

export interface Language {
  header: {
    title: string;
    subtitle: string;
    githubAria: string;
    languageAria: string;
  };
  nav: {
    lanyards: string;
    other: string;
  };
  qrTypes: {
    url: string;
    text: string;
    vcard: string;
    email: string;
    phone: string;
    wifi: string;
    geo: string;
    calendar: string;
    sms: string;
    social: string;
  };
  qrOptions: {
    title: string;
    backgroundColor: string;
    foregroundColor: string;
    size: string;
    margin: string;
    errorCorrection: string;
    cornerStyle: string;
    logo: string;
    logoSize: string;
    logoMaxSize: string;
    uploadLogo: string;
    preview: string;
    download: {
      png: string;
      svg: string;
    };
    errorLevels: {
      L: string;
      M: string;
      Q: string;
      H: string;
    };
    corners: {
      square: string;
      rounded: string;
    };
  };
  downloadTemplate: string;
  uploadFile: string;
  generateQR: string;
  dropzoneText: string;
  processing: string;
  downloadZip: string;
  maxRecords: string;
  instructions: string[];
  footer: string;
  tooltips: {
    firstName: string;
    lastName: string;
    organization: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    size: string;
    errorCorrection: string;
    margin: string;
    logo: string;
    logoSize: string;
    backgroundColor: string;
    foregroundColor: string;
    cornerStyle: string;
  };
  preview: {
    title: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    formatSelection: string;
    qrOptions: string;
    png: string;
    svg: string;
    both: string;
    generate: string;
    logoUpload: string;
    logoPreview: string;
    validation: {
      email: string;
      phone: string;
      required: string;
      logoSize: string;
    };
  };
}

export type QRFormat = 'png' | 'svg' | 'both';

export interface ValidationError {
  field: keyof Contact;
  message: string;
}

export interface QRCodeOptions extends QRCodeToDataURLOptions, QRCodeToStringOptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  width: number;
  color: {
    dark: string;
    light: string;
  };
}