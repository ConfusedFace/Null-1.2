import React from 'react';
import { useUIStore } from '../store/uiStore';
import { SlidersHorizontal, Image as ImageIcon, Copy } from 'lucide-react';
import clsx from 'clsx';

const STYLES = [
  { id: '', label: 'None' },
  { id: 'photorealistic, highly detailed, 8k resolution', label: 'Photorealistic' },
  { id: 'cyberpunk style, neon lighting, dark aesthetic, synthwave', label: 'Cyberpunk' },
  { id: 'anime style, studio ghibli, vibrant colors, beautiful shading', label: 'Anime / Manga' },
  { id: 'oil painting, masterful strokes, classic art style', label: 'Oil Painting' }
];

export const LeftSidebar: React.FC = () => {
  const { customConfig, setCustomConfig, showAdvanced, toggleAdvanced, stylePreset, setStylePreset, generationCount, setGenerationCount } = useUIStore();

  return (
    <aside className="liquid-panel w-full lg:w-64 p-6 flex flex-col gap-8 h-full shrink-0">
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <ImageIcon size={16} />
          Style Presets
        </h2>
        <div className="flex flex-col gap-2">
          {STYLES.map((style) => {
            const isSelected = stylePreset === style.id;
            return (
              <button
                key={style.label}
                onClick={() => setStylePreset(style.id)}
                className={clsx(
                  "text-left px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                  isSelected 
                    ? "bg-white/10 text-white border-white/20 shadow-[0_0_10px_rgba(0,245,255,0.1)]" 
                    : "text-gray-400 border-transparent hover:bg-white/5 hover:border-white/10"
                )}
              >
                {style.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Copy size={16} />
          Generations
        </h2>
        <div className="flex gap-2 bg-black/20 p-1.5 rounded-full border border-white/5">
          {[1, 2, 3].map(count => {
            const isSelected = generationCount === count;
            return (
              <button
                key={count}
                onClick={() => setGenerationCount(count)}
                className={clsx(
                  "flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all duration-300 gap-1",
                  isSelected ? "bg-white/10 text-white shadow-md border border-white/10" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <span className="text-xs font-semibold">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <button 
          onClick={toggleAdvanced}
          className="w-full flex items-center justify-between text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} />
            Model Settings
          </div>
        </button>
        
        {showAdvanced && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-gray-400">Temperature</label>
                <span className="text-white font-mono">{customConfig.temperature}</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.1" 
                value={customConfig.temperature}
                onChange={(e) => setCustomConfig('temperature', parseFloat(e.target.value))}
                className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="text-gray-400">Top P</label>
                <span className="text-white font-mono">{customConfig.top_p}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" 
                value={customConfig.top_p}
                onChange={(e) => setCustomConfig('top_p', parseFloat(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
