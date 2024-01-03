import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/button";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

import React, { useEffect, useState } from "react";

export default function RoomCreation({ navigation }) {
  const [credentials, setCredentials] = useState({
    room: "",
    username: "",
  });

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("ws://192.168.1.18:3500");

    socketRef.current.on("message", (data) => {
      console.log("messae event is triggered");
    });
  });

  const handleInputChange = (field, value) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };
  const onLogin = async () => {
    console.log(credentials.email, credentials.password);
    const body = {
      email: credentials.email,
      password: credentials.password,
    };
    console.log(body);
    try {
      const response = await axios.post(
        "http://192.168.1.18:3500/api/auth/login",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      console.log("Response:", response.status);
      if (response.status == 200) {
        navigation.navigate("chatmain");
      }

      // Handle successful response here
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error here
    }
  };

  const checkBeforeNavigate = () => {
    if (credentials.room.length > 0 && credentials.username.length > 0) {
      navigation.navigate("chat", {
        name: credentials.username,
        room: credentials.room,
      });
    } else {
      Alert.alert("plese fill the values!!");
    }
  };

  const moveToRegister = () => {
    navigation.navigate("register");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>JOIN ROOM</Text>
        <Input
          label="room"
          value={credentials.room}
          placeholder="room"
          onChangeText={(value) => handleInputChange("room", value)}
        />
        <Input
          label="username"
          placeholder="username"
          value={credentials.username}
          secureTextEntry
          onChangeText={(value) => handleInputChange("username", value)}
        />

        {/* <Button children={"to Register screen"} onPress={moveToRegister} /> */}
        <Button children={"Join Room"} onPress={checkBeforeNavigate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
