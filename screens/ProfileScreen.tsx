import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { clearTokens } from '../utils/storage';
import { getProfile, updateProfile } from '../api/auth';
import { colors } from '../constants/colors';
import RoundedButton from '../components/RoundedButton';
import StyledInput from '../components/StyledInput';
import Card from '../components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }: any) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ age: '', region: '', subregion: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setForm({
          age: data.age ? String(data.age) : '',
          region: data.region || '',
          subregion: data.subregion || '',
        });
      } catch (e) {
        Alert.alert('프로필 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await clearTokens();
    navigation.replace('Login');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = await updateProfile({
        age: form.age ? Number(form.age) : undefined,
        region: form.region,
        subregion: form.subregion,
      });
      setProfile(data);
      setEdit(false);
    } catch (e) {
      Alert.alert('프로필 수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <View style={styles.loadingArea}><ActivityIndicator color={colors.primary} /></View>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>프로필</Text>
      <View style={styles.centerArea}>
        <Card style={styles.card}>
        {edit ? (
          <>
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
              <RoundedButton title={saving ? '저장 중...' : '저장'} onPress={handleSave} disabled={saving} style={styles.button} />
              <RoundedButton title="취소" onPress={() => setEdit(false)} color={colors.gray} style={styles.button} />
          </>
        ) : (
          <>
              <Text style={styles.infoLabel}>이메일</Text>
              <Text style={styles.infoValue}>{profile?.email}</Text>
              <View style={styles.infoDivider} />
              <Text style={styles.infoLabel}>나이</Text>
              <Text style={styles.infoValue}>{profile?.age}</Text>
              <View style={styles.infoDivider} />
              <Text style={styles.infoLabel}>지역</Text>
              <Text style={styles.infoValue}>{profile?.region}</Text>
              <View style={styles.infoDivider} />
              <Text style={styles.infoLabel}>시군구</Text>
              <Text style={styles.infoValue}>{profile?.subregion}</Text>
              <RoundedButton title="프로필 수정" onPress={() => setEdit(true)} color={colors.gray} style={[styles.button, { marginTop: 18 }]} />
          </>
        )}
      </Card>
        <RoundedButton title="로그아웃" onPress={handleLogout} color={colors.danger} style={[styles.button, { marginTop: 18 }]} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
    fontFamily: 'base_font',
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 18,
    marginVertical: 0,
  },
  input: {
    width: '100%',
    maxWidth: 340,
    minHeight: 54,
    fontSize: 17,
    marginBottom: 16,
    backgroundColor: '#f7f7f7',
    borderColor: colors.primary,
    borderWidth: 1.2,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  button: {
    width: '100%',
    maxWidth: 340,
    height: 48,
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 0,
    backgroundColor: colors.primary,
  },
  infoLabel: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 2,
    alignSelf: 'flex-start',
    fontFamily: 'base_font',
  },
  infoValue: {
    fontSize: 17,
    color: colors.text,
    marginBottom: 2,
    alignSelf: 'flex-start',
    fontFamily: 'base_font',
  },
  infoDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
}); 