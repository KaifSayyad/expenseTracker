import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';

import Header from '@/components/ui/Header';
import { useTheme } from '@/hooks/useTheme';
import { useExpenses } from '@/hooks/useExpenses';
import ExpenseFilters from '@/components/expense/ExpenseFilters';
import ExpenseTrendCard from '@/components/charts/ExpenseTrendCard';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { MonthlyBarChart } from '@/components/charts/MonthlyBarChart';
import { WeeklyLineChart } from '@/components/charts/WeeklyLineChart';

export default function AnalyticsScreen() {
  const { theme } = useTheme();
  const { expenses } = useExpenses();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    dateRange: { start: Date; end: Date } | null;
    categories: string[];
    priceRange: { min: number; max: number | null };
  }>({
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
      padding: 16,
    },
    trendCards: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      marginBottom: 16,
    },
    section: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    sectionTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 12,
    },
    filterButton: {
      position: 'absolute',
      right: 20,
      bottom: Platform.OS === 'ios' ? 100 : 80,  // Adjust for iOS and Android
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
  });

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setShowFilters(false);
  };

  // Apply filters to expenses
  const filteredExpenses = expenses.filter(exp => {
    if (activeFilters.dateRange) {
      const d = new Date(exp.date);
      if (d < activeFilters.dateRange.start || d > activeFilters.dateRange.end) {
        return false;
      }
    }
    if (
      activeFilters.categories.length > 0 &&
      !activeFilters.categories.includes(exp.categoryId)
    ) {
      return false;
    }
    if (exp.amount < activeFilters.priceRange.min) {
      return false;
    }
    if (
      activeFilters.priceRange.max !== null &&
      exp.amount > activeFilters.priceRange.max
    ) {
      return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trend summary cards */}
        <View style={styles.trendCards}>
          <ExpenseTrendCard
            title="Daily Average"
            value={
              filteredExpenses.length > 0
                ? filteredExpenses.reduce((sum, e) => sum + e.amount, 0) /
                  (new Set(filteredExpenses.map(e => new Date(e.date).toDateString()))
                    .size || 1)
                : 0
            }
            type="currency"
          />
          <ExpenseTrendCard
            title="Total Expenses"
            value={filteredExpenses.length}
            type="number"
          />
        </View>

        {/* Category Pie Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expenses by Category</Text>
          <CategoryPieChart expenses={filteredExpenses} />
        </View>

        {/* Monthly Bar Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Expenses</Text>
          <MonthlyBarChart expenses={filteredExpenses} />
        </View>

        {/* Weekly Line Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Spending Trend</Text>
          <WeeklyLineChart expenses={filteredExpenses} />
        </View>
      </ScrollView>

      {/* Floating Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowFilters(true)}
      >
        <Filter
          color={
            // highlight filter icon if any filter active
            (activeFilters.dateRange !== null ||
              activeFilters.categories.length > 0 ||
              activeFilters.priceRange.max !== null)
              ? theme.colors.primary
              : theme.colors.text
          }
          size={24}
        />
      </TouchableOpacity>

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
