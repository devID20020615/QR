
import React from 'react';
import { DotType, QrOptions } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface ControlsProps {
  options: QrOptions;
  setOptions: React.Dispatch<React.SetStateAction<QrOptions>>;
  onDownload: () => void;
}

const dotStyleOptions: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Default' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
];

const Controls: React.FC<ControlsProps> = ({ options, setOptions, onDownload }) => {
  const handleInputChange = <K extends keyof QrOptions,>(
    key: K,
    value: QrOptions[K]
  ) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Text or URL
        </label>
        <textarea
          id="text-input"
          rows={4}
          className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
          placeholder="Enter your link or text here..."
          value={options.text}
          onChange={(e) => handleInputChange('text', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="color-picker" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            QR Color
          </label>
          <div className="relative">
            <input
              id="color-picker"
              type="color"
              value={options.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="p-1 h-12 w-full block bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="style-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            QR Style
          </label>
          <select
            id="style-select"
            className="w-full p-3 h-12 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition"
            value={options.dotStyle}
            onChange={(e) => handleInputChange('dotStyle', e.target.value as DotType)}
          >
            {dotStyleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
      >
        <DownloadIcon className="w-5 h-5" />
        Download QR
      </button>
    </div>
  );
};

export default Controls;
