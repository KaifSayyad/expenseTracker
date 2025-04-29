// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { useTheme } from '@/hooks/useTheme';
// import { Expense } from '@/types';
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter, VictoryArea } from 'victory-native';
// import { format, subDays, startOfDay, endOfDay } from 'date-fns';
// import EmptyState from '@/components/ui/EmptyState';

// interface WeeklyLineChartProps {
//   expenses: Expense[];
// }

// const WeeklyLineChart: React.FC<WeeklyLineChartProps> = ({ expenses }) => {
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

//   // Get the data for the last 7 days
//   const today = new Date();
//   const days = Array.from({ length: 7 }, (_, i) => {
//     const date = subDays(today, 6 - i);
//     return {
//       date,
//       day: format(date, 'EEE'),
//       fullDate: date,
//     };
//   });
  
//   // Group expenses by day
//   const expensesByDay = days.map(({ date, day, fullDate }) => {
//     const start = startOfDay(fullDate);
//     const end = endOfDay(fullDate);
    
//     const dailyExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate >= start && expenseDate <= end;
//     });
    
//     const total = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
//     return {
//       x: day,
//       y: total,
//       date: format(date, 'MMM dd'),
//     };
//   });
  
//   // Check if we have any data to display
//   const hasData = expensesByDay.some(item => item.y > 0);
  
//   if (!hasData) {
//     return (
//       <View style={styles.emptyContainer}>
//         <EmptyState
//           title="No weekly data"
//           description="Add expenses to see weekly trends"
//           icon="line-chart"
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
//         domainPadding={{ x: 15, y: 15 }}
//         padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
//       >
//         <VictoryAxis
//           tickFormat={expensesByDay.map(item => item.x)}
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
//         <VictoryArea
//           data={expensesByDay}
//           style={{
//             data: { 
//               fill: `${theme.colors.primary}20`,
//               stroke: "transparent",
//             },
//           }}
//           animate={{
//             duration: 500,
//             onLoad: { duration: 300 },
//           }}
//         />
//         <VictoryLine
//           data={expensesByDay}
//           style={{
//             data: { 
//               stroke: theme.colors.primary,
//               strokeWidth: 2,
//             },
//           }}
//           animate={{
//             duration: 500,
//             onLoad: { duration: 300 },
//           }}
//         />
//         <VictoryScatter
//           data={expensesByDay}
//           size={6}
//           style={{
//             data: { 
//               fill: 'white',
//               stroke: theme.colors.primary,
//               strokeWidth: 2,
//             },
//           }}
//           animate={{
//             duration: 500,
//             onLoad: { duration: 300 },
//           }}
//         />
//       </VictoryChart>
//     </View>
//   );
// };

// export default WeeklyLineChart;


// WeeklyLineChart.tsx

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '@/hooks/useTheme';
import { Expense } from '@/types';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import EmptyState from '@/components/ui/EmptyState';

interface WeeklyLineChartProps {
  expenses: Expense[];
}

export const WeeklyLineChart: React.FC<WeeklyLineChartProps> = ({ expenses }) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

  // Build last 7 days labels and ranges
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    return {
      label: format(date, 'EEE'),
      start: startOfDay(date),
      end: endOfDay(date),
    };
  });

  // Sum expenses per day
  const dataPoints = days.map(d =>
    expenses
      .filter(e => {
        const dt = new Date(e.date);
        return dt >= d.start && dt <= d.end;
      })
      .reduce((sum, e) => sum + e.amount, 0)
  );

  // Empty state if all zero
  if (!dataPoints.some(v => v > 0)) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          title="No weekly data"
          description="Add expenses to see weekly trends"
          icon="line-chart"
          compact
        />
      </View>
    );
  }

  const chartData = {
    labels: days.map(d => d.label),
    datasets: [{ data: dataPoints }],
  };

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
      <LineChart
        data={chartData}
        width={chartWidth}
        height={220}
        fromZero
        chartConfig={chartConfig}
        bezier
        style={styles.chartStyle}
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
