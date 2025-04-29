import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { formatCurrency } from '@/utils/formatters';

interface ExpenseSummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  isPercentage?: boolean;
  backgroundColor?: string;
}

const ExpenseSummaryCard: React.FC<ExpenseSummaryCardProps> = ({
  title,
  amount,
  icon,
  isPercentage = false,
  backgroundColor,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor || theme.colors.card,
      borderRadius: 16,
      padding: 16,
      margin: 4,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginLeft: 8,
    },
    amount: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: amount >= 0 
        ? (isPercentage ? theme.colors.danger : theme.colors.text)
        : theme.colors.success,
    },
  });

  const formatAmount = () => {
    if (isPercentage) {
      const prefix = amount >= 0 ? '+' : '';
      return `${prefix}${amount.toFixed(1)}%`;
    }
    return formatCurrency(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.amount}>{formatAmount()}</Text>
    </View>
  );
};

export default ExpenseSummaryCard;