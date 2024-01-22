import React, { useEffect, useState } from "react";
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
import axios from "axios";

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

const Item = ({ title, navigation, latestMessage }) => (
  <View style={styles.item}>
    <TouchableOpacity
    // onPress={() =>
    //   navigation.navigate("chat", {
    //     name: state.username,
    //     room: createdId.data.data,
    //     id: sender,
    //     reciverId: reciver,
    //   })
    // }
    >
      <Text style={styles.title}>{title}</Text>

      <Text>{latestMessage}</Text>
    </TouchableOpacity>
  </View>
);

const RoomList = ({ navigation, route }) => {
  const state = useSelector((state) => state.user);
  console.log(state);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nodata, setnodata] = useState(false);

  async function getMessagae() {
    try {
      const body = {
        id: state.userid,
      };
      const response = await axios.post(
        "http://192.168.1.30:3500/api/msg/getMessages",
        body
      );
      console.log("Data from the user", response.data.data);
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      console.log(sortedData);
      if (response.data.data === null) {
        setnodata(true);
      } else {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    getMessagae();
  }, [socketRef]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (nodata) {
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
        <Text>No data..</Text>
      </SafeAreaView>
    );
  }

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
      {console.log(data)}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            title={item.Roomname}
            name={state.username}
            navigation={navigation}
            latestMessage={item.latestmessage}
          />
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
