import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import ExpenseItem from '@/components/expense/ExpenseItem';
import { Filter } from '@/types';
import { Search } from 'lucide-react-native';
import TextInput from '@/components/ui/TextInput';
import { groupExpensesByDate } from '@/utils/helpers';
import EmptyState from '@/components/ui/EmptyState';

interface ExpenseListProps {
  filters?: Filter;
  limit?: number;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  filters,
  limit 
}) => {
  const { theme } = useTheme();
  const { expenses, isLoading, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchContainer: {
      marginBottom: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    emptyText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    dateHeader: {
      backgroundColor: theme.colors.backgroundSecondary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 8,
      borderRadius: 8,
    },
    dateText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });

  // Apply filters to expenses
  let filteredExpenses = [...expenses];
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredExpenses = filteredExpenses.filter(expense => 
      expense.description.toLowerCase().includes(query) ||
      categories.find(c => c.id === expense.categoryId)?.name.toLowerCase().includes(query)
    );
  }
  
  // Apply custom filters
  if (filters) {
    // Filter by date range
    if (filters.dateRange) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= filters.dateRange!.start && 
               expenseDate <= filters.dateRange!.end;
      });
    }
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filteredExpenses = filteredExpenses.filter(expense => 
        filters.categories!.includes(expense.categoryId)
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      filteredExpenses = filteredExpenses.filter(expense => 
        expense.amount >= filters.priceRange!.min && 
        (filters.priceRange!.max === null || expense.amount <= filters.priceRange!.max)
      );
    }
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredExpenses = filteredExpenses.slice(0, limit);
  }
  
  // Sort by date (newest first)
  filteredExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group expenses by date
  const groupedExpenses = groupExpensesByDate(filteredExpenses);
  
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Loading expenses...</Text>
      </View>
    );
  }

  if (filteredExpenses.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search expenses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={18} color={theme.colors.textSecondary} />}
          />
        </View>
        
        <EmptyState
          title="No expenses found"
          description={filters ? "Try adjusting your filters" : "Start by adding your first expense"}
          icon="receipt"
        />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const { date, expenses } = item;
    
    return (
      <View>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        
        {expenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            expanded={!!expandedItems[expense.id]}
            onPress={() => toggleExpand(expense.id)}
            onDelete={() => deleteExpense(expense.id)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search expenses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={18} color={theme.colors.textSecondary} />}
        />
      </View>
      
      <FlatList
        data={Object.entries(groupedExpenses).map(([date, expenses]) => ({ date, expenses }))}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseList;