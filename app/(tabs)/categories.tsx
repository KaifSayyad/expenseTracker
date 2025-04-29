import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import { useTheme } from '@/hooks/useTheme';
import CategoryList from '@/components/category/CategoryList';
import CategoryForm from '@/components/category/CategoryForm';

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: Platform.OS === 'ios' ? 100 : 80,
      backgroundColor: theme.colors.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  });

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowCategoryForm(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>      
      <View style={styles.content}>
        <CategoryList onEdit={handleEditCategory} />
      </View>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => {
          setEditCategory(null);
          setShowCategoryForm(true);
        }}
      >
        <Plus color="#FFF" size={24} />
      </TouchableOpacity>

      {showCategoryForm && (
        <CategoryForm 
          visible={showCategoryForm} 
          onClose={() => {
            setShowCategoryForm(false);
            setEditCategory(null);
          }}
          category={editCategory}
        />
      )}
    </SafeAreaView>
  );
}