import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Button({ children, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    margin: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
