import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { formatCurrency } from '@/utils/formatters';

interface ExpenseTrendCardProps {
  title: string;
  value: number;
  type: 'currency' | 'number' | 'percentage';
}

const ExpenseTrendCard: React.FC<ExpenseTrendCardProps> = ({
  title,
  value,
  type,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 4,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    title: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    value: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.text,
    },
  });

  const formatValue = () => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{formatValue()}</Text>
    </View>
  );
};

export default ExpenseTrendCard;