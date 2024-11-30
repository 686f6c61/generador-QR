import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeConfig, Theme } from '../types/qr';
import Input from './ui/Input';
import Select from './ui/Select';
import Tooltip from './ui/Tooltip';
import URLForm from './forms/URLForm';
import VCardForm from './forms/VCardForm';
import LanyarForm from './forms/LanyarForm';

interface QRFormProps {
  config: QRCodeConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRCodeConfig>>;
  theme: Theme;
}

const QRForm: React.FC<QRFormProps> = ({ config, setConfig, theme }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/png' && file.type !== 'image/svg+xml') {
        alert(t('errors.invalidImageFormat'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({ 
          ...prev, 
          logoUrl: event.target?.result as string,
          logoSize: Math.floor(config.size * 0.2) // 20% of QR code size
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValueChange = (value: string) => {
    setConfig(prev => ({ ...prev, value }));
  };

  const renderForm = () => {
    switch (config.type) {
      case 'lanyar':
        return <LanyarForm value={config.value} onChange={handleValueChange} />;
      case 'url':
        return <URLForm value={config.value} onChange={handleValueChange} />;
      case 'vcard':
        return <VCardForm value={config.value} onChange={handleValueChange} />;
      default:
        return (
          <Input
            label={t(`types.${config.type}`)}
            name="value"
            value={config.value}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderForm()}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Tooltip text={t('tooltips.size')}>
            <Input
              label={t('customization.size')}
              type="number"
              name="size"
              value={config.size}
              onChange={handleChange}
              min="128"
              max="512"
              step="32"
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip text={t('tooltips.errorLevel')}>
            <Select
              label={t('customization.errorLevel')}
              name="level"
              value={config.level}
              onChange={handleChange}
              options={[
                { value: 'L', label: 'L - 7%' },
                { value: 'M', label: 'M - 15%' },
                { value: 'Q', label: 'Q - 25%' },
                { value: 'H', label: 'H - 30%' }
              ]}
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip text={t('tooltips.foreground')}>
            <Input
              label={t('customization.foreground')}
              type="color"
              name="foreground"
              value={config.foreground}
              onChange={handleChange}
              className="h-10"
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip text={t('tooltips.background')}>
            <Input
              label={t('customization.background')}
              type="color"
              name="background"
              value={config.background}
              onChange={handleChange}
              className="h-10"
            />
          </Tooltip>
        </div>
      </div>

      <div>
        <Tooltip text={t('tooltips.logo')}>
          <Input
            label={t('customization.logo')}
            type="file"
            accept=".png,.svg"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black file:text-sm file:font-semibold hover:file:bg-gray-100"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default QRForm;