import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import './i18n/config';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <QRCodeGenerator />
    </div>
  );
}

export default App;