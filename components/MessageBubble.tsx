import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { colors } from '../constants/colors';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'bot';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  const isUser = sender === 'user';

  // Markdown styles adapted for different bubble colors
  const userMarkdownStyles: any = {
    body: { fontSize: 15, color: '#FFFFFF', lineHeight: 22 }, // White text for primary background
    link: { color: '#FFFFFF', textDecorationLine: 'underline' },
    // Add other markdown styles for user bubble if needed
  };

  const botMarkdownStyles: any = {
    body: { fontSize: 15, color: colors.text, lineHeight: 22 }, // Default text color for bot bubble
    link: { color: colors.primary, textDecorationLine: 'underline' },
    // Add other markdown styles for bot bubble if needed
  };

  // text가 비어있을 때 안내 메시지 출력
  const displayText = text && text.trim() ? text : '아직 답변이 준비되지 않았어요.';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        {/* 마크다운 파서 대신 Text로 임시 출력 */}
        <Text>{displayText}</Text>
        {/* 아래는 기존 마크다운 파서, 필요시 주석 해제 */}
        {/* <Markdown style={isUser ? userMarkdownStyles : botMarkdownStyles}>{displayText}</Markdown> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%', // Limit bubble width
    marginVertical: 4,
  },
  userContainer: {
    alignSelf: 'flex-end', // Align user messages to the right
    marginRight: 8, // Adjust margin
  },
  botContainer: {
    alignSelf: 'flex-start', // Align bot messages to the left
    marginLeft: 8, // Adjust margin
  },
  bubble: {
    paddingVertical: 10, // Adjust vertical padding
    paddingHorizontal: 12, // Adjust horizontal padding
    borderRadius: 20, // Make bubbles more rounded
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 1.5,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  botBubble: {
    backgroundColor: colors.gray, // Use gray for bot bubble background
  },
});

export default MessageBubble; 