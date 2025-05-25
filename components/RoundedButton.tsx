import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

interface RoundedButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  color?: string;
  style?: ViewStyle | ViewStyle[];
  [key: string]: any; // Allow other props like `disabled`
}

export default function RoundedButton({ title, onPress, color = colors.primary, style, ...props }: RoundedButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }, style]} onPress={onPress} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'base_font',
  },
}); 