import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { usePresets } from '@/hooks/usePresets';
import { useCategories } from '@/hooks/useCategories';
import { useExpenses } from '@/hooks/useExpenses';
import { Preset } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import EmptyState from '@/components/ui/EmptyState';

const PresetList: React.FC = () => {
  const { theme } = useTheme();
  const { presets } = usePresets();
  const { categories } = useCategories();
  const { addExpense } = useExpenses();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    scrollContainer: {
      paddingBottom: 8,
    },
    presetCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginRight: 12,
      width: 160,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    amount: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: 4,
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.text,
    },
    categoryTag: {
      marginTop: 8,
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    categoryText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
    },
    emptyContainer: {
      padding: 16,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
    },
  });

  const handlePresetPress = (preset: Preset) => {
    addExpense({
      amount: preset.amount,
      description: preset.description,
      categoryId: preset.categoryId,
      date: new Date().toISOString(),
    });
  };

  if (presets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          title="No preset transactions"
          description="Add preset transactions in Settings"
          icon="zap"
          compact
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {presets.map(preset => {
          const category = categories.find(c => c.id === preset.categoryId);
          
          return (
            <TouchableOpacity
              key={preset.id}
              style={styles.presetCard}
              onPress={() => handlePresetPress(preset)}
            >
              <Text style={styles.amount}>{formatCurrency(preset.amount)}</Text>
              <Text style={styles.description} numberOfLines={1}>
                {preset.description}
              </Text>
              
              {category && (
                <View 
                  style={[
                    styles.categoryTag,
                    { backgroundColor: `${category.color}20` }
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      { color: category.color }
                    ]}
                  >
                    {category.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PresetList;