import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '@/types';
import { generateId } from '@/utils/helpers';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  isLoading: boolean;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  isLoading: true,
});

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const saveExpenses = async (updatedExpenses: Expense[]) => {
    try {
      await AsyncStorage.setItem('@expenses', JSON.stringify(updatedExpenses));
    } catch (error) {
      console.log('Error saving expenses', error);
    }
  };
  
  const loadExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedExpenses = await AsyncStorage.getItem('@expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.log('Error loading expenses', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);
  
  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
    };
    
    setExpenses(prevExpenses => {
      const updatedExpenses = [...prevExpenses, newExpense];
      saveExpenses(updatedExpenses);
      return updatedExpenses;
    });
  }, []);
  
  const updateExpense = useCallback((updatedExpense: Expense) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = prevExpenses.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      );
      saveExpenses(updatedExpenses);
      return updatedExpenses;
    });
  }, []);
  
  const deleteExpense = useCallback((id: string) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = prevExpenses.filter(expense => expense.id !== id);
      saveExpenses(updatedExpenses);
      return updatedExpenses;
    });
  }, []);
  
  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      isLoading,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};