import React from 'react';
import { QRCodeType, QRCodeData } from '../../../types/qr';
import { URLForm } from './URLForm';
import { TextForm } from './TextForm';
import { VCardForm } from './VCardForm';
import { EmailForm } from './EmailForm';
import { PhoneForm } from './PhoneForm';
import { WiFiForm } from './WiFiForm';
import { GeoForm } from './GeoForm';
import { CalendarForm } from './CalendarForm';
import { SMSForm } from './SMSForm';
import { SocialForm } from './SocialForm';

interface ContentFormProps {
  type: QRCodeType;
  data: QRCodeData;
  onChange: (data: QRCodeData) => void;
}

export const ContentForm: React.FC<ContentFormProps> = ({ type, data, onChange }) => {
  const forms: Record<QRCodeType, React.FC<{ data: QRCodeData; onChange: (data: QRCodeData) => void }>> = {
    url: URLForm,
    text: TextForm,
    vcard: VCardForm,
    email: EmailForm,
    phone: PhoneForm,
    wifi: WiFiForm,
    geo: GeoForm,
    calendar: CalendarForm,
    sms: SMSForm,
    social: SocialForm
  };

  const FormComponent = forms[type];

  return <FormComponent data={data} onChange={onChange} />;
};