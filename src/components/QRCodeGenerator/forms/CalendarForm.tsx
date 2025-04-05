import React from 'react';
import { QRCodeData } from '../../../types/qr';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from '../../Tooltip';

interface CalendarFormProps {
  data: QRCodeData;
  onChange: (data: QRCodeData) => void;
}

export const CalendarForm: React.FC<CalendarFormProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string, value: string | boolean) => {
    onChange({
      type: 'calendar',
      content: { ...data.content, [field]: value }
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título del Evento
            </label>
            <Tooltip content="Nombre o título del evento">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="title"
            value={data.content.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
            required
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <Tooltip content="Detalles o descripción del evento">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <textarea
            id="description"
            rows={3}
            value={data.content.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <Tooltip content="Lugar donde se realizará el evento">
              <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="location"
            value={data.content.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Fecha de Inicio
              </label>
              <Tooltip content="Fecha y hora de inicio del evento">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="datetime-local"
              id="startDate"
              value={data.content.startDate || ''}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>

          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Fecha de Fin
              </label>
              <Tooltip content="Fecha y hora de finalización del evento">
                <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="datetime-local"
              id="endDate"
              value={data.content.endDate || ''}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="allDay"
            checked={data.content.allDay === 'true'}
            onChange={(e) => handleInputChange('allDay', e.target.checked.toString())}
            className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
          />
          <label htmlFor="allDay" className="ml-2 block text-sm text-gray-700">
            Todo el día
          </label>
          <Tooltip content="Marcar si el evento dura todo el día">
            <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};