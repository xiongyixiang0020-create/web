import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import AspectRatioSelector from './components/AspectRatioSelector';
import ImageResult from './components/ImageResult';
import ImageUploader from './components/ImageUploader';
import { generateImage, restoreImage } from './services/geminiService';
import { AspectRatio, Language, AppMode } from './types';
import { translations } from './translations';
import { Image, Wand2, Eraser } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [lang, setLang] = useState<Language>('zh');
  const [mode, setMode] = useState<AppMode>('generate');
  
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  // Initialize prompt with default value when language changes (only if it's still default or empty)
  useEffect(() => {
    // Only set default if prompt is empty or matches the OTHER language's default
    const otherLang = lang === 'zh' ? 'en' : 'zh';
    if (!prompt || prompt === translations[otherLang].defaultPrompt) {
      setPrompt(t.defaultPrompt);
    }
  }, [lang]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await generateImage(prompt, aspectRatio);
      if (result.error) {
        setError(result.error);
      } else if (result.imageUrl) {
        setImageUrl(result.imageUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageProcess = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      // Choose the correct prompt based on the active mode
      let systemPrompt = t.enhancePrompt;
      if (mode === 'watermark') {
        systemPrompt = t.watermarkPrompt;
      }
      
      const result = await restoreImage(uploadedImage, systemPrompt);
      if (result.error) {
        setError(result.error);
      } else if (result.imageUrl) {
        setImageUrl(result.imageUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when mode changes
  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    setError(null);
    setImageUrl(null);
    setIsLoading(false);
    // Note: We keep the uploaded image so user can switch between 'remove watermark' and 'enhance' on same image if they want
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-blue-500/30">
      <Header lang={lang} setLang={setLang} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Controls Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {t.heroTitle1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {t.heroTitle2}
                </span>
              </h1>
              <p className="text-slate-400 leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-1 backdrop-blur-sm flex space-x-1 mb-4 overflow-x-auto">
              <button 
                onClick={() => handleModeChange('generate')}
                className={`flex-1 min-w-[100px] py-2 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 transition-all whitespace-nowrap ${
                  mode === 'generate' 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                <span>{t.tabGenerate}</span>
              </button>
              <button 
                onClick={() => handleModeChange('watermark')}
                className={`flex-1 min-w-[100px] py-2 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 transition-all whitespace-nowrap ${
                  mode === 'watermark' 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span>{t.tabWatermark}</span>
              </button>
              <button 
                onClick={() => handleModeChange('enhance')}
                className={`flex-1 min-w-[100px] py-2 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 transition-all whitespace-nowrap ${
                  mode === 'enhance' 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>{t.tabEnhance}</span>
              </button>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
              
              {mode === 'generate' ? (
                <>
                  <PromptInput 
                    value={prompt} 
                    onChange={setPrompt} 
                    onSubmit={handleGenerate}
                    isLoading={isLoading}
                    lang={lang}
                  />
                  
                  <div className="pt-4 border-t border-slate-700/50">
                    <AspectRatioSelector 
                      selected={aspectRatio} 
                      onChange={setAspectRatio} 
                      lang={lang}
                    />
                  </div>
                </>
              ) : (
                <ImageUploader 
                  onImageSelect={setUploadedImage}
                  onProcess={handleImageProcess}
                  isLoading={isLoading}
                  lang={lang}
                  mode={mode}
                />
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <ImageResult 
                imageUrl={imageUrl} 
                isLoading={isLoading} 
                error={error} 
                lang={lang}
              />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default App;