import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import Input from "../components/Input";
import Button from "../components/button";
import axios from "axios";

export default function Register({ navigation }) {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const onRegsiter = async () => {
    console.log(credentials.username, credentials.email, credentials.password);
    try {
      const body = {
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
      };
      const response = await axios.post(
        "http://192.168.1.26:3500/api/auth/register",
        body
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const moveToLogin = async () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Input
        label="username"
        placeholder="username"
        onChangeText={(value) => handleInputChange("username", value)}
      />
      <Input
        label="email"
        placeholder="email"
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <Input
        label="password"
        placeholder="password"
        secureTextEntry
        onChangeText={(value) => handleInputChange("password", value)}
      />

      <Button children={"go to Login"} onPress={moveToLogin} />

      <Button children={"Register"} onPress={onRegsiter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
