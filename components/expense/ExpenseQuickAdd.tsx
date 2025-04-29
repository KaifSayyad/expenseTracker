import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { useTheme } from '@/hooks/useTheme';
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import { Expense } from '@/types';
import CategorySelector from '@/components/category/CategorySelector';
import DatePicker from '@/components/ui/DatePicker';
import { formatDate } from '@/utils/formatters';

interface ExpenseQuickAddProps {
  visible: boolean;
  onClose: () => void;
  initialExpense?: Omit<Expense, 'id'>;
}

const ExpenseQuickAdd: React.FC<ExpenseQuickAddProps> = ({
  visible,
  onClose,
  initialExpense,
}) => {
  const { theme } = useTheme();
  const { addExpense } = useExpenses();
  const { categories } = useCategories();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    if (initialExpense) {
      setAmount(initialExpense.amount.toString());
      setDescription(initialExpense.description);
      setCategoryId(initialExpense.categoryId);
      setDate(new Date(initialExpense.date));
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [initialExpense, categories]);
  
  const validateForm = useCallback(() => {
    const newErrors: {[key: string]: string} = {};
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!categoryId) {
      newErrors.category = 'Please select a category';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [amount, categoryId, description]);
  
  const handleSave = useCallback(() => {
    if (validateForm()) {
      addExpense({
        amount: Number(amount),
        description,
        categoryId,
        date: date.toISOString(),
      });
      
      setAmount('');
      setDescription('');
      setCategoryId(categories.length > 0 ? categories[0].id : '');
      setDate(new Date());
      setErrors({});
      onClose();
    }
  }, [amount, description, categoryId, date, categories, addExpense, onClose, validateForm]);
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      padding: 16,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.text,
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 24,
    },
    cancelButton: {
      marginRight: 12,
    },
    dateButton: {
      backgroundColor: theme.colors.inputBackground,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 16,
    },
    dateText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: theme.colors.text,
    },
    datePickerLabel: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 6,
    },
  }), [theme]);

  const handleAmountChange = useCallback((value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    setAmount(sanitizedValue);
  }, []);


  return (
    <Modal
      visible={visible}
      onClose={onClose}
      avoidKeyboard
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add New Expense</Text>
        
        <TextInput
          label="Amount"
          keyboardType="numeric"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
        />

        <TextInput
          label="Description"
          placeholder="What did you spend on?"
          value={description}
          onChangeText={setDescription}        
        />
        
        <Text style={styles.datePickerLabel}>Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        
        <CategorySelector
          label="Category"
          selectedCategoryId={categoryId}
          onSelectCategory={setCategoryId}
          error={errors.category}
        />
        
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={onClose}
            style={styles.cancelButton}
          />
          <Button
            title="Save"
            variant="primary"
            onPress={handleSave}
          />
        </View>
        
        <DatePicker
          visible={showDatePicker}
          date={date}
          onConfirm={(selectedDate) => {
            setShowDatePicker(false);
            setDate(selectedDate);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </ScrollView>
    </Modal>
  );
};

export default React.memo(ExpenseQuickAdd);