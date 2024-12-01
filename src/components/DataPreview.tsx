/**
 * Componente DataPreview
 * 
 * Muestra una tabla con la vista previa de los datos de contactos importados del CSV.
 * Características principales:
 * - Tabla responsiva con scroll horizontal
 * - Acciones de edición y eliminación por contacto
 * - Validación de datos en tiempo real
 * - Soporte multiidioma
 * 
 * La tabla permite:
 * - Ver todos los campos de cada contacto
 * - Editar contactos individualmente
 * - Eliminar contactos no deseados
 * - Validar campos obligatorios y formatos
 */
import React, { useState } from 'react';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import { Contact, Language, ValidationError } from '../types';
import { validateContact } from '../utils/validation';

interface DataPreviewProps {
  contacts: Contact[];                   // Lista de contactos a mostrar
  language: Language;                    // Objeto con las traducciones
  onDelete: (id: string) => void;       // Manejador para eliminar contactos
  onUpdate: (contact: Contact) => void;  // Manejador para actualizar contactos
}

export const DataPreview: React.FC<DataPreviewProps> = ({
  contacts,
  language,
  onDelete,
  onUpdate,
}) => {
  // Estados locales para la edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  /**
   * Inicia el modo de edición para un contacto
   */
  const handleEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setEditingContact({ ...contact });
    setErrors([]);
  };

  /**
   * Guarda los cambios realizados en un contacto
   * Valida los datos antes de guardar
   */
  const handleSave = () => {
    if (editingContact) {
      const validationErrors = validateContact(editingContact);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      onUpdate(editingContact);
      setEditingId(null);
      setEditingContact(null);
      setErrors([]);
    }
  };

  /**
   * Cancela la edición y restaura el estado original
   */
  const handleCancel = () => {
    setEditingId(null);
    setEditingContact(null);
    setErrors([]);
  };

  /**
   * Obtiene el mensaje de error para un campo específico
   */
  const getErrorMessage = (field: keyof Contact) => {
    const error = errors.find(e => e.field === field);
    return error ? language.preview.validation[error.message as keyof typeof language.preview.validation] : '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezados de la tabla */}
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(contacts[0]).map((key) => (
                <th
                  key={`header-${key}`}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {key}
                </th>
              ))}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={`row-${contact.id}`}>
                {Object.entries(contact).map(([key, value]) => (
                  <td key={`cell-${contact.id}-${key}`} className="px-6 py-4 whitespace-nowrap">
                    {editingId === contact.id ? (
                      <div>
                        {/* Campo de edición con validación */}
                        <input
                          type="text"
                          value={editingContact?.[key as keyof Contact] || ''}
                          onChange={(e) =>
                            setEditingContact(prev => 
                              prev ? { ...prev, [key]: e.target.value } : null
                            )
                          }
                          className={`w-full px-2 py-1 border rounded ${
                            getErrorMessage(key as keyof Contact) ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {/* Mensaje de error si existe */}
                        {getErrorMessage(key as keyof Contact) && (
                          <p className="text-red-500 text-xs mt-1">
                            {getErrorMessage(key as keyof Contact)}
                          </p>
                        )}
                      </div>
                    ) : (
                      value
                    )}
                  </td>
                ))}
                {/* Columna de acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {editingId === contact.id ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};