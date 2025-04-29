import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/types';
import { CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import AlertDialog from '@/components/ui/AlertDialog';
import { useState } from 'react';
import EmptyState from '@/components/ui/EmptyState';
import { formatColor } from '@/utils/helpers';

interface CategoryListProps {
  onEdit: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onEdit }) => {
  const { theme } = useTheme();
  const { categories, deleteCategory } = useCategories();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    categoryCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    colorIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 12,
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: theme.colors.text,
    },
    actionButtons: {
      flexDirection: 'row',
    },
    actionButton: {
      padding: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    emptyText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
      setShowDeleteAlert(false);
      setSelectedCategory(null);
    }
  };

  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories"
        description="Add your first category to get started"
        icon="tag"
      />
    );
  }

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryCard}>
      <View 
        style={[
          styles.colorIndicator, 
          { backgroundColor: item.color }
        ]} 
      />
      
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: `${theme.colors.primary}15` }]}
          onPress={() => onEdit(item)}
        >
          <Edit2 size={18} color={theme.colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: `${theme.colors.danger}15` }]}
          onPress={() => handleDelete(item)}
        >
          <Trash2 size={18} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      
      <AlertDialog
        visible={showDeleteAlert}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteAlert(false)}
      />
    </View>
  );
};

export default CategoryList;