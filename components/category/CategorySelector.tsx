import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { ChevronDown, Check } from 'lucide-react-native';

interface CategorySelectorProps {
  label?: string;
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  error?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  label,
  selectedCategoryId,
  onSelectCategory,
  error,
}) => {
  const { theme } = useTheme();
  const { categories } = useCategories();
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 6,
    },
    selectorButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: error ? theme.colors.danger : theme.colors.border,
      borderRadius: 8,
      padding: 12,
    },
    selectedCategory: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryColor: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 8,
    },
    categoryName: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: theme.colors.text,
    },
    placeholder: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      maxHeight: '60%',
    },
    modalHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: theme.colors.text,
      textAlign: 'center',
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    categoryItemText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
      marginLeft: 8,
    },
    errorText: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: theme.colors.danger,
      marginTop: 4,
    },
  });

  const handleSelectCategory = (categoryId: string) => {
    onSelectCategory(categoryId);
    setModalVisible(false);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleSelectCategory(item.id)}
    >
      <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
      <Text style={styles.categoryItemText}>{item.name}</Text>
      {item.id === selectedCategoryId && (
        <Check size={20} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedCategory ? (
          <View style={styles.selectedCategory}>
            <View 
              style={[
                styles.categoryColor, 
                { backgroundColor: selectedCategory.color }
              ]} 
            />
            <Text style={styles.categoryName}>{selectedCategory.name}</Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>Select a category</Text>
        )}
        
        <ChevronDown size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
            </View>
            
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategorySelector;