import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, FlatList, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import RoundedButton from '../components/RoundedButton';
import { colors } from '../constants/colors';
import StyledInput from '../components/StyledInput';
import MessageBubble from '../components/MessageBubble';
import AdRewardModal from '../components/AdRewardModal';
import { postQuestion } from '../api/queries';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function MainScreen({ navigation }: any) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [adVisible, setAdVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  const handleAsk = async () => {
    if (!unlocked) {
      setAdVisible(true);
      return;
    }

    if (!question.trim()) {
      Alert.alert('질문을 입력해 주세요.');
      return;
    }
    setLoading(true);
    setMessages(prevMessages => [...prevMessages, { text: question, sender: 'user' }]);
    setQuestion('');
    try {
      const data = await postQuestion(question);
      setMessages(prevMessages => [...prevMessages, { text: data.answer, sender: 'bot' }]);
      setUnlocked(false);
    } catch (e) {
      Alert.alert('답변을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleReward = () => {
    setUnlocked(true);
    setAdVisible(false);
    if (question.trim()) handleAsk();
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble text={item.text} sender={item.sender} />
  );

  const usageGuideText = `\n안녕하세요! 혜택이는 AI 기반 복지 정보 챗봇입니다.\n\n어떤 질문을 할까요?\n\n*   나이, 지역, 상황(예: 전주에 사는 25살 청년)을 함께 알려주시면 더 정확한 복지 혜택 정보를 얻을 수 있습니다.\n*   궁금한 정책 내용이나 신청 방법을 구체적으로 질문해 보세요.\n*   예시: '서울시 청년 정책이 뭐가 있는지 알려줘', '전주시 노인 복지 혜택 알려줘'`;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>혜택이에게 물어보기</Text>
          {messages.length > 0 && (
            <Text style={styles.exitButton} onPress={() => setMessages([])}>나가기</Text>
          )}
        </View>

        {messages.length === 0 ? (
          <ScrollView style={styles.usageGuideContainer}>
            <Text style={styles.guideTitle}>혜택이 사용법</Text>
            <Text style={styles.guideText}>{usageGuideText}</Text>

        <View style={styles.logoArea}>
          <Image source={require('../assets/hetaeki_image.png')} style={styles.logo} resizeMode="contain" />
        </View>
          </ScrollView>
        ) : (
          <>
            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item, index) => index.toString()}
              style={styles.messageList}
              contentContainerStyle={styles.messageListContent}
            />
          </>
        )}

        {loading && <ActivityIndicator style={{ marginBottom: 8 }} color={colors.primary} />}

      </SafeAreaView>

      <KeyboardAvoidingView
        style={styles.inputAreaContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.inputArea}>
          <StyledInput
            placeholder="복지 혜택에 대해 무엇이든 물어보세요. 예) 지금 서울에 살고있는데 집을 구하고싶어 도움받을수있는 정책이 있을까?"
            value={question}
            onChangeText={setQuestion}
            multiline
            style={styles.input}
            placeholderTextColor="#666"
          />
          <RoundedButton title="전송" onPress={handleAsk} style={styles.sendButton} />
        </View>
      </KeyboardAvoidingView>

      <AdRewardModal
        visible={adVisible}
        onClose={() => setAdVisible(false)}
        onReward={handleReward}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerRow: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 35,
    paddingHorizontal: 16,
    minHeight: 40,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'base_font',
  },
  usageGuideContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'base_font',
  },
  guideText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    fontFamily: 'base_font',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  messageListContent: {
    paddingBottom: 8,
  },
  inputAreaContainer: {
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: -30,
  },
  input: {
    flex: 1,
    minHeight: 80,
    maxHeight: 180,
    marginRight: 8,
    textAlignVertical: 'top',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.gray,
    borderRadius: 20,
    fontSize: 16,
    fontFamily: 'base_font',
  },
  sendButton: {
    marginTop: 0,
    paddingHorizontal: 16,
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 12,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 60,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  exitButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
}); 