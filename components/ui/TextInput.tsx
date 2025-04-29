import React, { useState, forwardRef } from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  StyleSheet, 
  Text, 
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Eye, EyeOff } from 'lucide-react-native';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  containerStyle?: any;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(({ 
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry,
  value,
  fullWidth = true,
  containerStyle,
  style,
  ...props
}, ref) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  // Separate secureTextEntry out from props to avoid duplicate passing
  const { secureTextEntry: _secureTextEntry, ...propsWithoutSecureTextEntry } = props;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const styles = StyleSheet.create({
    container: {
      width: fullWidth ? '100%' : 'auto',
      marginBottom: 16,
    },
    label: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 6,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: error 
        ? theme.colors.danger
        : isFocused 
          ? theme.colors.primary 
          : theme.colors.border,
      borderRadius: 8,
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 12,
      color: theme.colors.text,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
    },
    iconContainer: {
      padding: 10,
    },
    error: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: theme.colors.danger,
      marginTop: 4,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <RNTextInput
          ref={ref}
          value={value}
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureTextEntry ? !isPasswordVisible : false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...propsWithoutSecureTextEntry}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={theme.colors.textSecondary} />
            ) : (
              <EyeOff size={20} color={theme.colors.textSecondary} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});

TextInput.displayName = 'TextInput';

export default React.memo(TextInput);
