import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Modal from '@/components/ui/Modal';
import { useTheme } from '@/hooks/useTheme';
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/formatters';

interface DatePickerProps {
  visible: boolean;
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  visible,
  date,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(date);
  
  // Get current month days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const currentDate = new Date();
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
  // Get day of week for the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const handleDaySelect = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };
  
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };
  
  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };
  
  const handleConfirm = () => {
    onConfirm(selectedDate);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    monthYearText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: theme.colors.text,
    },
    arrowButton: {
      padding: 8,
    },
    daysHeader: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    dayHeaderText: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: '14.28%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.text,
    },
    selectedDay: {
      backgroundColor: theme.colors.primary,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedDayText: {
      color: '#FFF',
      fontFamily: 'Inter-Medium',
    },
    todayText: {
      color: theme.colors.primary,
      fontFamily: 'Inter-Medium',
    },
    disabledDayText: {
      color: theme.colors.textSecondary,
      opacity: 0.5,
    },
    emptyCell: {
      width: '14.28%',
      height: 40,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 24,
    },
    cancelButton: {
      marginRight: 12,
    },
  });

  // Day name abbreviations
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar cells
  const calendarCells = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = 
      selectedDate.getDate() === day && 
      selectedDate.getMonth() === currentMonth && 
      selectedDate.getFullYear() === currentYear;
    
    const isToday = 
      currentDate.getDate() === day && 
      currentDate.getMonth() === currentMonth && 
      currentDate.getFullYear() === currentYear;
    
    calendarCells.push(
      <TouchableOpacity
        key={`day-${day}`}
        style={styles.dayCell}
        onPress={() => handleDaySelect(day)}
      >
        <View style={isSelected ? styles.selectedDay : null}>
          <Text
            style={[
              styles.dayText,
              isSelected ? styles.selectedDayText : null,
              isToday && !isSelected ? styles.todayText : null,
            ]}
          >
            {day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Modal
      visible={visible}
      onClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handlePrevMonth}
          >
            <Text style={styles.monthYearText}>{'<'}</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthYearText}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handleNextMonth}
          >
            <Text style={styles.monthYearText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.daysHeader}>
          {dayNames.map(day => (
            <Text key={day} style={styles.dayHeaderText}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.calendarGrid}>
          {calendarCells}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={onCancel}
            style={styles.cancelButton}
          />
          <Button
            title="Select"
            variant="primary"
            onPress={handleConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DatePicker;