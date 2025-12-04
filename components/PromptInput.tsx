import React from 'react';
import { Wand2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  lang: Language;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
        <span>{t.promptLabel}</span>
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.promptPlaceholder}
          className="w-full h-48 bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all shadow-inner"
        />
        <div className="absolute bottom-3 right-3">
           <span className="text-xs text-slate-600">{value.length} chars</span>
        </div>
      </div>
      
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className={`
          w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200
          ${isLoading || !value.trim()
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5'}
        `}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{t.generatingBtn}</span>
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            <span>{t.generateBtn}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;