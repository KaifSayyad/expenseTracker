// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Modal from '@/components/ui/Modal';
// import Button from '@/components/ui/Button';
// import TextInput from '@/components/ui/TextInput';
// import { useTheme } from '@/hooks/useTheme';
// import { usePresets } from '@/hooks/usePresets';
// import { Preset } from '@/types';
// import CategorySelector from '@/components/category/CategorySelector';

// interface PresetFormProps {
//   visible: boolean;
//   onClose: () => void;
//   preset?: Preset | null;
// }

// const PresetForm: React.FC<PresetFormProps> = ({
//   visible,
//   onClose,
//   preset,
// }) => {
//   const { theme } = useTheme();
//   const { addPreset, updatePreset } = usePresets();
  
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [errors, setErrors] = useState<{[key: string]: string}>({});
  
//   useEffect(() => {
//     if (preset) {
//       setAmount(preset.amount.toString());
//       setDescription(preset.description);
//       setCategoryId(preset.categoryId);
//     } else {
//       setAmount('');
//       setDescription('');
//       setCategoryId('');
//     }
//     setErrors({});
//   }, [preset, visible]);
  
//   const validateForm = () => {
//     const newErrors: {[key: string]: string} = {};
    
//     if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
//       newErrors.amount = 'Please enter a valid amount';
//     }
    
//     if (!categoryId) {
//       newErrors.category = 'Please select a category';
//     }
    
//     if (!description.trim()) {
//       newErrors.description = 'Please enter a description';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handleSave = () => {
//     if (validateForm()) {
//       const presetData = {
//         amount: Number(amount),
//         description,
//         categoryId,
//       };
      
//       if (preset) {
//         // Update existing preset
//         updatePreset({
//           ...preset,
//           ...presetData,
//         });
//       } else {
//         // Add new preset
//         addPreset(presetData);
//       }
      
//       onClose();
//     }
//   };

//   const styles = StyleSheet.create({
//     container: {
//       padding: 16,
//       flexGrow: 1,
//     },
//     title: {
//       fontFamily: 'Inter-Bold',
//       fontSize: 20,
//       color: theme.colors.text,
//       marginBottom: 16,
//     },
//     buttonContainer: {
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       marginTop: 24,
//     },
//     cancelButton: {
//       marginRight: 12,
//     },
//   });

//   return (
//     <Modal
//       visible={visible}
//       onClose={onClose}
//       avoidKeyboard
//     >
      
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>
//           {preset ? 'Edit Preset' : 'Add New Preset'}
//         </Text>
        
//         <TextInput
//           label="Amount"
//           keyboardType="numeric"
//           placeholder="0.00"
//           value={amount}
//           onChangeText={setAmount}
//           error={errors.amount}
//         />
        
//         <TextInput
//           label="Description"
//           placeholder="E.g., Daily coffee, Bus fare"
//           value={description}
//           onChangeText={setDescription}
//           error={errors.description}
//         />
        
//         <CategorySelector
//           label="Category"
//           selectedCategoryId={categoryId}
//           onSelectCategory={setCategoryId}
//           error={errors.category}
//         />
        
//         <View style={styles.buttonContainer}>
//           <Button
//             title="Cancel"
//             variant="outline"
//             onPress={onClose}
//             style={styles.cancelButton}
//           />
//           <Button
//             title="Save"
//             variant="primary"
//             onPress={handleSave}
//           />
//         </View>
//       </ScrollView>
//     </Modal>
//   );
// };

// export default PresetForm;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { useTheme } from '@/hooks/useTheme';
import { usePresets } from '@/hooks/usePresets';
import { Preset } from '@/types';
import CategorySelector from '@/components/category/CategorySelector';

interface PresetFormProps {
  visible: boolean;
  onClose: () => void;
  preset?: Preset | null;
}

const PresetForm: React.FC<PresetFormProps> = ({
  visible,
  onClose,
  preset,
}) => {
  const { theme } = useTheme();
  const { addPreset, updatePreset } = usePresets();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (preset) {
      setAmount(preset.amount.toString());
      setDescription(preset.description);
      setCategoryId(preset.categoryId);
    } else {
      setAmount('');
      setDescription('');
      setCategoryId('');
    }
    setErrors({});
  }, [preset, visible]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const presetData = {
      amount: Number(amount),
      description,
      categoryId,
    };

    if (preset) {
      updatePreset({ ...preset, ...presetData });
    } else {
      addPreset(presetData);
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={preset ? 'Edit Preset' : 'Add New Preset'}
      scrollable
      avoidKeyboard
    >
      <TextInput
        label="Amount"
        keyboardType="numeric"
        placeholder="0.00"
        value={amount}
        onChangeText={setAmount}
        error={errors.amount}
      />

      <TextInput
        label="Description"
        placeholder="E.g., Daily coffee, Bus fare"
        value={description}
        onChangeText={setDescription}
        error={errors.description}
      />

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
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  cancelButton: {
    marginRight: 12,
  },
});

export default PresetForm;
