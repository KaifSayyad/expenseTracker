import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, TextInput } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { formatCurrency } from '@/utils/formatters';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
  initialRange: { min: number, max: number | null };
  onValueChange: (range: { min: number, max: number | null }) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  step,
  initialRange,
  onValueChange,
}) => {
  const { theme } = useTheme();
  const [minVal, setMinVal] = useState(initialRange.min);
  const [maxVal, setMaxVal] = useState(initialRange.max || max);
  const [minText, setMinText] = useState(initialRange.min.toString());
  const [maxText, setMaxText] = useState(initialRange.max?.toString() || '');
  
  useEffect(() => {
    setMinVal(initialRange.min);
    setMaxVal(initialRange.max || max);
    setMinText(initialRange.min.toString());
    setMaxText(initialRange.max?.toString() || '');
  }, [initialRange, max]);
  
  const updateValues = (newMin: number, newMax: number | null) => {
    const clampedMin = Math.max(min, newMin);
    const clampedMax = newMax !== null ? Math.min(max, Math.max(clampedMin, newMax)) : null;
    
    setMinVal(clampedMin);
    setMaxVal(clampedMax || max);
    
    setMinText(clampedMin.toString());
    setMaxText(clampedMax?.toString() || '');
    
    onValueChange({ min: clampedMin, max: clampedMax });
  };
  
  const handleMinInputChange = (value: string) => {
    setMinText(value);
    const newMin = value === '' ? min : Number(value);
    if (!isNaN(newMin)) {
      updateValues(newMin, maxVal);
    }
  };
  
  const handleMaxInputChange = (value: string) => {
    setMaxText(value);
    if (value === '') {
      updateValues(minVal, null);
    } else {
      const newMax = Number(value);
      if (!isNaN(newMax)) {
        updateValues(minVal, newMax);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    sliderContainer: {
      height: 40,
      justifyContent: 'center',
      position: 'relative',
    },
    track: {
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
    },
    selectedTrack: {
      height: 4,
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
      position: 'absolute',
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
      position: 'absolute',
      top: 10,
      marginTop: -8,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    valueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    valueBox: {
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      width: '48%',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    valueLabel: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    valueInput: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.text,
      padding: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Min Price</Text>
          <TextInput
            style={styles.valueInput}
            value={minText}
            onChangeText={handleMinInputChange}
            keyboardType="numeric"
            placeholder="Min"
          />
        </View>
        
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Max Price</Text>
          <TextInput
            style={styles.valueInput}
            value={maxText}
            onChangeText={handleMaxInputChange}
            keyboardType="numeric"
            placeholder="No max"
          />
        </View>
      </View>
    </View>
  );
};

export default PriceRangeSlider;