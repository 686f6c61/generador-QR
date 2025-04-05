import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';
import { LanyarData } from '../../types/qr';
import { BadgeCheck } from 'lucide-react';

interface LanyarFormProps {
  value: string;
  onChange: (value: string) => void;
}

const LanyarForm: React.FC<LanyarFormProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<LanyarData>(() => {
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

  const handleChange = (field: keyof LanyarData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data, [field]: e.target.value };
    setData(newData);
    onChange(JSON.stringify(newData));
  };

  return (
    <div className="relative space-y-4">
      <div className="absolute -top-12 right-0">
        <BadgeCheck className="w-8 h-8 text-blue-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('lanyar.firstName')}
          value={data.firstName}
          onChange={handleChange('firstName')}
          className="border-blue-500 focus:ring-blue-500"
        />
        <Input
          label={t('lanyar.lastName')}
          value={data.lastName}
          onChange={handleChange('lastName')}
          className="border-blue-500 focus:ring-blue-500"
        />
      </div>
      <Input
        label={t('lanyar.organization')}
        value={data.organization}
        onChange={handleChange('organization')}
        className="border-blue-500 focus:ring-blue-500"
      />
      <Input
        label={t('lanyar.title')}
        value={data.title}
        onChange={handleChange('title')}
        className="border-blue-500 focus:ring-blue-500"
      />
      <Input
        label={t('lanyar.email')}
        type="email"
        value={data.email}
        onChange={handleChange('email')}
        className="border-blue-500 focus:ring-blue-500"
      />
      <Input
        label={t('lanyar.phone')}
        type="tel"
        value={data.phone}
        onChange={handleChange('phone')}
        className="border-blue-500 focus:ring-blue-500"
      />
      <Input
        label={t('lanyar.website')}
        type="url"
        value={data.website}
        onChange={handleChange('website')}
        className="border-blue-500 focus:ring-blue-500"
      />
      <Input
        label={t('lanyar.address')}
        value={data.address}
        onChange={handleChange('address')}
        className="border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};

export default LanyarForm;