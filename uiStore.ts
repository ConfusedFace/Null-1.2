import { create } from 'zustand';

export type ConfigPreset = 'FAST' | 'BALANCED' | 'QUALITY';
export type AspectRatio = '16:9' | '1:1' | '9:16';

interface UIState {
  showAdvanced: boolean;
  selectedPreset: ConfigPreset;
  aspectRatio: AspectRatio;
  stylePreset: string;
  generationCount: number;
  customConfig: {
    temperature: number;
    top_p: number;
    image_size: string;
  };
  toggleAdvanced: () => void;
  setPreset: (preset: ConfigPreset) => void;
  setAspectRatio: (ratio: AspectRatio) => void;
  setStylePreset: (style: string) => void;
  setGenerationCount: (count: number) => void;
  setCustomConfig: (key: string, value: any) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showAdvanced: false,
  selectedPreset: 'BALANCED',
  aspectRatio: '1:1',
  stylePreset: '',
  generationCount: 2,
  customConfig: {
    temperature: 0.8,
    top_p: 0.9,
    image_size: '1K',
  },
  toggleAdvanced: () => set((state) => ({ showAdvanced: !state.showAdvanced })),
  setPreset: (preset) => set({ selectedPreset: preset }),
  setAspectRatio: (ratio) => set({ aspectRatio: ratio }),
  setStylePreset: (style) => set({ stylePreset: style }),
  setGenerationCount: (count) => set({ generationCount: count }),
  setCustomConfig: (key, value) => set((state) => ({
    customConfig: { ...state.customConfig, [key]: value }
  })),
}));
