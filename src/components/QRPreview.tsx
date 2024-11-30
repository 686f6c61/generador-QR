import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { QRCodeConfig } from '../types/qr';
import Button from './ui/Button';
import Toast from './ui/Toast';

interface QRPreviewProps {
  config: QRCodeConfig;
}

const QRPreview: React.FC<QRPreviewProps> = ({ config }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      link.click();
    }
  };

  const handleCopy = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border-2 border-gray-900 rounded-lg p-4 bg-white">
        <QRCodeCanvas
          value={config.value || ' '}
          size={config.size}
          level={config.level}
          fgColor={config.foreground}
          bgColor={config.background}
          includeMargin={true}
          imageSettings={config.logoUrl ? {
            src: config.logoUrl,
            height: config.logoSize,
            width: config.logoSize,
            excavate: true
          } : undefined}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={handleDownload}>
          <Download size={20} />
          {t('actions.download')}
        </Button>
        <Button variant="secondary" onClick={handleCopy}>
          <Copy size={20} />
          {t('actions.copy')}
        </Button>
      </div>

      <Toast 
        show={showToast} 
        message="QR copiado" 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default QRPreview;