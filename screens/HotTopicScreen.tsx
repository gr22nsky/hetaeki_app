import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Modal, Pressable, TouchableOpacity } from 'react-native';
import AdRewardModal from '../components/AdRewardModal';
import { getHotTopics } from '../api/hottopic';
import { colors } from '../constants/colors';
import RoundedButton from '../components/RoundedButton';
import Card from '../components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

const ageGroups = ['청소년', '청년', '장년', '노년'];

const hotTopicGuideText = `같은 연령대의 다른 사용자들이 어떤 복지 정책에 관심을 가지고 있는지 확인해 보세요. 아래 '핫토픽 보기' 버튼을 눌러 인기 질문을 확인할 수 있습니다.`;

export default function HotTopicScreen() {
  const [ageGroup, setAgeGroup] = useState(ageGroups[1]);
  const [topics, setTopics] = useState<string[]>([]);
  const [adVisible, setAdVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowTopics = async () => {
    if (!unlocked) {
      setAdVisible(true);
      return;
    }
    setLoading(true);
    setTopics([]);
    try {
      const data = await getHotTopics(ageGroup);
      setTopics(Object.values(data.topics));
    } catch (e) {
      Alert.alert('핫토픽을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReward = () => {
    setUnlocked(true);
    setAdVisible(false);
    handleShowTopics();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>연령별 인기 질문 TOP5</Text>

      <View style={styles.sectionSpacing}>
        <Text style={styles.guideText}>{hotTopicGuideText}</Text>
      </View>

      <View style={styles.sectionSpacing}>
        <View style={styles.cardShadow}>
          <View style={styles.resultCard}>
            {loading ? (
              <ActivityIndicator style={{ marginVertical: 32 }} color={colors.primary} />
            ) : topics.length === 0 ? (
              <Text style={styles.emptyText}>아직 인기 질문이 없습니다.{"\n"}'핫토픽 보기' 버튼을 눌러주세요.</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.topicListScrollContent} showsVerticalScrollIndicator={false}>
                {topics.map((topic, idx) => (
                  <React.Fragment key={idx}>
                    <View style={styles.topicRow}>
                      <Text style={styles.topicRank}>{idx + 1}위</Text>
                      <Text style={styles.topicText}>{topic}</Text>
                    </View>
                    {idx !== topics.length - 1 && <View style={{height: 16}} />}
                  </React.Fragment>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>

      <View style={styles.sectionSpacing}>
        <View style={styles.cardShadow}>
          <View style={styles.selectCard}>
            <Text style={styles.cardLabel}>연령대 선택</Text>
            <Pressable
              style={styles.ageSelectButton}
              onPress={() => setModalVisible(true)}
              android_ripple={{ color: colors.gray }}
            >
              <Text style={styles.ageSelectButtonText}>{ageGroup}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.buttonArea}>
        <RoundedButton
          title={loading ? '불러오는 중...' : '핫토픽 보기'}
          onPress={handleShowTopics}
          style={styles.button}
          disabled={loading}
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>연령대를 선택하세요</Text>
            {ageGroups.map((group) => (
              <TouchableOpacity
                key={group}
                style={[styles.modalItem, ageGroup === group && styles.modalItemSelected]}
                onPress={() => {
                  setAgeGroup(group);
                  setModalVisible(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.modalItemText, ageGroup === group && styles.modalItemTextSelected]}>{group}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <AdRewardModal
        visible={adVisible}
        onClose={() => setAdVisible(false)}
        onReward={handleReward}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 20,
    fontFamily: 'base_font',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  selectCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    minHeight: 70,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'base_font',
  },
  ageSelectButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    marginTop: 2,
  },
  ageSelectButtonText: {
    fontSize: 17,
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily: 'base_font',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 18,
  },
  modalItem: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  modalItemSelected: {
    backgroundColor: colors.primary,
  },
  modalItemText: {
    fontSize: 17,
    color: colors.text,
    fontWeight: 'bold',
  },
  modalItemTextSelected: {
    color: '#fff',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    minHeight: 120,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'base_font',
  },
  topicListScrollContent: {
    width: '100%',
    paddingVertical: 4,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 0,
  },
  topicRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
    fontFamily: 'base_font',
  },
  topicText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'base_font',
  },
  buttonArea: {
    marginTop: 0,
    marginBottom: 8,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 400,
    height: 48,
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: colors.primary,
  },
  guideText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'base_font',
  },
  sectionSpacing: {
    marginBottom: 25,
  },
}); 