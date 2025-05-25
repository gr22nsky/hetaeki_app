import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>혜택이</Text>
      <Text style={styles.subtitle}>나에게 맞는 복지 혜택, 혜택이가 찾아드려요!</Text>
      <Button title="시작하기" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#3B82F6', marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#111827', marginBottom: 32 },
}); 