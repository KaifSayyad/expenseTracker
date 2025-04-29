import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { Filter } from '@/types';
import { Calendar, DollarSign } from 'lucide-react-native';
import CategoryMultiSelect from '@/components/category/CategoryMultiSelect';
import DateRangePicker from '@/components/ui/DateRangePicker';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider';

interface ExpenseFiltersProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filter) => void;
  initialFilters?: Filter;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters = {
    dateRange: null,
    categories: [],
    priceRange: { min: 0, max: null },
  },
}) => {
  const { theme } = useTheme();
  const { categories } = useCategories();
  
  const [filters, setFilters] = useState<Filter>(initialFilters);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  useEffect(() => {
    if (visible) {
      setFilters(initialFilters);
    }
  }, [visible, initialFilters]);
  
  const handleApply = () => {
    onApply(filters);
  };
  
  const resetFilters = () => {
    setFilters({
      dateRange: null,
      categories: [],
      priceRange: { min: 0, max: null },
    });
  };
  
  const handleDateRangeSelect = (range: { start: Date, end: Date } | null) => {
    setFilters(prev => ({
      ...prev,
      dateRange: range
    }));
    setShowDatePicker(false);
  };
  
  const handleCategorySelect = (selectedCategories: string[]) => {
    setFilters(prev => ({
      ...prev,
      categories: selectedCategories
    }));
  };
  
  const handlePriceRangeChange = (range: { min: number, max: number | null }) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 24,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.text,
      marginBottom: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 12,
      marginTop: 24,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: filters.dateRange ? theme.colors.primary : theme.colors.border,
    },
    dateButtonText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: filters.dateRange ? theme.colors.text : theme.colors.textSecondary,
      marginLeft: 8,
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 32,
    },
    clearButton: {
      flex: 1,
      marginRight: 12,
    },
    applyButton: {
      flex: 1,
    },
    selectedRangeText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.text,
      marginTop: 8,
    },
  });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      scrollable
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Filter Expenses</Text>
        
        <Text style={styles.sectionTitle}>Date Range</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Calendar size={20} color={filters.dateRange ? theme.colors.primary : theme.colors.textSecondary} />
          <Text style={styles.dateButtonText}>
            {filters.dateRange 
              ? `${filters.dateRange.start.toLocaleDateString()} - ${filters.dateRange.end.toLocaleDateString()}`
              : 'Select date range'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Categories</Text>
        <CategoryMultiSelect
          selectedCategories={filters.categories}
          onSelectCategories={handleCategorySelect}
        />
        
        <Text style={styles.sectionTitle}>Price Range</Text>
        <PriceRangeSlider
          min={0}
          max={1000}
          step={10}
          initialRange={filters.priceRange}
          onValueChange={handlePriceRangeChange}
        />
        
        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            variant="outline"
            onPress={resetFilters}
            style={styles.clearButton}
          />
          <Button
            title="Apply Filters"
            variant="primary"
            onPress={handleApply}
            style={styles.applyButton}
          />
        </View>
        
        {showDatePicker && (
          <DateRangePicker
            visible={showDatePicker}
            initialRange={filters.dateRange}
            onConfirm={handleDateRangeSelect}
            onCancel={() => setShowDatePicker(false)}
          />
        )}
      </ScrollView>
    </Modal>
  );
};

export default ExpenseFilters;