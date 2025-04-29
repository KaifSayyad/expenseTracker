// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import Modal from '@/components/ui/Modal';
// import Button from '@/components/ui/Button';
// import { useTheme } from '@/hooks/useTheme';
// import { usePresets } from '@/hooks/usePresets';
// import { Preset } from '@/types';
// import { CreditCard as Edit2, Trash2, Plus } from 'lucide-react-native';
// import AlertDialog from '@/components/ui/AlertDialog';
// import PresetForm from '@/components/preset/PresetForm';
// import { formatCurrency } from '@/utils/formatters';
// import { useCategories } from '@/hooks/useCategories';
// import EmptyState from '@/components/ui/EmptyState';

// interface PresetManagerProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const PresetManager: React.FC<PresetManagerProps> = ({
//   visible,
//   onClose,
// }) => {
//   const { theme } = useTheme();
//   const { presets, deletePreset } = usePresets();
//   const { categories } = useCategories();
  
//   const [showDeleteAlert, setShowDeleteAlert] = useState(false);
//   const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
//   const [showPresetForm, setShowPresetForm] = useState(false);
//   const [editingPreset, setEditingPreset] = useState<Preset | null>(null);

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  //   title: {
  //     fontFamily: 'Inter-Bold',
  //     fontSize: 20,
  //     color: theme.colors.text,
  //     marginBottom: 16,
  //   },
  //   presetCard: {
  //     backgroundColor: theme.colors.card,
  //     borderRadius: 12,
  //     padding: 16,
  //     marginBottom: 12,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   presetInfo: {
  //     flex: 1,
  //   },
  //   amount: {
  //     fontFamily: 'Inter-SemiBold',
  //     fontSize: 16,
  //     color: theme.colors.text,
  //   },
  //   description: {
  //     fontFamily: 'Inter-Regular',
  //     fontSize: 14,
  //     color: theme.colors.textSecondary,
  //     marginTop: 2,
  //   },
  //   categoryTag: {
  //     marginTop: 4,
  //     alignSelf: 'flex-start',
  //     paddingHorizontal: 6,
  //     paddingVertical: 2,
  //     borderRadius: 4,
  //   },
  //   categoryText: {
  //     fontFamily: 'Inter-Medium',
  //     fontSize: 10,
  //   },
  //   actionButtons: {
  //     flexDirection: 'row',
  //   },
  //   actionButton: {
  //     padding: 8,
  //     borderRadius: 8,
  //     marginLeft: 8,
  //     marginBottom: 3,
  //   },
  //   addButton: {
  //     backgroundColor: theme.colors.primary,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     paddingHorizontal: 16,
  //     paddingVertical: 12,
  //     borderRadius: 8,
  //     marginBottom: 16,
  //   },
  //   addButtonText: {
  //     fontFamily: 'Inter-Medium',
  //     fontSize: 16,
  //     color: '#FFF',
  //     marginLeft: 8,
  //   },
  // });

//   const handleDelete = (preset: Preset) => {
//     setSelectedPreset(preset);
//     setShowDeleteAlert(true);
//   };

//   const confirmDelete = () => {
//     if (selectedPreset) {
//       deletePreset(selectedPreset.id);
//       setShowDeleteAlert(false);
//     }
//   };

//   const handleEdit = (preset: Preset) => {
//     setEditingPreset(preset);
//     setShowPresetForm(true);
//   };

//   const handleAddNew = () => {
//     setEditingPreset(null);
//     setShowPresetForm(true);
//   };

//   const renderItem = ({ item }: { item: Preset }) => {
//     const category = categories.find(c => c.id === item.categoryId);
    
//     return (
//       <View style={styles.presetCard}>
//         <View style={styles.presetInfo}>
//           <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
//           <Text style={styles.description}>{item.description}</Text>
          
//           {category && (
//             <View 
//               style={[
//                 styles.categoryTag,
//                 { backgroundColor: `${category.color}20` }
//               ]}
//             >
//               <Text 
//                 style={[
//                   styles.categoryText,
//                   { color: category.color }
//                 ]}
//               >
//                 {category.name}
//               </Text>
//             </View>
//           )}
//         </View>
        
//         <View style={styles.actionButtons}>
//           <TouchableOpacity 
//             style={[styles.actionButton, { backgroundColor: `${theme.colors.primary}15` }]}
//             onPress={() => handleEdit(item)}
//           >
//             <Edit2 size={18} color={theme.colors.primary} />
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.actionButton, { backgroundColor: `${theme.colors.danger}15` }]}
//             onPress={() => handleDelete(item)}
//           >
//             <Trash2 size={18} color={theme.colors.danger} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <Modal
//       visible={visible}
//       onClose={onClose}
//       scrollable
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>Manage Preset Transactions</Text>
        
//         <TouchableOpacity 
//           style={styles.addButton}
//           onPress={handleAddNew}
//         >
//           <Plus color="#FFF" size={18} />
//           <Text style={styles.addButtonText}>Add New Preset</Text>
//         </TouchableOpacity>
        
//         {presets.length === 0 ? (
//           <EmptyState
//             title="No preset transactions"
//             description="Create quick access presets for your recurring expenses"
//             icon="zap"
//           />
//         ) : (
//           <FlatList
//             data={presets}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             contentContainerStyle={{ flexGrow: 1 }}
//           />
//         )}
//       </View>
      
//       <AlertDialog
//         visible={showDeleteAlert}
//         title="Delete Preset"
//         message={`Are you sure you want to delete "${selectedPreset?.description}"?`}
//         confirmText="Delete"
//         confirmVariant="danger"
//         onConfirm={confirmDelete}
//         onCancel={() => setShowDeleteAlert(false)}
//       />
      
//       {showPresetForm && (
//         <PresetForm
//           visible={showPresetForm}
//           onClose={() => setShowPresetForm(false)}
//           preset={editingPreset}
//         />
//       )}
//     </Modal>
//   );
// };

// export default PresetManager;


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { usePresets } from '@/hooks/usePresets';
import { useCategories } from '@/hooks/useCategories';
import { Preset } from '@/types';
import { CreditCard as Edit2, Trash2, Plus } from 'lucide-react-native';
import AlertDialog from '@/components/ui/AlertDialog';
import PresetForm from '@/components/preset/PresetForm';
import { formatCurrency } from '@/utils/formatters';
import EmptyState from '@/components/ui/EmptyState';

interface PresetManagerProps {
  visible: boolean;
  onClose: () => void;
}

const PresetManager: React.FC<PresetManagerProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { presets, deletePreset } = usePresets();
  const { categories } = useCategories();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [showPresetForm, setShowPresetForm] = useState(false);
  const [editingPreset, setEditingPreset] = useState<Preset | null>(null);

    const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: theme.colors.text,
      marginBottom: 16,
    },
    presetCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    presetInfo: {
      flex: 1,
    },
    amount: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: theme.colors.text,
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    categoryTag: {
      marginTop: 4,
      alignSelf: 'flex-start',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    categoryText: {
      fontFamily: 'Inter-Medium',
      fontSize: 10,
    },
    actionButtons: {
      flexDirection: 'row',
    },
    actionButton: {
      padding: 8,
      borderRadius: 8,
      marginLeft: 8,
      marginBottom: 3,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    addButtonText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: '#FFF',
      marginLeft: 8,
    },
  });


  const handleDelete = (preset: Preset) => {
    setSelectedPreset(preset);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (selectedPreset) {
      deletePreset(selectedPreset.id);
      setShowDeleteAlert(false);
    }
  };

  const handleEdit = (preset: Preset) => {
    setEditingPreset(preset);
    setShowPresetForm(true);
  };

  const handleAddNew = () => {
    setEditingPreset(null);
    setShowPresetForm(true);
  };

  const renderItem = ({ item }: { item: Preset }) => {
    const category = categories.find((c) => c.id === item.categoryId);

    return (
      <View style={styles.presetCard}>
        <View style={styles.presetInfo}>
          <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {category && (
            <View
              style={[
                styles.categoryTag,
                { backgroundColor: `${category.color}20` },
              ]}
            >
              <Text style={[styles.categoryText, { color: category.color }]}>
                {category.name}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: `${theme.colors.primary}15` },
            ]}
            onPress={() => handleEdit(item)}
          >
            <Edit2 size={18} color={theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: `${theme.colors.danger}15` },
            ]}
            onPress={() => handleDelete(item)}
          >
            <Trash2 size={18} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Manage Preset Transactions"
      scrollable
    >
      <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
        <Plus color="#FFF" size={18} />
        <Text style={styles.addButtonText}>Add New Preset</Text>
      </TouchableOpacity>

      {presets.length === 0 ? (
        <EmptyState
          title="No preset transactions"
          description="Create quick access presets for your recurring expenses"
          icon="zap"
        />
      ) : (
        <FlatList
          data={presets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <AlertDialog
        visible={showDeleteAlert}
        title="Delete Preset"
        message={`Are you sure you want to delete "${selectedPreset?.description}"?`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteAlert(false)}
      />

      <PresetForm
        visible={showPresetForm}
        onClose={() => setShowPresetForm(false)}
        preset={editingPreset}
      />
    </Modal>
  );
};

export default PresetManager;
