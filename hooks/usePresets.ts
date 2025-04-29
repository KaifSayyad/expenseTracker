import { useContext } from 'react';
import { PresetContext } from '@/context/PresetContext';

export const usePresets = () => {
  const context = useContext(PresetContext);
  
  if (!context) {
    throw new Error('usePresets must be used within a PresetProvider');
  }
  
  return context;
};