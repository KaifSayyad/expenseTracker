import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/types';
import ColorPicker from '@/components/ui/ColorPicker';

interface CategoryFormProps {
  visible: boolean;
  onClose: () => void;
  category?: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  visible,
  onClose,
  category,
}) => {
  const { theme } = useTheme();
  const { addCategory, updateCategory } = useCategories();
  
  const [name, setName] = useState('');
  const [color, setColor] = useState('#6366F1'); // Default color
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    if (category) {
      setName(category.name);
      setColor(category.color);
    } else {
      setName('');
      setColor('#6366F1');
    }
    setErrors({});
  }, [category, visible]);
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = () => {
    if (validateForm()) {
      if (category) {
        // Update existing category
        updateCategory({
          ...category,
          name,
          color,
        });
      } else {
        // Add new category
        addCategory({
          name,
          color,
          icon: 'circle', // Default icon
        });
      }
      
      onClose();
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.text,
      marginBottom: 16,
    },
    colorPickerContainer: {
      marginBottom: 24,
    },
    colorLabel: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 12,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 24,
    },
    cancelButton: {
      marginRight: 12,
    },
  });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      avoidKeyboard
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {category ? 'Edit Category' : 'Add New Category'}
        </Text>
        
        <TextInput
          label="Category Name"
          placeholder="Enter category name"
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoFocus
        />
        
        <View style={styles.colorPickerContainer}>
          <Text style={styles.colorLabel}>Category Color</Text>
          <ColorPicker
            selectedColor={color}
            onSelectColor={setColor}
          />
        </View>
        
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
      </ScrollView>
    </Modal>
  );
};

export default CategoryForm;