export type QRType = 
  | 'lanyar'
  | 'url'
  | 'text'
  | 'vcard'
  | 'wifi'
  | 'email'
  | 'phone'
  | 'calendar'
  | 'location'
  | 'menu'
  | 'social'
  | 'multilink'
  | 'data';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type CornerStyle = 'sharp' | 'rounded';
export type Theme = 'light' | 'dark';

export interface QRCodeConfig {
  type: QRType;
  value: string;
  size: number;
  level: ErrorCorrectionLevel;
  foreground: string;
  background: string;
  cornerStyle: CornerStyle;
  margin: number;
  logoUrl?: string;
  logoSize?: number;
}

export interface LanyarData {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

// Rest of the interfaces remain the same...