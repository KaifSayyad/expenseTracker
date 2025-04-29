import { format } from 'date-fns';
import { Expense } from '@/types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

export const groupExpensesByDate = (expenses: Expense[]) => {
  const groupedExpenses: { [date: string]: Expense[] } = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
    
    if (!groupedExpenses[formattedDate]) {
      groupedExpenses[formattedDate] = [];
    }
    
    groupedExpenses[formattedDate].push(expense);
  });
  
  return groupedExpenses;
};

export const formatColor = (color: string): string => {
  // Check if color is in hex format
  if (color.startsWith('#')) {
    return color;
  }
  
  // Check if color is a named color
  const namedColors: { [key: string]: string } = {
    red: '#EF4444',
    orange: '#F97316',
    amber: '#F59E0B',
    yellow: '#EAB308',
    green: '#10B981',
    teal: '#14B8A6',
    blue: '#3B82F6',
    indigo: '#6366F1',
    purple: '#8B5CF6',
    pink: '#EC4899',
  };
  
  return namedColors[color.toLowerCase()] || '#6B7280';
};