// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { useTheme } from '@/hooks/useTheme';
// import { Expense } from '@/types';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
// import { format } from 'date-fns';
// import EmptyState from '@/components/ui/EmptyState';

// interface MonthlyBarChartProps {
//   expenses: Expense[];
// }

// const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ expenses }) => {
//   const { theme } = useTheme();
//   const screenWidth = Dimensions.get('window').width;
//   const chartWidth = screenWidth - 64; // Adjusted for padding

//   const styles = StyleSheet.create({
//     container: {
//       alignItems: 'center',
//     },
//     emptyContainer: {
//       height: 200,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });

//   // Get the current month and the previous 5 months
//   const today = new Date();
//   const months = Array.from({ length: 6 }, (_, i) => {
//     const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
//     return {
//       date,
//       month: format(date, 'MMM'),
//       year: date.getFullYear(),
//     };
//   }).reverse();
  
//   // Group expenses by month
//   const expensesByMonth = months.map(({ date, month, year }) => {
//     const startOfMonth = new Date(year, date.getMonth(), 1);
//     const endOfMonth = new Date(year, date.getMonth() + 1, 0, 23, 59, 59);
    
//     const monthlyExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
//     });
    
//     const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
//     return {
//       x: month,
//       y: total,
//       month: format(date, 'MMMM'),
//       year,
//     };
//   });
  
//   // Check if we have any data to display
//   const hasData = expensesByMonth.some(item => item.y > 0);
  
//   if (!hasData) {
//     return (
//       <View style={styles.emptyContainer}>
//         <EmptyState
//           title="No monthly data"
//           description="Add expenses to see monthly trends"
//           icon="bar-chart"
//           compact
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <VictoryChart
//         width={chartWidth}
//         height={250}
//         domainPadding={{ x: 25 }}
//         padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
//       >
//         <VictoryAxis
//           tickFormat={expensesByMonth.map(item => item.x)}
//           style={{
//             axis: { stroke: theme.colors.border },
//             ticks: { stroke: 'transparent' },
//             tickLabels: { 
//               fill: theme.colors.text,
//               fontSize: 12, 
//               fontFamily: 'Inter-Regular',
//             },
//           }}
//         />
//         <VictoryAxis
//           dependentAxis
//           tickFormat={(tick) => `$${Math.round(tick)}`}
//           style={{
//             axis: { stroke: theme.colors.border },
//             ticks: { stroke: 'transparent' },
//             grid: { stroke: theme.colors.border, strokeDasharray: '4, 4' },
//             tickLabels: { 
//               fill: theme.colors.text,
//               fontSize: 12, 
//               fontFamily: 'Inter-Regular',
//               padding: 5,
//             },
//           }}
//         />
//         <VictoryBar
//           data={expensesByMonth}
//           style={{
//             data: { 
//               fill: theme.colors.primary,
//               width: 25,
//             },
//           }}
//           animate={{
//             duration: 500,
//             onLoad: { duration: 300 },
//           }}
//           cornerRadius={{ top: 4 }}
//         />
//       </VictoryChart>
//     </View>
//   );
// };

// export default MonthlyBarChart;

// MonthlyBarChart.tsx

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '@/hooks/useTheme';
import { Expense } from '@/types';
import { format } from 'date-fns';
import EmptyState from '@/components/ui/EmptyState';

interface MonthlyBarChartProps {
  expenses: Expense[];
}

export const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ expenses }) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

  // Build last 6 months labels and date ranges
  const today = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1);
    return {
      label: format(date, 'MMM'),
      start: new Date(date.getFullYear(), date.getMonth(), 1),
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59),
    };
  });

  // Sum expenses per month
  const dataPoints = months.map(m =>
    expenses
      .filter(e => {
        const d = new Date(e.date);
        return d >= m.start && d <= m.end;
      })
      .reduce((sum, e) => sum + e.amount, 0)
  );

  // If no data, show empty state
  if (!dataPoints.some(v => v > 0)) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          title="No monthly data"
          description="Add expenses to see monthly trends"
          icon="bar-chart"
          compact
        />
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    color: () => theme.colors.primary,
    labelColor: () => theme.colors.text,
    propsForBackgroundLines: { stroke: theme.colors.border },
    decimalPlaces: 0 as const,
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: months.map(m => m.label),
          datasets: [{ data: dataPoints }],
        }}
        width={chartWidth}
        height={220}
        fromZero
        showValuesOnTopOfBars
        chartConfig={chartConfig}
        style={styles.chartStyle}
        verticalLabelRotation={0}
        withInnerLines={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartStyle: {
    borderRadius: 8,
  },
});
