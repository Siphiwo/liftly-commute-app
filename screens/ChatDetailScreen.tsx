import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Send, ArrowLeft } from 'lucide-react-native';

const initialMessages = [
  { id: '1', text: 'Hey! I saw your profile and we work nearby', sender: 'other', time: '9:15 AM' },
  { id: '2', text: 'Would be great to carpool together!', sender: 'other', time: '9:16 AM' },
  { id: '3', text: 'Hi! That sounds great. What time do you usually leave?', sender: 'me', time: '9:30 AM' },
  { id: '4', text: 'I usually leave around 7:30 AM', sender: 'other', time: '9:32 AM' },
  { id: '5', text: 'Perfect! That works for me too', sender: 'me', time: '9:35 AM' },
  { id: '6', text: 'Great! Where do you live exactly?', sender: 'other', time: '9:36 AM' },
  { id: '7', text: 'I live near the shopping center on Main Street', sender: 'me', time: '9:40 AM' },
  { id: '8', text: 'Oh perfect! I pass by there every morning', sender: 'other', time: '9:42 AM' },
  { id: '9', text: 'I can pick you up from there', sender: 'other', time: '9:42 AM' },
  { id: '10', text: 'That would be amazing! Thank you', sender: 'me', time: '9:45 AM' },
  { id: '11', text: 'No problem! Happy to help save on gas costs', sender: 'other', time: '9:46 AM' },
  { id: '12', text: 'Should we split the costs 50/50?', sender: 'me', time: '9:50 AM' },
  { id: '13', text: 'Yes that sounds fair to me', sender: 'other', time: '9:52 AM' },
  { id: '14', text: 'When do you want to start?', sender: 'other', time: '9:53 AM' },
  { id: '15', text: 'How about tomorrow morning?', sender: 'me', time: '10:00 AM' },
  { id: '16', text: 'Perfect! See you at 7:30 AM tomorrow', sender: 'other', time: '10:02 AM' },
];

export default function ChatDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { chat } = route.params as any;
  
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }: any) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={[styles.messageText, item.sender === 'me' ? styles.myMessageText : styles.otherMessageText]}>
        {item.text}
      </Text>
      <Text style={[styles.messageTime, item.sender === 'me' ? styles.myMessageTime : styles.otherMessageTime]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{chat?.name?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.headerName}>{chat?.name || 'User'}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={scrollToBottom}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  messagesList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  messageContainer: {
    maxWidth: '75%',
    marginBottom: 15,
    padding: 12,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
