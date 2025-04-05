/**
 * Componente principal App
 * 
 * Este es el componente raíz de la aplicación que gestiona:
 * - La navegación entre las secciones principales (Lanyards y Otros QR)
 * - El estado global de la aplicación
 * - La generación y descarga de códigos QR
 * - La gestión de archivos CSV
 * - El manejo de idiomas
 * 
 * La aplicación tiene dos modos principales:
 * 1. Generación masiva de QRs para credenciales (Lanyards)
 * 2. Generación individual de QRs para diferentes usos (Otros QR)
 */

// Importaciones principales
import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { Instructions } from './components/Instructions';
import { Header } from './components/Header';
import { ActionButton } from './components/ActionButton';
import { DataPreview } from './components/DataPreview';
import { FormatSelector } from './components/FormatSelector';
import { QROptions } from './components/QROptions';
import { QRPreview } from './components/QRPreview';
import { Footer } from './components/Footer';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { languages } from './utils/i18n';
import { generateQRCode, getQRFileName } from './utils/qr';
import { Contact, QRFormat, QRGenerationOptions } from './types';
import { Download, FileCheck, X } from 'lucide-react';
import Papa from 'papaparse';
import JSZip from 'jszip';

function App() {
  // Estados principales de la aplicación
  const [activeTab, setActiveTab] = useState<'lanyards' | 'other'>('lanyards'); // Pestaña activa
  const [language, setLanguage] = useState<'es' | 'en'>('es'); // Idioma seleccionado
  const [processing, setProcessing] = useState(false); // Estado de procesamiento
  const [zipUrl, setZipUrl] = useState<string | null>(null); // URL del archivo ZIP generado
  const [contacts, setContacts] = useState<Contact[]>([]); // Lista de contactos del CSV
  const [qrFormat, setQRFormat] = useState<QRFormat>('png'); // Formato del QR
  const [showPreview, setShowPreview] = useState(false); // Mostrar vista previa
  const [qrOptions, setQROptions] = useState<QRGenerationOptions>({
    size: 300,
    errorCorrection: 'M',
    margin: 4
  });

  /**
   * Maneja la selección y procesamiento del archivo CSV
   * Parsea el contenido y asigna IDs únicos a cada contacto
   */
  const handleFileSelect = async (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const contactsWithIds = (results.data as Omit<Contact, 'id'>[]).map((contact, index) => ({
          ...contact,
          id: (index + 1).toString().padStart(3, '0')
        }));
        setContacts(contactsWithIds as Contact[]);
        setShowPreview(true);
        setZipUrl(null);
      }
    });
  };

  /**
   * Elimina un contacto de la lista por su ID
   */
  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  /**
   * Actualiza los datos de un contacto existente
   */
  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  /**
   * Genera los códigos QR para todos los contactos
   * y los empaqueta en un archivo ZIP
   */
  const generateQRCodes = async () => {
    setProcessing(true);
    setZipUrl(null);

    const zip = new JSZip();

    for (const contact of contacts) {
      try {
        const qrCodes = await generateQRCode(contact, qrFormat, qrOptions);
        
        if (qrCodes.png) {
          const pngData = qrCodes.png.split(',')[1];
          zip.file(getQRFileName(contact, 'png'), pngData, { base64: true });
        }
        
        if (qrCodes.svg) {
          zip.file(getQRFileName(contact, 'svg'), qrCodes.svg);
        }
      } catch (error) {
        console.error(`Error generating QR for ${contact.firstName} ${contact.lastName}:`, error);
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    setZipUrl(url);
    setProcessing(false);
  };

  /**
   * Alterna entre los idiomas disponibles (español/inglés)
   */
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  }, []);

  /**
   * Descarga la plantilla CSV vacía
   */
  const downloadTemplate = () => {
    const template = 'firstName,lastName,organization,title,email,phone,website,address\n';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentLanguage = languages[language];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabecera con título y controles de idioma */}
      <Header onLanguageToggle={toggleLanguage} language={currentLanguage} />
      
      {/* Navegación principal entre secciones */}
      <div className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('lanyards')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                  activeTab === 'lanyards'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {currentLanguage.nav.lanyards}
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                  activeTab === 'other'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {currentLanguage.nav.other}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'lanyards' ? (
          <>
            {/* Sección de QR Lanyards */}
            <Instructions language={currentLanguage} />

            <div className="mt-8 space-y-6">
              {/* Botón de descarga de plantilla */}
              <div className="flex justify-center">
                <div className="w-auto">
                  <ActionButton
                    onClick={downloadTemplate}
                    icon={Download}
                    label={currentLanguage.downloadTemplate}
                  />
                </div>
              </div>

              {/* Zona de carga de archivo */}
              {!showPreview && (
                <FileUpload onFileSelect={handleFileSelect} language={currentLanguage} />
              )}

              {/* Vista previa y opciones */}
              {showPreview && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormatSelector
                        format={qrFormat}
                        onChange={setQRFormat}
                        language={currentLanguage}
                      />
                      <QROptions
                        options={qrOptions}
                        onChange={setQROptions}
                        language={currentLanguage}
                      />
                    </div>
                    {/* Vista previa del QR con logo */}
                    {contacts[0] && qrOptions.logo && (
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
                          {currentLanguage.preview.logoPreview}
                        </h3>
                        <div className="flex items-center justify-center">
                          <div className="max-w-[300px]">
                            <QRPreview contact={contacts[0]} options={qrOptions} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Vista previa de datos */}
                  <DataPreview
                    contacts={contacts}
                    language={currentLanguage}
                    onDelete={handleDeleteContact}
                    onUpdate={handleUpdateContact}
                  />

                  {/* Botones de acción */}
                  <div className="flex justify-center space-x-4">
                    <div className="w-auto">
                      <ActionButton
                        onClick={generateQRCodes}
                        icon={FileCheck}
                        label={currentLanguage.preview.generate}
                        disabled={processing}
                      />
                    </div>
                    
                    <div className="w-auto">
                      <ActionButton
                        onClick={() => {
                          setShowPreview(false);
                          setContacts([]);
                          setZipUrl(null);
                        }}
                        icon={X}
                        label={currentLanguage.preview.cancel}
                        variant="secondary"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Indicador de procesamiento */}
              {processing && (
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="animate-pulse">
                    <p className="text-lg font-medium text-gray-800">
                      {currentLanguage.processing}
                    </p>
                  </div>
                </div>
              )}

              {/* Botón de descarga ZIP */}
              {zipUrl && (
                <div className="flex justify-center">
                  <div className="w-auto">
                    <ActionButton
                      href={zipUrl}
                      download="qr_codes.zip"
                      icon={Download}
                      label={currentLanguage.downloadZip}
                      variant="secondary"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Sección de Otros QR
          <QRCodeGenerator language={currentLanguage} />
        )}

        {/* Pie de página */}
        <Footer language={currentLanguage} />
      </div>
    </div>
  );
}

export default App;