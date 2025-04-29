import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '@/types';
import { generateId } from '@/utils/helpers';
import { defaultCategories } from '@/constants/defaultData';

type CategoryContextType = {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  isLoading: boolean;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
  isLoading: true,
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const saveCategories = async (updatedCategories: Category[]) => {
    try {
      await AsyncStorage.setItem('@categories', JSON.stringify(updatedCategories));
    } catch (error) {
      console.log('Error saving categories', error);
    }
  };
  
  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedCategories = await AsyncStorage.getItem('@categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        // If no categories exist, initialize with default categories
        setCategories(defaultCategories);
        saveCategories(defaultCategories);
      }
    } catch (error) {
      console.log('Error loading categories', error);
      // Fallback to default categories
      setCategories(defaultCategories);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  
  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: generateId(),
    };
    
    setCategories(prevCategories => {
      const updatedCategories = [...prevCategories, newCategory];
      saveCategories(updatedCategories);
      return updatedCategories;
    });
  }, []);
  
  const updateCategory = useCallback((updatedCategory: Category) => {
    setCategories(prevCategories => {
      const updatedCategories = prevCategories.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      );
      saveCategories(updatedCategories);
      return updatedCategories;
    });
  }, []);
  
  const deleteCategory = useCallback((id: string) => {
    setCategories(prevCategories => {
      const updatedCategories = prevCategories.filter(category => category.id !== id);
      saveCategories(updatedCategories);
      return updatedCategories;
    });
  }, []);
  
  return (
    <CategoryContext.Provider value={{
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      isLoading,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};