import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { saveTokens } from '../utils/storage';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';
import StyledInput from '../components/StyledInput';
import Card from '../components/Card';
import { emailLogin } from '../api/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await emailLogin(email, password);
      await saveTokens(res.access, res.refresh);
      navigation.replace('AppTabs');
    } catch (err) {
      Alert.alert('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>혜택이</Text>
      <Text style={styles.subtitle}>나에게 맞는 복지 혜택, 혜택이가 찾아드려요!</Text>
      <View style={styles.logoArea}>
        <Image source={require('../assets/hetaeki_face.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <RoundedButton title="로그인" onPress={() => navigation.navigate('EmailLogin')} style={styles.buttonMargin} />
      <RoundedButton title="회원가입" onPress={() => navigation.navigate('EmailSignup')} color={colors.gray} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 24 },
  logoArea: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.primary, marginBottom: 8, fontFamily: 'base_font' },
  subtitle: { fontSize: 18, color: colors.text, marginBottom: 48, fontFamily: 'base_font' },
  or: { marginVertical: 24, color: colors.text, fontSize: 16, fontFamily: 'base_font' },
  input: {
    maxWidth: 280,
  },
  buttonMargin: {
    marginBottom: 16,
    width: '100%',
    maxWidth: 280,
  }
}); 