export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Preset {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
}

export interface Filter {
  dateRange: { start: Date, end: Date } | null;
  categories: string[];
  priceRange: { min: number, max: number | null };
}