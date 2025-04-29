import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IndianRupee as DollarSign, Plus, TrendingUp, TrendingDown } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import { useTheme } from '@/hooks/useTheme';
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import ExpenseQuickAdd from '@/components/expense/ExpenseQuickAdd';
import RecentExpensesList from '@/components/expense/RecentExpensesList';
import ExpenseSummaryCard from '@/components/dashboard/ExpenseSummaryCard';
import PresetList from '@/components/preset/PresetList';
import { formatCurrency } from '@/utils/formatters';

export default function Dashboard() {
  const { theme } = useTheme();
  const { expenses } = useExpenses();
  const { categories } = useCategories();
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Calculate summary data
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Get current month expenses
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
  
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const previousMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === previousMonth && 
           expenseDate.getFullYear() === previousYear;
  });
  
  const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousMonthTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const monthChange = previousMonthTotal === 0 
    ? 100 
    : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: 12,
      marginTop: 8,
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
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.summaryContainer}>
            <ExpenseSummaryCard 
              title="This Month"
              amount={currentMonthTotal}
              icon={<DollarSign color={theme.colors.primary} size={24} />}
              backgroundColor={theme.colors.card}
            />
            <ExpenseSummaryCard 
              title="vs Last Month"
              amount={monthChange}
              icon={monthChange >= 0 
                ? <TrendingUp color={theme.colors.danger} size={24} /> 
                : <TrendingDown color={theme.colors.success} size={24} />
              }
              isPercentage
              backgroundColor={theme.colors.card}
            />
          </View>
          
          <Text style={styles.sectionTitle}>Quick Add Presets</Text>
          <PresetList />
          
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <RecentExpensesList limit={5} />
        </View>
      </ScrollView>
      
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
    </SafeAreaView>
  );
}