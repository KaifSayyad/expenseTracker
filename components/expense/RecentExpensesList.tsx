import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useExpenses } from '@/hooks/useExpenses';
import ExpenseList from '@/components/expense/ExpenseList';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import EmptyState from '@/components/ui/EmptyState';

interface RecentExpensesListProps {
  limit?: number;
}

const RecentExpensesList: React.FC<RecentExpensesListProps> = ({ limit = 5 }) => {
  const { theme } = useTheme();
  const { expenses } = useExpenses();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    viewAllButton: {
      marginTop: 16,
    },
    emptyContainer: {
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  const navigateToExpenses = () => {
    router.push('/expenses');
  };

  if (expenses.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="No expenses yet"
          description="Add your first expense to get started"
          icon="receipt"
          compact
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpenseList limit={limit} />
      
      {expenses.length > limit && (
        <Button
          title="View All"
          variant="outline"
          onPress={navigateToExpenses}
          style={styles.viewAllButton}
        />
      )}
    </View>
  );
};

export default RecentExpensesList;