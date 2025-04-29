import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Preset } from '@/types';
import { generateId } from '@/utils/helpers';
import { defaultPresets } from '@/constants/defaultData';

type PresetContextType = {
  presets: Preset[];
  addPreset: (preset: Omit<Preset, 'id'>) => void;
  updatePreset: (preset: Preset) => void;
  deletePreset: (id: string) => void;
  isLoading: boolean;
};

export const PresetContext = createContext<PresetContextType>({
  presets: [],
  addPreset: () => {},
  updatePreset: () => {},
  deletePreset: () => {},
  isLoading: true,
});

export const PresetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const savePresets = async (updatedPresets: Preset[]) => {
    try {
      await AsyncStorage.setItem('@presets', JSON.stringify(updatedPresets));
    } catch (error) {
      console.log('Error saving presets', error);
    }
  };
  
  const loadPresets = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedPresets = await AsyncStorage.getItem('@presets');
      if (storedPresets) {
        setPresets(JSON.parse(storedPresets));
      } else {
        // If no presets exist, initialize with default presets
        setPresets(defaultPresets);
        savePresets(defaultPresets);
      }
    } catch (error) {
      console.log('Error loading presets', error);
      // Fallback to default presets
      setPresets(defaultPresets);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadPresets();
  }, [loadPresets]);
  
  const addPreset = useCallback((preset: Omit<Preset, 'id'>) => {
    const newPreset: Preset = {
      ...preset,
      id: generateId(),
    };
    
    setPresets(prevPresets => {
      const updatedPresets = [...prevPresets, newPreset];
      savePresets(updatedPresets);
      return updatedPresets;
    });
  }, []);
  
  const updatePreset = useCallback((updatedPreset: Preset) => {
    setPresets(prevPresets => {
      const updatedPresets = prevPresets.map(preset => 
        preset.id === updatedPreset.id ? updatedPreset : preset
      );
      savePresets(updatedPresets);
      return updatedPresets;
    });
  }, []);
  
  const deletePreset = useCallback((id: string) => {
    setPresets(prevPresets => {
      const updatedPresets = prevPresets.filter(preset => preset.id !== id);
      savePresets(updatedPresets);
      return updatedPresets;
    });
  }, []);
  
  return (
    <PresetContext.Provider value={{
      presets,
      addPreset,
      updatePreset,
      deletePreset,
      isLoading,
    }}>
      {children}
    </PresetContext.Provider>
  );
};