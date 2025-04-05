import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface VCardFormProps {
  data: QRCodeData;
  onChange: (data: QRCodeData) => void;
}

export const VCardForm: React.FC<VCardFormProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string, value: string) => {
    onChange({
      type: 'vcard',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Tooltip content="Nombre de la persona">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="firstName"
            value={data.content.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <Tooltip content="Apellidos de la persona">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="lastName"
            value={data.content.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Organización
            </label>
            <Tooltip content="Nombre de la empresa u organización">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="organization"
            value={data.content.organization || ''}
            onChange={(e) => handleInputChange('organization', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <Tooltip content="Puesto o cargo en la organización">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="title"
            value={data.content.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Tooltip content="Dirección de correo electrónico">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="email"
            id="email"
            value={data.content.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <Tooltip content="Número de teléfono con código de país">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="tel"
            id="phone"
            value={data.content.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+34 600000000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center mb-1">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Sitio Web
            </label>
            <Tooltip content="URL del sitio web personal o de la empresa">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="url"
            id="website"
            value={data.content.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://www.ejemplo.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center mb-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <Tooltip content="Dirección postal completa">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <textarea
            id="address"
            rows={3}
            value={data.content.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};