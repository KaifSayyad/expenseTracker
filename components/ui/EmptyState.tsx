import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Receipt, Tag, ChartPie as PieChart, Zap, ChartLine as LineChart, ChartBar as BarChart, CircleHelp as HelpCircle } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: 'receipt' | 'tag' | 'pie-chart' | 'zap' | 'line-chart' | 'bar-chart' | 'help-circle';
  compact?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  compact = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: compact ? 16 : 32,
    },
    iconContainer: {
      width: compact ? 48 : 64,
      height: compact ? 48 : 64,
      borderRadius: compact ? 24 : 32,
      backgroundColor: `${theme.colors.primary}15`,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: compact ? 16 : 18,
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: compact ? 14 : 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      maxWidth: 250,
    },
  });

  const getIcon = () => {
    const size = compact ? 24 : 32;
    const color = theme.colors.primary;
    
    switch (icon) {
      case 'receipt':
        return <Receipt size={size} color={color} />;
      case 'tag':
        return <Tag size={size} color={color} />;
      case 'pie-chart':
        return <PieChart size={size} color={color} />;
      case 'zap':
        return <Zap size={size} color={color} />;
      case 'line-chart':
        return <LineChart size={size} color={color} />;
      case 'bar-chart':
        return <BarChart size={size} color={color} />;
      default:
        return <HelpCircle size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default EmptyState;