import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { saveTokens } from '../utils/storage';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';
import StyledInput from '../components/StyledInput';
import Card from '../components/Card';
import KakaoLogin from '@react-native-seoul/kakao-login';
import { kakaoLogin } from '../api/auth';
import { emailLogin } from '../api/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [kakaoToken, setKakaoToken] = useState<string | null>(null);
  const [showExtraModal, setShowExtraModal] = useState(false);
  const [extra, setExtra] = useState({ age: '', region: '', subregion: '' });
  const [loading, setLoading] = useState(false);
  console.log('KakaoLogin:', KakaoLogin);
  // 카카오 로그인
  const handleKakaoLogin = async () => {
    setLoading(true);
    try {
      const result = await KakaoLogin.login();
      Alert.alert('로그인 성공', JSON.stringify(result));
      const accessToken = result.accessToken;
      // 2. 백엔드에 accessToken 전달
      const res = await kakaoLogin({ access_token: accessToken });
      // 3. 기존 유저라면 바로 토큰 저장 및 이동
      await saveTokens(res.access, res.refresh);
      navigation.replace('AppTabs');
    } catch (e) {
      const err = e as any;
      Alert.alert('로그인 실패', err?.message || JSON.stringify(err));
      // 신규 유저라면 추가 정보 입력 필요
      let accessToken = null;
      if (err?.config && err?.config.data) {
        try {
          const data = typeof err.config.data === 'string' ? JSON.parse(err.config.data) : err.config.data;
          accessToken = data?.access_token || null;
        } catch {
          accessToken = null;
        }
      }
      setKakaoToken(accessToken);
      setShowExtraModal(true);
    } finally {
      setLoading(false);
    }
  };

  // 추가 정보 입력 후 회원가입
  const handleKakaoExtraSubmit = async () => {
    if (!extra.age || !extra.region || !extra.subregion) {
      Alert.alert('모든 정보를 입력해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await kakaoLogin({
        access_token: kakaoToken!,
        age: extra.age,
        region: extra.region,
        subregion: extra.subregion,
      });
      await saveTokens(res.access, res.refresh);
      setShowExtraModal(false);
      navigation.replace('AppTabs');
    } catch (err) {
      Alert.alert('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

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

      <RoundedButton
        title="카카오로 시작하기"
        color={colors.yellow}
        onPress={handleKakaoLogin}
        style={styles.buttonMargin}
        disabled={loading}
      />

      <Text style={styles.or}>또는</Text>

      <RoundedButton title="이메일로 로그인" onPress={() => navigation.navigate('EmailLogin')} style={styles.buttonMargin} />
      <RoundedButton title="회원가입" onPress={() => navigation.navigate('EmailSignup')} color={colors.gray} />

      <Modal visible={showExtraModal} transparent animationType="fade" onRequestClose={() => setShowExtraModal(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <Card style={{ width: '90%', maxWidth: 400, alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24, borderRadius: 18, marginVertical: 0 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, marginBottom: 16, fontFamily: 'base_font', textAlign: 'center' }}>추가 정보 입력</Text>
            <Text style={{ fontSize: 15, color: colors.text, marginBottom: 18, fontFamily: 'base_font', textAlign: 'center' }}>
              더 정확한 맞춤 혜택을 위해 아래 정보를 입력해 주세요.
            </Text>
            <StyledInput
              placeholder="나이"
              value={extra.age}
              onChangeText={v => setExtra(e => ({ ...e, age: v }))}
              keyboardType="numeric"
              style={{ width: '100%', maxWidth: 340, minHeight: 54, marginBottom: 16, backgroundColor: '#f7f7f7', borderColor: colors.primary, borderWidth: 1.2, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14 }}
              placeholderTextColor="#888"
            />
            <StyledInput
              placeholder="지역(시/도)"
              value={extra.region}
              onChangeText={v => setExtra(e => ({ ...e, region: v }))}
              style={{ width: '100%', maxWidth: 340, minHeight: 54, marginBottom: 16, backgroundColor: '#f7f7f7', borderColor: colors.primary, borderWidth: 1.2, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14 }}
              placeholderTextColor="#888"
            />
            <StyledInput
              placeholder="시군구"
              value={extra.subregion}
              onChangeText={v => setExtra(e => ({ ...e, subregion: v }))}
              style={{ width: '100%', maxWidth: 340, minHeight: 54, marginBottom: 24, backgroundColor: '#f7f7f7', borderColor: colors.primary, borderWidth: 1.2, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14 }}
              placeholderTextColor="#888"
            />
            <RoundedButton title={loading ? '가입 중...' : '확인'} onPress={handleKakaoExtraSubmit} style={{ width: '100%', maxWidth: 340, height: 48, borderRadius: 12, marginBottom: 10, marginTop: 0, backgroundColor: colors.primary }} disabled={loading} />
            <RoundedButton title="취소" onPress={() => setShowExtraModal(false)} color={colors.gray} style={{ width: '100%', maxWidth: 340, height: 48, borderRadius: 12, marginBottom: 0, marginTop: 0, backgroundColor: colors.gray }} />
          </Card>
        </KeyboardAvoidingView>
      </Modal>
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