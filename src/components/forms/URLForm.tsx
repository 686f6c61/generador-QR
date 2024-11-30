import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';

interface URLFormProps {
  value: string;
  onChange: (value: string) => void;
}

const URLForm: React.FC<URLFormProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Input
      label={t('types.url')}
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="https://example.com"
    />
  );
};

export default URLForm;