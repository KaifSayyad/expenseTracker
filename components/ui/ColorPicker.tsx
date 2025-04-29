import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Check } from 'lucide-react-native';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  selectedColor,
  onSelectColor
}) => {
  const { theme } = useTheme();
  
  const colors = [
    // Primary
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#818CF8', // Indigo light
    '#A78BFA', // Violet light
    '#F472B6', // Pink light
    '#F87171', // Red light
    '#FB923C', // Orange light
    '#FBBF24', // Amber light
    '#34D399', // Emerald light
    '#22D3EE', // Cyan light
    '#60A5FA', // Blue light
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedRing: {
      borderWidth: 2,
      borderColor: theme.colors.text,
      width: 46,
      height: 46,
      borderRadius: 23,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const isSelected = color === selectedColor;
        
        return (
          <TouchableOpacity
            key={index}
            style={isSelected ? styles.selectedRing : null}
            onPress={() => onSelectColor(color)}
          >
            <View style={[styles.colorOption, { backgroundColor: color }]}>
              {isSelected && (
                <Check size={20} color="#FFF" strokeWidth={3} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ColorPicker;