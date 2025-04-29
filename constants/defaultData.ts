import { Category, Preset } from '@/types';
import { generateId } from '@/utils/helpers';

export const defaultCategories: Category[] = [
  {
    id: generateId(),
    name: 'Food & Drink',
    color: '#EF4444',
    icon: 'coffee',
  },
  {
    id: generateId(),
    name: 'Transportation',
    color: '#F59E0B',
    icon: 'car',
  },
  {
    id: generateId(),
    name: 'Shopping',
    color: '#10B981',
    icon: 'shopping-bag',
  },
  {
    id: generateId(),
    name: 'Entertainment',
    color: '#3B82F6',
    icon: 'film',
  },
  {
    id: generateId(),
    name: 'Home',
    color: '#8B5CF6',
    icon: 'home',
  },
  {
    id: generateId(),
    name: 'Health',
    color: '#EC4899',
    icon: 'heart',
  },
  {
    id: generateId(),
    name: 'Travel',
    color: '#14B8A6',
    icon: 'plane',
  },
  {
    id: generateId(),
    name: 'Education',
    color: '#6366F1',
    icon: 'book',
  },
];

export const defaultPresets: Preset[] = [
  {
    id: generateId(),
    amount: 5,
    description: 'Coffee',
    categoryId: defaultCategories[0].id,
  },
  {
    id: generateId(),
    amount: 15,
    description: 'Lunch',
    categoryId: defaultCategories[0].id,
  },
  {
    id: generateId(),
    amount: 2.5,
    description: 'Bus Fare',
    categoryId: defaultCategories[1].id,
  },
  {
    id: generateId(),
    amount: 20,
    description: 'Movie Ticket',
    categoryId: defaultCategories[3].id,
  },
];