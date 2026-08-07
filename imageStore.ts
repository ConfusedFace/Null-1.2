import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StoredImage {
  id: string;
  prompt: string;
  config: any;
  imageUrl: string;
  textOutput: string;
  createdAt: string;
  generationTimeMs: number;
  cached: boolean;
}

interface ImageState {
  images: StoredImage[];
  galleryFilter: 'all' | 'cached' | 'recent' | 'fast';
  searchQuery: string;
  addImage: (image: StoredImage) => void;
  removeImage: (id: string) => void;
  clearGallery: () => void;
  setFilter: (filter: 'all' | 'cached' | 'recent' | 'fast') => void;
  setSearchQuery: (query: string) => void;
}

export const useImageStore = create<ImageState>()(
  persist(
    (set) => ({
      images: [],
      galleryFilter: 'all',
      searchQuery: '',
      addImage: (image) => set((state) => ({ images: [image, ...state.images] })),
      removeImage: (id) => set((state) => ({ images: state.images.filter(img => img.id !== id) })),
      clearGallery: () => set({ images: [] }),
      setFilter: (filter) => set({ galleryFilter: filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'gemini-image-storage',
    }
  )
);
