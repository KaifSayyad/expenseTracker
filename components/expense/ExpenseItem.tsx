import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { Expense } from '@/types';
import { formatCurrency, formatTime } from '@/utils/formatters';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface ExpenseItemProps {
  expense: Expense;
  expanded: boolean;
  onPress: () => void;
  onDelete: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  expanded,
  onPress,
  onDelete,
}) => {
  const { theme } = useTheme();
  const { categories } = useCategories();
  
  const category = categories.find(c => c.id === expense.categoryId) || {
    name: 'Uncategorized',
    color: '#9CA3AF',
    icon: 'help-circle'
  };
  
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };
  
  const handleDelete = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    onDelete();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: category.color,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.text,
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    categoryBadge: {
      backgroundColor: `${category.color}20`,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    categoryText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: category.color,
    },
    amount: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: theme.colors.text,
    },
    expandedContent: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    timeText: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    detailLabel: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    detailValue: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.text,
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 16,
    },
    deleteButton: {
      backgroundColor: `${theme.colors.danger}20`,
      padding: 8,
      borderRadius: 8,
      alignSelf: 'flex-end',
    },
  });

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {expense.description}
          </Text>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
            <Text style={styles.timeText}>{formatTime(new Date(expense.date))}</Text>
          </View>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
          {expanded ? (
            <ChevronUp size={18} color={theme.colors.textSecondary} style={{marginLeft: 8}} />
          ) : (
            <ChevronDown size={18} color={theme.colors.textSecondary} style={{marginLeft: 8}} />
          )}
        </View>
      </View>
      
      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.description}>
            {expense.description}
          </Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>{formatCurrency(expense.amount)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{category.name}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {new Date(expense.date).toLocaleDateString()}
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Trash2 size={18} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ExpenseItem;