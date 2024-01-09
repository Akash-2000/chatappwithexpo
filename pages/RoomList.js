import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import socketRef from "../utils/socket";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title, navigation }) => (
  <View style={styles.item}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("chat");
      }}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const RoomList = ({ navigation }) => {
  const state = useSelector((state) => state.user);
  console.log(state);
  useEffect(() => {
    socketRef.on("getRoomList", (data) => {
      console.log("changes on the getRoomList");
      console.log(data);
      Alert.alert("your chat is going to refresh!");
    });
  }, [socketRef]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("create")}
        >
          <Text>Create chat</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "90%",
    borderRadius: 10,
  },
  buttonView: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoomList;
