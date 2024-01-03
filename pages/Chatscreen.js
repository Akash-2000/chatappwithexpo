import React, { useEffect, useState,useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { io } from 'socket.io-client';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typername,settypername] = useState(null)

    const socketRef = useRef(null)
    let activityTimer = useRef(null)

  useEffect(()=>{
        socketRef.current = io('ws://192.168.1.20:3500')
        

        // socketRef.current.on('connection', () => {
        //     console.log('Connected to server');
        //   });
          
          console.log((socketRef.current))

          socketRef.current.on('message', (data) => {
            setMessages(prevMessages => [...prevMessages, { text: data, sender: 'user' }]);
            console.log('Received message:', data);
          });


          socketRef.current.on("activity",(name)=>{
            settypername(name)
            clearTimeout(activityTimer)
            activityTimer = setTimeout(()=>{
                settypername(null)
            },2000)
          })

          // Disconnect when the component unmounts
          return () => {
            if (socketRef.current) {
              socketRef.current.on('disconnect');
            }
          };
  },[])

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      if (socketRef.current) {
        socketRef.current.emit('message', newMessage);
       
      }
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === 'user' ? styles.userMessage : styles.otherMessage}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      {
            typername !=null ?        <Text>{typername}is typing</Text>:""
        }

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => {setNewMessage(text)

            socketRef.current.emit("activity",socketRef.current.id.substring(0,5))
        }}
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    maxWidth: '70%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    maxWidth: '70%',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
  },
});

export default ChatScreen;
