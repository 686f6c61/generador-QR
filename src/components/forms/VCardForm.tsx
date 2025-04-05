import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';
import { VCardData } from '../../types/qr';

interface VCardFormProps {
  value: string;
  onChange: (value: string) => void;
}

const VCardForm: React.FC<VCardFormProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<VCardData>(() => {
    try {
      return JSON.parse(value);
    } catch {
      return {
        firstName: '',
        lastName: '',
        organization: '',
        title: '',
        email: '',
        phone: '',
        website: '',
        address: ''
      };
    }
  });

  const handleChange = (field: keyof VCardData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data, [field]: e.target.value };
    setData(newData);
    onChange(JSON.stringify(newData));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('vcard.firstName')}
          value={data.firstName}
          onChange={handleChange('firstName')}
        />
        <Input
          label={t('vcard.lastName')}
          value={data.lastName}
          onChange={handleChange('lastName')}
        />
      </div>
      <Input
        label={t('vcard.organization')}
        value={data.organization}
        onChange={handleChange('organization')}
      />
      <Input
        label={t('vcard.title')}
        value={data.title}
        onChange={handleChange('title')}
      />
      <Input
        label={t('vcard.email')}
        type="email"
        value={data.email}
        onChange={handleChange('email')}
      />
      <Input
        label={t('vcard.phone')}
        type="tel"
        value={data.phone}
        onChange={handleChange('phone')}
      />
      <Input
        label={t('vcard.website')}
        type="url"
        value={data.website}
        onChange={handleChange('website')}
      />
      <Input
        label={t('vcard.address')}
        value={data.address}
        onChange={handleChange('address')}
      />
    </div>
  );
};

export default VCardForm;