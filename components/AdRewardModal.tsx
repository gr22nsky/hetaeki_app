import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
// import { showRewardedAd } from '../utils/showRewardedAd';

export default function AdRewardModal({ visible, onClose, onReward }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>광고 시청</Text>
          <Text style={styles.desc}>질문/핫토픽을 보려면 광고를 시청해야 합니다.</Text>
          {/* <Button title="광고 시청" onPress={() => showRewardedAd(onReward)} /> */}
          <Button title="광고 시청(테스트)" onPress={onReward} />
          <Button title="닫기" onPress={onClose} color="#888" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: 300, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#3B82F6' },
  desc: { fontSize: 15, color: '#111827', marginBottom: 24, textAlign: 'center' },
}); 