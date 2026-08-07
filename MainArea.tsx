import React from 'react';
import { useImageGeneration } from '../hooks/useImageGeneration';
import { useUIStore } from '../store/uiStore';
import { Loader2, Download, AlertCircle } from 'lucide-react';

interface MainAreaProps {
  prompt: string;
  setPrompt: (p: string) => void;
}

export const MainArea: React.FC<MainAreaProps> = ({ prompt, setPrompt }) => {
  const { generate, isLoading, error, currentImages } = useImageGeneration();
  const { customConfig, aspectRatio, stylePreset, generationCount } = useUIStore();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Append the selected style preset to the prompt if it exists
    const finalPrompt = stylePreset 
      ? `${prompt.trim()}, ${stylePreset}` 
      : prompt.trim();
      
    generate(finalPrompt, { ...customConfig, aspect_ratio: aspectRatio, generationCount });
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generation-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('CORS or fetch failed, opening image in new tab instead.', err);
      window.open(imageUrl, '_blank');
    }
  };

  const gridMaxW = generationCount === 1 
    ? 'max-w-[280px] lg:max-w-[320px]' 
    : generationCount === 2 
      ? 'max-w-[500px] lg:max-w-[600px]' 
      : 'max-w-[700px] lg:max-w-[800px]';
  const gridCols = generationCount === 1 ? 'grid-cols-1' : generationCount === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

  return (
    <main className="liquid-panel flex-1 flex flex-col p-8 relative overflow-hidden h-full min-h-[600px]">
      {/* Search Input Area */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mt-8 mb-12 relative z-10">
        <form onSubmit={handleGenerate} className="w-full flex flex-col items-center gap-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision..."
            className="liquid-input w-full px-6 py-4 text-center text-lg placeholder-gray-500 text-white"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="neon-button-glow px-8 py-2.5 text-sm font-bold tracking-widest text-cyan-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Images Grid */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full">
        {isLoading || currentImages.length > 0 ? (
          <div className={`grid grid-cols-1 ${gridCols} gap-8 w-full ${gridMaxW} mx-auto`}>
            {Array.from({ length: generationCount }).map((_, index) => {
              const image = currentImages[index];
              return (
                <div key={index} className="relative rounded-2xl overflow-hidden liquid-panel aspect-square max-h-[40vh] md:max-h-[50vh] w-full mx-auto flex items-center justify-center group">
                  {image ? (
                    <>
                      <img src={image.src} alt={`Result ${index}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      
                      {/* Overlay controls */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          onClick={() => handleDownload(image.src, index)}
                          className="p-3 bg-white/10 hover:bg-cyan-500/20 text-white hover:text-cyan-300 rounded-full border border-white/20 hover:border-cyan-500/50 transition-all shadow-lg"
                          title="Download Image"
                        >
                          <Download size={24} />
                        </button>
                      </div>
                    </>
                  ) : (
                    // Loading state
                    <div className="flex flex-col items-center justify-center text-cyan-500/50">
                      <Loader2 size={32} className="animate-spin mb-4" />
                      <span className="text-sm tracking-widest uppercase">Processing</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500/50 font-light tracking-widest uppercase text-sm">
            Ready to Create
          </div>
        )}
      </div>
    </main>
  );
};
