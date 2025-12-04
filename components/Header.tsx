import React from 'react';
import { Sparkles, Zap, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = translations[lang];

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {t.appTitle}
          </span>
        </div>
        <div className="flex items-center space-x-4">
           {/* Language Switcher */}
           <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setLang('zh')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                lang === 'zh' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              中
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                lang === 'en' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-sm text-slate-400">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>{t.poweredBy}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;