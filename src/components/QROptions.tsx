import React, { useRef } from 'react';
import { HelpCircle, Upload } from 'lucide-react';
import { QRGenerationOptions, Language } from '../types';
import { Tooltip } from './Tooltip';

interface QROptionsProps {
  options: QRGenerationOptions;
  onChange: (options: QRGenerationOptions) => void;
  language: Language;
}

export const QROptions: React.FC<QROptionsProps> = ({
  options,
  onChange,
  language
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        alert(language.preview.validation.logoSize);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
        onChange({ ...options, logo: file, logoSize: options.logoSize || 20 });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          {language.preview.qrOptions}
        </h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Size (px)
                </label>
                <Tooltip content={language.tooltips.size}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <input
                type="number"
                min="100"
                max="1000"
                step="50"
                value={options.size}
                onChange={(e) => onChange({ ...options, size: Number(e.target.value) })}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Error Correction
                </label>
                <Tooltip content={language.tooltips.errorCorrection}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <select
                value={options.errorCorrection}
                onChange={(e) => onChange({ ...options, errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
                className="w-28 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Margin
                </label>
                <Tooltip content={language.tooltips.margin}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <input
                type="number"
                min="0"
                max="10"
                value={options.margin}
                onChange={(e) => onChange({ ...options, margin: Number(e.target.value) })}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Logo
                </label>
                <Tooltip content={language.tooltips.logo}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                {logoPreview && (
                  <div className="w-8 h-8 rounded-md border border-gray-200 overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
                >
                  <Upload className="w-3.5 h-3.5 mr-1" />
                  {language.preview.logoUpload}
                </button>
              </div>
            </div>
          </div>

          {options.logo && (
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    Logo Size (%)
                  </label>
                  <Tooltip content={language.tooltips.logoSize}>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Tooltip>
                </div>
                <input
                  type="number"
                  min="10"
                  max="30"
                  value={options.logoSize || 20}
                  onChange={(e) => onChange({ ...options, logoSize: Number(e.target.value) })}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};