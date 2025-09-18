import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';
import { HapticTab } from './haptic-tab';
import { ThemedText } from './themed-text';

interface NumericKeyboardProps {
  onNumberPress: (number: string) => void;
  onBackspace: () => void;
  showDecimal?: boolean;
  style?: any;
  buttonStyle?: any;
  textStyle?: any;
}

interface NumberButtonProps {
  number: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
}

const NumberButton: React.FC<NumberButtonProps> = ({ number, onPress, style, textStyle }) => (
  <HapticTab style={[styles.numberButton, style]} onPress={onPress}>
    <ThemedText style={[styles.numberText, textStyle]}>{number}</ThemedText>
  </HapticTab>
);

export const NumericKeyboard: React.FC<NumericKeyboardProps> = ({
  onNumberPress,
  onBackspace,
  showDecimal = true,
  style,
  buttonStyle,
  textStyle,
}) => {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.keypad, style]}>
      <View style={styles.keypadRow}>
        <NumberButton number="1" onPress={() => onNumberPress('1')} style={buttonStyle} textStyle={textStyle} />
        <NumberButton number="2" onPress={() => onNumberPress('2')} style={buttonStyle} textStyle={textStyle} />
        <NumberButton number="3" onPress={() => onNumberPress('3')} style={buttonStyle} textStyle={textStyle} />
      </View>
      <View style={styles.keypadRow}>
        <NumberButton number="4" onPress={() => onNumberPress('4')} style={buttonStyle} textStyle={textStyle} />
        <NumberButton number="5" onPress={() => onNumberPress('5')} style={buttonStyle} textStyle={textStyle} />
        <NumberButton number="6" onPress={() => onNumberPress('6')} style={buttonStyle} textStyle={textStyle} />
      </View>
      <View style={styles.keypadRow}>
        <NumberButton number="7" onPress={() => onNumberPress('7')} style={buttonStyle} textStyle={textStyle} />
        <NumberButton number="8" onPress={() => onNumberPress('8')} style={buttonStyle} textStyle={textStyle} />
        <NumberButton number="9" onPress={() => onNumberPress('9')} style={buttonStyle} textStyle={textStyle} />
      </View>
      <View style={styles.keypadRow}>
        {showDecimal && (
          <NumberButton number="." onPress={() => onNumberPress('.')} style={buttonStyle} textStyle={textStyle} />
        )}
        {!showDecimal && <View style={[styles.numberButton, { opacity: 0 }]} />}
        <NumberButton number="0" onPress={() => onNumberPress('0')} style={buttonStyle} textStyle={textStyle} />
        <HapticTab style={[styles.numberButton, buttonStyle]} onPress={onBackspace}>
          <Feather name="delete" size={24} color={textColor} />
        </HapticTab>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    gap: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 12,
  },
  numberButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default NumericKeyboard;
