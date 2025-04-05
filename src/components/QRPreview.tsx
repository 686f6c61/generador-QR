import React, { useEffect, useState } from 'react';
import { Contact, QRGenerationOptions } from '../types';
import { generateQRCode } from '../utils/qr';

interface QRPreviewProps {
  contact: Contact;
  options: QRGenerationOptions;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ contact, options }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    const generatePreview = async () => {
      try {
        const qrCode = await generateQRCode(contact, 'png', options);
        if (qrCode.png) {
          setPreviewUrl(qrCode.png);
        }
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    };

    generatePreview();
  }, [contact, options]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="QR Code Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-sm text-gray-500 text-center">
              Generating preview...
            </p>
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="font-medium text-gray-900">{contact.firstName} {contact.lastName}</p>
        <p className="text-sm text-gray-600">{contact.organization}</p>
      </div>
    </div>
  );
};