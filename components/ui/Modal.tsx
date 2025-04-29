// import React from 'react';
// import { 
//   Modal as RNModal, 
//   View, 
//   StyleSheet, 
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text
// } from 'react-native';
// import { useTheme } from '@/hooks/useTheme';
// import { X } from 'lucide-react-native';

// interface ModalProps {
//   visible: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   title?: string;
//   showCloseButton?: boolean;
//   avoidKeyboard?: boolean;
//   scrollable?: boolean;
// }

// const Modal: React.FC<ModalProps> = ({ 
//   visible, 
//   onClose, 
//   children,
//   title,
//   showCloseButton = true,
//   avoidKeyboard = true,
//   scrollable = false
// }) => {
//   const { theme } = useTheme();
  
//   const styles = StyleSheet.create({
//     overlay: {
//       flex: 1,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 16,
//     },
//     container: {
//       backgroundColor: theme.colors.card,
//       borderRadius: 16,
//       width: '100%',
//       maxWidth: 500,
//       overflow: 'hidden',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//       elevation: 5,
//       maxHeight: '80%',
//     },
//     header: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 16,
//       paddingVertical: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//     },
//     title: {
//       fontFamily: 'Inter-SemiBold',
//       fontSize: 18,
//       color: theme.colors.text,
//     },
//     closeButton: {
//       padding: 4,
//     },
//     content: {
//       padding: 16,
//     },
//     scrollContent: {
//       flexGrow: 1,
//     },
//     backdrop: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//     }
//   });
  
//   return (
//     <RNModal
//       transparent
//       visible={visible}
//       onRequestClose={onClose}
//       animationType="fade"
//       statusBarTranslucent
//     >
//       <View style={styles.overlay}>
//         {/* Separate touchable for the backdrop */}
//         <TouchableOpacity
//           style={styles.backdrop}
//           activeOpacity={1}
//           onPress={onClose}
//         />
        
//         {avoidKeyboard ? (
//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
//             style={{ width: '100%' }}
//           >
//             <View style={styles.container}>
//               {title && (
//                 <View style={styles.header}>
//                   <Text style={styles.title}>{title}</Text>
//                   {showCloseButton && (
//                     <TouchableOpacity 
//                       style={styles.closeButton} 
//                       onPress={onClose}
//                       hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
//                     >
//                       <X size={20} color={theme.colors.text} />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               )}
              
//               {scrollable ? (
//                 <ScrollView 
//                   contentContainerStyle={styles.scrollContent}
//                   showsVerticalScrollIndicator={false}
//                   keyboardShouldPersistTaps="handled"
//                   keyboardDismissMode="none"
//                 >
//                   <View style={styles.content}>
//                     {children}
//                   </View>
//                 </ScrollView>
//               ) : (
//                 <View style={styles.content}>
//                   {children}
//                 </View>
//               )}
//             </View>
//           </KeyboardAvoidingView>
//         ) : (
//           <View style={styles.container}>
//             {title && (
//               <View style={styles.header}>
//                 <Text style={styles.title}>{title}</Text>
//                 {showCloseButton && (
//                   <TouchableOpacity 
//                     style={styles.closeButton} 
//                     onPress={onClose}
//                     hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
//                   >
//                     <X size={20} color={theme.colors.text} />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )}
            
//             {scrollable ? (
//               <ScrollView 
//                 contentContainerStyle={styles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//                 keyboardShouldPersistTaps="handled"
//                 keyboardDismissMode="none"
//               >
//                 <View style={styles.content}>
//                   {children}
//                 </View>
//               </ScrollView>
//             ) : (
//               <View style={styles.content}>
//                 {children}
//               </View>
//             )}
//           </View>
//         )}
//       </View>
//     </RNModal>
//   );
// };

// export default React.memo(Modal);


import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X } from 'lucide-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  avoidKeyboard?: boolean;
  scrollable?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  avoidKeyboard = true,
  scrollable = false,
}) => {
  const { theme } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            style={styles.keyboardWrapper}
          >
            <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
              {title && (
                <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
                  <Text style={[styles.title, { color: theme.colors.text }]}>
                    {title}
                  </Text>
                  {showCloseButton && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <X size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {scrollable ? (
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={styles.content}>
                    {children}
                  </View>
                </ScrollView>
              ) : (
                <View style={styles.content}>
                  {children}
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  keyboardWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default React.memo(Modal);
