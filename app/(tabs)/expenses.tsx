import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Filter } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import { useTheme } from '@/hooks/useTheme';
import ExpenseList from '@/components/expense/ExpenseList';
import ExpenseQuickAdd from '@/components/expense/ExpenseQuickAdd';
import ExpenseFilters from '@/components/expense/ExpenseFilters';

export default function ExpensesScreen() {
  const { theme } = useTheme();
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: null,
    categories: [],
    priceRange: { min: 0, max: null },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: Platform.OS === 'ios' ? 100 : 80,
      backgroundColor: theme.colors.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    filterButton: {
      position: 'absolute',
      right: 20,
      bottom: Platform.OS === 'ios' ? 170 : 150,
      backgroundColor: theme.colors.card,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setShowFilters(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <ExpenseList filters={activeFilters} />
      </View>
      
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={() => setShowFilters(true)}
      >
        <Filter 
          color={
            Object.values(activeFilters).some(value => 
              Array.isArray(value) ? value.length > 0 : value !== null
            ) && activeFilters.priceRange.max !== null
              ? theme.colors.primary
              : theme.colors.text
          } 
          size={24} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowQuickAdd(true)}
      >
        <Plus color="#FFF" size={24} />
      </TouchableOpacity>

      {showQuickAdd && (
        <ExpenseQuickAdd 
          visible={showQuickAdd} 
          onClose={() => setShowQuickAdd(false)} 
        />
      )}
      
      {showFilters && (
        <ExpenseFilters
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          onApply={handleFilterChange}
          initialFilters={activeFilters}
        />
      )}
    </SafeAreaView>
  );
}