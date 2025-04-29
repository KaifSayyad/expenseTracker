import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 35,
      margin: 5,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: 12,
    },
    message: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 24,
      lineHeight: 22,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 5,
    },
    cancelButton: {
      marginRight: 12,
    },
  });

  return (
    <Modal
      visible={visible}
      onClose={onCancel}
      showCloseButton={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title={cancelText}
            variant="outline"
            onPress={onCancel}
            style={styles.cancelButton}
          />
          <Button
            title={confirmText}
            variant={confirmVariant}
            onPress={onConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AlertDialog;