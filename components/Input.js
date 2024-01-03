import React from "react";
import { SafeAreaView, TextInput, View, Text } from "react-native";

const styles = {
  inputStyle: {
    color: "#000",
    fontSize: 18,
    width: 300,
    borderWidth: 1,
    padding: 10,
    lineHeight: 23,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },

  containerStyle: {
    height: 40,
    alignitems: "center",
    margin: 10,
  },
};

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <SafeAreaView>
      <View style={containerStyle}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </SafeAreaView>
  );
};

export default Input;
