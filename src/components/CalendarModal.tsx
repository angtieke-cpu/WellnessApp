import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
};

const CalendarModal: React.FC<Props> = ({ open, onClose, onSelect }) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Calendar
            onDayPress={day => {
              onSelect(day.dateString);
              onClose();
            }}
            markedDates={{}}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  closeBtn: {
    width: '100%',
    padding: 12,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#E8A6C9',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});
