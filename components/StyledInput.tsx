import React from 'react';
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

interface StyledInputProps extends TextInputProps {
  style?: ViewStyle | ViewStyle[];
  placeholderTextColor?: string;
}

export default function StyledInput(props: StyledInputProps) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor={props.placeholderTextColor || colors.gray}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    maxWidth: 280, // 로그인/회원가입 화면 기준
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8, // 간격 조정
    backgroundColor: colors.background,
    fontSize: 16,
    color: colors.text,
  },
}); 