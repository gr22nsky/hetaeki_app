import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import StyledInput from '../components/StyledInput';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';
import { emailSignup } from '../api/auth';
import { saveTokens } from '../utils/storage';

export default function EmailSignupScreen({ navigation }: any) {
  const [form, setForm] = useState({ email: '', password: '', password2: '', age: '', region: '', subregion: '' });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!form.email || !form.password || !form.password2 || !form.age || !form.region || !form.subregion) {
      Alert.alert('모든 정보를 입력해 주세요.');
      return;
    }
    if (form.password !== form.password2) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      const res = await emailSignup({
        email: form.email,
        password: form.password,
        age: form.age,
        region: form.region,
        subregion: form.subregion,
      });
      await saveTokens(res.access, res.refresh);
      navigation.replace('AppTabs');
    } catch (err) {
      Alert.alert('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이메일 회원가입</Text>
      <StyledInput
        placeholder="이메일"
        value={form.email}
        onChangeText={v => setForm(f => ({ ...f, email: v }))}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <StyledInput
        placeholder="비밀번호"
        value={form.password}
        onChangeText={v => setForm(f => ({ ...f, password: v }))}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      <StyledInput
        placeholder="비밀번호 확인"
        value={form.password2}
        onChangeText={v => setForm(f => ({ ...f, password2: v }))}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      <StyledInput
        placeholder="나이"
        value={form.age}
        onChangeText={v => setForm(f => ({ ...f, age: v }))}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <StyledInput
        placeholder="지역(시/도)"
        value={form.region}
        onChangeText={v => setForm(f => ({ ...f, region: v }))}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <StyledInput
        placeholder="시군구"
        value={form.subregion}
        onChangeText={v => setForm(f => ({ ...f, subregion: v }))}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <RoundedButton title={loading ? '가입 중...' : '회원가입'} onPress={handleSignup} style={styles.button} disabled={loading} />
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