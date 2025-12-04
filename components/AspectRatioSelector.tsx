import React from 'react';
import { AspectRatio, Language } from '../types';
import { translations } from '../translations';
import { Square, Monitor, Smartphone, RectangleHorizontal, RectangleVertical } from 'lucide-react';

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
  lang: Language;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selected, onChange, lang }) => {
  const t = translations[lang];

  const ratios: { value: AspectRatio; label: string; icon: React.ReactNode }[] = [
    { value: '1:1', label: t.ratioSquare, icon: <Square className="w-4 h-4" /> },
    { value: '16:9', label: t.ratioLandscape, icon: <Monitor className="w-4 h-4" /> },
    { value: '9:16', label: t.ratioPortrait, icon: <Smartphone className="w-4 h-4" /> },
    { value: '4:3', label: t.ratioStandard, icon: <RectangleHorizontal className="w-4 h-4" /> },
    { value: '3:4', label: t.ratioTall, icon: <RectangleVertical className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-300">{t.aspectRatio}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => onChange(ratio.value)}
            className={`
              flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-all border
              ${selected === ratio.value 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}
            `}
          >
            {ratio.icon}
            <span>{ratio.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;