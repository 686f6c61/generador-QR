import { QRCodeToDataURLOptions, QRCodeToStringOptions } from 'qrcode';

export type QRCodeType = 
  | 'url'
  | 'text'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'wifi'
  | 'geo'
  | 'calendar'
  | 'sms'
  | 'social';

export interface QRCodeStyle {
  backgroundColor: string;
  foregroundColor: string;
  size: number;
  margin: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  cornerStyle: 'square' | 'rounded';
  logo?: File;
  logoSize: number;
}

export interface QRCodeData {
  type: QRCodeType;
  content: Record<string, string>;
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

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WEP' | 'WPA' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface CalendarData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
}

export interface GeoData {
  latitude: string;
  longitude: string;
  query: string;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface SocialData {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  username: string;
}