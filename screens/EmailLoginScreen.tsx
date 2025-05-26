import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import StyledInput from '../components/StyledInput';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';
import { emailLogin } from '../api/auth';
import { saveTokens } from '../utils/storage';

export default function EmailLoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      <Text style={styles.title}>로그인</Text>
      <StyledInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <StyledInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      <RoundedButton title={loading ? '로그인 중...' : '로그인'} onPress={handleLogin} style={styles.button} disabled={loading} />
      <RoundedButton title="돌아가기" onPress={() => navigation.navigate('Login')} color={colors.gray} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 24, fontFamily: 'base_font' },
  input: { width: '100%', maxWidth: 340, minHeight: 54, fontSize: 17, marginBottom: 16, backgroundColor: '#f7f7f7', borderColor: colors.primary, borderWidth: 1.2, color: colors.text, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14 },
  button: { width: '100%', maxWidth: 340, height: 48, borderRadius: 12, marginBottom: 10, marginTop: 0 },
}); 