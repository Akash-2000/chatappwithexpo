import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import axios from "axios";
import Input from "../components/Input";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setUsername } from "../redux/userSlice";
import Button from "../components/button";

export default function Login({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const state = useSelector((state) => state.user);
  console.log(state);

  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const onLogin = async () => {
    console.log(credentials.email, credentials.password);
    try {
      const body = {
        email: credentials.email,
        password: credentials.password,
      };
      const response = await axios.post(
        "http://192.168.1.17:3500/api/auth/login",
        body
      );
      if (response.status == 200) {
        console.log(response.data.data._id);
        dispatch(setUser(response.data.data._id));
        dispatch(setUsername(response.data.data.name));
        navigation.navigate("Home");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const moveToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
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

      <Button children={"go to Regsiter"} onPress={moveToRegister} />
      <Button children={"Login"} onPress={onLogin} />
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
