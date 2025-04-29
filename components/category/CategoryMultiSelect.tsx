import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { X, Check } from 'lucide-react-native';

interface CategoryMultiSelectProps {
  selectedCategories: string[];
  onSelectCategories: (categoryIds: string[]) => void;
}

const CategoryMultiSelect: React.FC<CategoryMultiSelectProps> = ({
  selectedCategories,
  onSelectCategories,
}) => {
  const { theme } = useTheme();
  const { categories } = useCategories();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    selectAllContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 8,
    },
    selectAllButton: {
      padding: 8,
    },
    selectAllText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.primary,
    },
    categoriesList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      padding: 12,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedCategoryItem: {
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    },
    categoryColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    categoryName: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.text,
    },
    selectedCategoryName: {
      color: theme.colors.primary,
      fontFamily: 'Inter-Medium',
    },
    checkIcon: {
      marginLeft: 8,
    },
  });

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onSelectCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      onSelectCategories([...selectedCategories, categoryId]);
    }
  };

  const selectAll = () => {
    if (selectedCategories.length === categories.length) {
      // If all are selected, deselect all
      onSelectCategories([]);
    } else {
      // Otherwise select all
      onSelectCategories(categories.map(c => c.id));
    }
  };

  const isAllSelected = selectedCategories.length === categories.length;

  return (
    <View style={styles.container}>
      <View style={styles.selectAllContainer}>
        <TouchableOpacity 
          style={styles.selectAllButton}
          onPress={selectAll}
        >
          <Text style={styles.selectAllText}>
            {isAllSelected ? 'Deselect All' : 'Select All'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoriesList}>
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                isSelected && styles.selectedCategoryItem
              ]}
              onPress={() => toggleCategory(category.id)}
            >
              <View 
                style={[
                  styles.categoryColor, 
                  { backgroundColor: category.color }
                ]} 
              />
              <Text 
                style={[
                  styles.categoryName,
                  isSelected && styles.selectedCategoryName
                ]}
              >
                {category.name}
              </Text>
              
              {isSelected && (
                <Check 
                  size={14} 
                  color={theme.colors.primary} 
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CategoryMultiSelect;