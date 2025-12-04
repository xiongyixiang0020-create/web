import React, { useState } from 'react';
import { Upload, Sparkles, Eraser } from 'lucide-react';
import { Language, AppMode } from '../types';
import { translations } from '../translations';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
  onProcess: () => void;
  isLoading: boolean;
  lang: Language;
  mode: AppMode;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onProcess, isLoading, lang, mode }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const t = translations[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      processFile(file);
    }
  };

  // Determine button text and icon based on mode
  const isWatermarkMode = mode === 'watermark';
  const buttonText = isWatermarkMode ? t.watermarkBtn : t.enhanceBtn;
  const loadingText = isWatermarkMode ? t.watermarkingBtn : t.enhancingBtn;
  const Icon = isWatermarkMode ? Eraser : Sparkles;
  const buttonGradient = isWatermarkMode 
    ? 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-violet-500/25'
    : 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25';

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-slate-300">{t.uploadLabel}</label>
      
      {!preview ? (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full h-48 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center bg-slate-800/50 hover:bg-slate-800 transition-colors relative cursor-pointer group"
        >
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="bg-slate-800 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-sm text-slate-300 font-medium">{t.uploadDesc}</p>
          <p className="text-xs text-slate-500 mt-1">{t.uploadSubDesc}</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-700 group">
          <img src={preview} alt="Upload Preview" className="w-full h-48 object-contain bg-slate-900" />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
               onClick={() => setPreview(null)}
               className="text-white bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-lg text-sm"
             >
               Remove
             </button>
          </div>
        </div>
      )}

      <button
        onClick={onProcess}
        disabled={isLoading || !preview}
        className={`
          w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200
          bg-gradient-to-r text-white shadow-lg transform hover:-translate-y-0.5
          ${isLoading || !preview ? 'bg-slate-700 text-slate-500 cursor-not-allowed shadow-none hover:translate-y-0' : buttonGradient}
        `}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            <Icon className="w-5 h-5" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ImageUploader;