/**
 * Utilidades de validación
 * 
 * Este módulo proporciona funciones para validar los datos de contacto.
 * Realiza validaciones de:
 * - Campos requeridos
 * - Formato de email
 * - Formato de número de teléfono
 * 
 * Las validaciones son utilizadas tanto en el formulario de edición
 * como en la carga inicial de datos desde el CSV.
 */

import { Contact, ValidationError } from '../types';

/**
 * Valida los datos de un contacto
 * @param contact Objeto con la información del contacto a validar
 * @returns Array de errores encontrados. Array vacío si no hay errores.
 */
export const validateContact = (contact: Contact): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validación de campos requeridos
  const requiredFields: (keyof Contact)[] = ['firstName', 'lastName', 'email', 'phone'];
  requiredFields.forEach(field => {
    if (!contact[field]) {
      errors.push({ field, message: 'required' });
    }
  });

  // Validación de formato de email
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.push({ field: 'email', message: 'email' });
  }

  // Validación de formato de teléfono (formato internacional básico)
  if (contact.phone && !/^\+?[\d\s-()]{8,}$/.test(contact.phone)) {
    errors.push({ field: 'phone', message: 'phone' });
  }

  return errors;
};