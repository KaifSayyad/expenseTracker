import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '@/constants/theme';

type ThemeContextType = {
  theme: typeof lightTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_mode');
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (e) {
        console.log('Error loading theme preference', e);
      }
    };
    
    loadTheme();
  }, []);
  
  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      AsyncStorage.setItem('@theme_mode', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };
  
  return (
    <ThemeContext.Provider value={{ 
      theme: isDark ? darkTheme : lightTheme,
      isDark,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};