import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from '@/components/ui/Modal';
import { useTheme } from '@/hooks/useTheme';
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/formatters';

interface DateRangePickerProps {
  visible: boolean;
  initialRange: { start: Date, end: Date } | null;
  onConfirm: (range: { start: Date, end: Date } | null) => void;
  onCancel: () => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  visible,
  initialRange,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState<Date | null>(initialRange?.start || null);
  const [endDate, setEndDate] = useState<Date | null>(initialRange?.end || null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');
  
  useEffect(() => {
    if (visible) {
      if (initialRange) {
        setStartDate(initialRange.start);
        setEndDate(initialRange.end);
        setCurrentMonth(initialRange.start);
      } else {
        const today = new Date();
        setStartDate(null);
        setEndDate(null);
        setCurrentMonth(today);
      }
      setSelectionMode('start');
    }
  }, [visible, initialRange]);
  
  // Get current month days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
  
  // Get day of week for the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const handleDaySelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonthIndex, day);
    
    if (selectionMode === 'start') {
      setStartDate(selectedDate);
      setEndDate(null);
      setSelectionMode('end');
    } else {
      // If selecting end date before start date, swap them
      if (startDate && selectedDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
      setSelectionMode('start');
    }
  };
  
  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };
  
  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };
  
  const handleConfirm = () => {
    if (startDate && endDate) {
      onConfirm({ start: startDate, end: endDate });
    } else {
      onConfirm(null);
    }
  };
  
  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectionMode('start');
  };
  
  // Get preset date ranges
  const getPresetRanges = () => {
    const today = new Date();
    
    // This month
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Last month
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    // Last 7 days
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 6);
    
    // Last 30 days
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 29);
    
    return [
      { label: 'This Month', range: { start: firstDayOfThisMonth, end: lastDayOfThisMonth } },
      { label: 'Last Month', range: { start: firstDayOfLastMonth, end: lastDayOfLastMonth } },
      { label: 'Last 7 Days', range: { start: last7Days, end: today } },
      { label: 'Last 30 Days', range: { start: last30Days, end: today } },
    ];
  };
  
  const presetRanges = getPresetRanges();

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
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
    selectedStartDay: {
      backgroundColor: theme.colors.primary,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedEndDay: {
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
    inRangeDay: {
      backgroundColor: `${theme.colors.primary}30`,
    },
    todayText: {
      color: theme.colors.primary,
      fontFamily: 'Inter-Medium',
    },
    emptyCell: {
      width: '14.28%',
      height: 40,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    presetsContainer: {
      marginBottom: 24,
    },
    presetsTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 12,
    },
    presetButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    presetButton: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      padding: 8,
      margin: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    presetButtonText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.text,
    },
    selectionText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 16,
    },
    dateRangeText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: theme.colors.primary,
      marginBottom: 16,
    },
    infoText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
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
  
  // Function to check if a date is in the selected range
  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    
    const date = new Date(currentYear, currentMonthIndex, day);
    return date > startDate && date < endDate;
  };
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonthIndex, day);
    
    const isStart = startDate && 
      date.getDate() === startDate.getDate() && 
      date.getMonth() === startDate.getMonth() && 
      date.getFullYear() === startDate.getFullYear();
    
    const isEnd = endDate && 
      date.getDate() === endDate.getDate() && 
      date.getMonth() === endDate.getMonth() && 
      date.getFullYear() === endDate.getFullYear();
    
    const inRange = isInRange(day);
    
    const today = new Date();
    const isToday = 
      today.getDate() === day && 
      today.getMonth() === currentMonthIndex && 
      today.getFullYear() === currentYear;
    
    calendarCells.push(
      <TouchableOpacity
        key={`day-${day}`}
        style={[
          styles.dayCell,
          inRange ? styles.inRangeDay : null
        ]}
        onPress={() => handleDaySelect(day)}
      >
        <View style={isStart ? styles.selectedStartDay : isEnd ? styles.selectedEndDay : null}>
          <Text
            style={[
              styles.dayText,
              (isStart || isEnd) ? styles.selectedDayText : null,
              isToday && !isStart && !isEnd ? styles.todayText : null,
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
      scrollable
    >
      <View style={styles.container}>
        <View style={styles.presetsContainer}>
          <Text style={styles.presetsTitle}>Quick Selections</Text>
          <View style={styles.presetButtons}>
            {presetRanges.map((preset, index) => (
              <TouchableOpacity
                key={index}
                style={styles.presetButton}
                onPress={() => {
                  setStartDate(preset.range.start);
                  setEndDate(preset.range.end);
                  setSelectionMode('start');
                }}
              >
                <Text style={styles.presetButtonText}>{preset.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {startDate && (
          <Text style={styles.selectionText}>
            {selectionMode === 'start' 
              ? 'Select start date' 
              : 'Select end date'}
          </Text>
        )}
        
        {startDate && endDate && (
          <Text style={styles.dateRangeText}>
            {`${formatDate(startDate)} - ${formatDate(endDate)}`}
          </Text>
        )}
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handlePrevMonth}
          >
            <Text style={styles.monthYearText}>{'<'}</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthYearText}>
            {monthNames[currentMonthIndex]} {currentYear}
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
        
        <Text style={styles.infoText}>
          {selectionMode === 'start' 
            ? 'Tap to select start date' 
            : 'Tap to select end date'}
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Clear"
            variant="outline"
            onPress={handleClearDates}
          />
          <View style={{flexDirection: 'row'}}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={onCancel}
              style={{marginRight: 8}}
            />
            <Button
              title="Apply"
              variant="primary"
              onPress={handleConfirm}
              disabled={!startDate || !endDate}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateRangePicker;