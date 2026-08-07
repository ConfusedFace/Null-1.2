import React from 'react';
import { BookOpen, Sparkles, Zap, Ghost } from 'lucide-react';

interface RightSidebarProps {
  onSelectPrompt: (prompt: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onSelectPrompt }) => {
  const library = [
    {
      id: 1,
      title: "Cyberpunk City",
      icon: Zap,
      prompt: "A neon-lit cyberpunk city street at night, raining, highly detailed, reflections in puddles, cinematic lighting, 8k resolution, photorealistic."
    },
    {
      id: 2,
      title: "Neon Fantasy",
      icon: Sparkles,
      prompt: "A mystical forest with glowing bioluminescent plants, neon purple and cyan hues, ethereal atmosphere, highly detailed magical fantasy landscape."
    },
    {
      id: 3,
      title: "Dark Synthwave",
      icon: Ghost,
      prompt: "A retro-futuristic synthwave landscape, glowing grid floor, huge neon sun setting in the distance, dark aesthetic, 1980s outrun style."
    }
  ];

  return (
    <aside className="liquid-panel w-full lg:w-64 p-6 flex flex-col gap-6 h-full shrink-0">
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <BookOpen size={16} />
          Prompt Library
        </h2>
        <div className="flex flex-col gap-4">
          {library.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPrompt(item.prompt)}
                className="group relative flex flex-col items-center justify-center p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-center gap-2"
              >
                <div className="p-3 rounded-full bg-white/5 text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  );
};
