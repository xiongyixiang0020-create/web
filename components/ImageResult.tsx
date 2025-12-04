import React from 'react';
import { Download, Share2, ZoomIn, Info } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ImageResultProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  lang: Language;
}

const ImageResult: React.FC<ImageResultProps> = ({ imageUrl, isLoading, error, lang }) => {
  const t = translations[lang];

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `tech-visual-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <div className="w-full h-full min-h-[400px] bg-red-900/10 border border-red-900/30 rounded-2xl flex flex-col items-center justify-center text-red-400 p-6 text-center">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <Info className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{t.failed}</h3>
        <p className="text-sm opacity-80 max-w-xs">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] bg-slate-800/50 border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
         {/* Animated Background Effect */}
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
         
         <div className="flex flex-col items-center space-y-4 z-10">
           <div className="relative">
             <div className="w-16 h-16 border-4 border-slate-600 rounded-full"></div>
             <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
           </div>
           <p className="text-slate-400 font-medium animate-pulse">{t.generatingBtn}</p>
         </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-full min-h-[400px] bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-500">
        <div className="bg-slate-800 p-4 rounded-full mb-4 shadow-xl">
           <ZoomIn className="w-8 h-8 text-slate-600" />
        </div>
        <p className="font-medium">{t.resultPlaceholder}</p>
        <p className="text-xs mt-2 opacity-60">{t.resultPreview}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
      <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-700">
        <img 
          src={imageUrl} 
          alt="Generated Result" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
           <div>
             <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Generated with Gemini</span>
           </div>
           <button 
             onClick={handleDownload}
             className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-lg transition-colors"
             title="Download"
           >
             <ZoomIn className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleDownload}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 border border-slate-700"
        >
          <Download className="w-4 h-4" />
          <span>{t.download}</span>
        </button>
        <button className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ImageResult;