// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import { useTheme } from '@/hooks/useTheme';
// import { useCategories } from '@/hooks/useCategories';
// import { Expense } from '@/types';
// import { formatCurrency } from '@/utils/formatters';
// import EmptyState from '@/components/ui/EmptyState';

// interface CategoryPieChartProps {
//   expenses: Expense[];
// }

// export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ expenses }) => {
//   const { theme } = useTheme();
//   const { categories } = useCategories();
//   const screenWidth = Dimensions.get('window').width;
//   const chartWidth = screenWidth - 64

//   const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   totalLabel: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   totalAmount: {
//     fontFamily: 'Inter-Bold',
//     fontSize: 24,
//     marginBottom: 12,
//   },
//   emptyContainer: {
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


//   // Group expenses by category
//   const expensesByCategory = expenses.reduce((acc, expense) => {
//     acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
//     return acc;
//   }, {} as Record<string, number>);

//   // Prepare chart data
//   const data = Object.entries(expensesByCategory).map(([categoryId, amount]) => {
//     const category = categories.find(c => c.id === categoryId) || {
//       name: 'Unknown',
//       color: '#9CA3AF',
//     };
//     return {
//       name: category.name,
//       population: amount,
//       color: category.color,
//       legendFontColor: theme.colors.text,
//       legendFontSize: 12,
//     };
//   });

//   // If no data, show empty state
//   if (data.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <EmptyState
//           title="No data to display"
//           description="Add expenses to see analytics"
//           icon="pie-chart"
//           compact
//         />
//       </View>
//     );
//   }

//   // Chart configuration
//   const chartConfig = {
//     backgroundGradientFrom: theme.colors.card,
//     backgroundGradientTo: theme.colors.card,
//     color: () => theme.colors.primary,
//     labelColor: () => theme.colors.text,
//     propsForBackgroundLines: {
//       stroke: theme.colors.border,
//     },
//     decimalPlaces: 0 as const,
//   };

//   const total = Object.values(expensesByCategory).reduce((sum, v) => sum + v, 0);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.totalLabel}>Total Spending</Text>
//       <Text style={styles.totalAmount, color: () => theme.colors.primary}>{formatCurrency(total)}</Text>
//       <PieChart
//         data={data}
//         width={chartWidth}
//         height={200}
//         chartConfig={chartConfig}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft={0}
//         absolute
//       />
//     </View>
//   );};


import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { Expense } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import EmptyState from '@/components/ui/EmptyState';

interface CategoryPieChartProps {
  expenses: Expense[];
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ expenses }) => {
  const { theme } = useTheme();
  const { categories } = useCategories();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    totalLabel: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    totalAmount: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      marginBottom: 12,
    },
    emptyContainer: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart data
  const data = Object.entries(expensesByCategory).map(([categoryId, amount]) => {
    const category = categories.find(c => c.id === categoryId) || {
      name: 'Unknown',
      color: '#9CA3AF',
    };
    return {
      name: category.name,
      population: amount,
      color: category.color,
      legendFontColor: theme.colors.text,
      legendFontSize: 12,
    };
  });

  // If no data, show empty state
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          title="No data to display"
          description="Add expenses to see analytics"
          icon="pie-chart"
          compact
        />
      </View>
    );
  }

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    color: () => theme.colors.primary,
    labelColor: () => theme.colors.text,
    propsForBackgroundLines: {
      stroke: theme.colors.border,
    },
    decimalPlaces: 0 as const,
  };

  const total = Object.values(expensesByCategory).reduce((sum, v) => sum + v, 0);

  return (
    <View style={styles.container}>
      <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total Spending</Text>
      <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>
        {formatCurrency(total)}
      </Text>
      <PieChart
        data={data}
        width={chartWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft={0}
        absolute
      />
    </View>
  );
};
