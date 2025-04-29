import React from 'react';
import { Linking, View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Sparkles, Heart, Info, Gift, ExternalLink } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import { useTheme } from '@/hooks/useTheme';
import PresetManager from '@/components/preset/PresetManager';

export default function SettingsScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [showPresetManager, setShowPresetManager] = React.useState(false);

    const handleContactPress = () => {
    Linking.openURL('tel:+919022775595');
  };

  const handleSupportPress = () => {
    Linking.openURL('https://github.com/KaifSayyad/expenseTracker');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 12,
      textAlign: 'left',
      
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      overflow: 'hidden',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    itemText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
      marginLeft: 12,
    },
    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeIcon: {
      marginRight: 8,
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    version: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <View style={styles.themeContainer}>
                {isDark ? (
                  <Moon size={20} color={theme.colors.text} style={styles.themeIcon} />
                ) : (
                  <Sun size={20} color={theme.colors.text} style={styles.themeIcon} />
                )}
              </View>
              <Text style={styles.itemText}>Dark Theme</Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: theme.colors.primaryLight }}
                thumbColor={isDark ? theme.colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customization</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.item}
              onPress={() => setShowPresetManager(true)}
            >
              <Sparkles size={20} color={theme.colors.text} />
              <Text style={styles.itemText}>Manage Preset Transactions</Text>
              <ExternalLink size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <View style={[styles.item]}>
              <Info size={20} color={theme.colors.text} />
              <View style={{flex: 1, marginLeft: 12}}>
                <Text style={styles.itemText}>About ExpenseTracker</Text>
                <Text style={styles.description}>
                  A beautiful expense tracking app with powerful analytics
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.item} onPress={handleContactPress}>
              <Heart size={20} color={theme.colors.text} />
              <Text style={styles.itemText}>Contact Us</Text>
              <ExternalLink size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.item, styles.lastItem]} onPress={handleSupportPress}>
              <Gift size={20} color={theme.colors.text} />
              <Text style={styles.itemText}>Support Development</Text>
              <ExternalLink size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.version}>ExpenseTracker v1.0.0</Text>
      </ScrollView>
      
      {showPresetManager && (
        <PresetManager
          visible={showPresetManager}
          onClose={() => setShowPresetManager(false)}
        />
      )}
    </SafeAreaView>
  );
}