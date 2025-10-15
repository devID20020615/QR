
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import QRCodeDisplay from './components/QRCodeDisplay';
import { useTheme } from './hooks/useTheme';
import { QrOptions } from './types';

function App() {
  const [theme, toggleTheme] = useTheme();
  const [options, setOptions] = useState<QrOptions>({
    text: 'https://react.dev/',
    color: '#0a428d',
    dotStyle: 'rounded',
  });
  
  const qrInstanceRef = useRef<any | null>(null);

  const handleDownload = () => {
    if (qrInstanceRef.current) {
      qrInstanceRef.current.download({
        name: 'devid-qr-code',
        extension: 'png',
      });
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 p-6 bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <Controls options={options} setOptions={setOptions} onDownload={handleDownload} />
          </div>

          <div className="lg:col-span-3 flex items-center justify-center p-8 bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="p-6 bg-white dark:bg-slate-900/70 rounded-xl shadow-inner">
               <QRCodeDisplay
                text={options.text}
                color={options.color}
                dotStyle={options.dotStyle}
                qrInstanceRef={qrInstanceRef}
              />
            </div>
          </div>

        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Devid's QR Maker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
