// import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
// import Input from "../components/Input";
// import Button from "../components/button";
// import axios from "axios";
// import { useRef } from "react";
// import { io } from "socket.io-client";

// import React, { useEffect, useState } from "react";

// export default function RoomCreation({ navigation }) {
//   const [credentials, setCredentials] = useState({
//     room: "",
//     username: "",
//   });

//   const socketRef = useRef(null);

//   //   useEffect(() => {
//   //     socketRef.current = io("ws://192.168.1.32:3500");

//   //     socketRef.current.on("message", (data) => {
//   //       console.log("messae event is triggered");
//   //     });
//   //   });

//   const handleInputChange = (field, value) => {
//     setCredentials({
//       ...credentials,
//       [field]: value,
//     });
//   };
//   const onLogin = async () => {
//     console.log(credentials.email, credentials.password);
//     const body = {
//       email: credentials.email,
//       password: credentials.password,
//     };
//     console.log(body);
//     try {
//       const response = await axios.post(
//         "http://192.168.1.32:3500/api/auth/login",
//         body,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Response:", response.data);
//       console.log("Response:", response.status);
//       if (response.status == 200) {
//         navigation.navigate("chatmain");
//       }

//       // Handle successful response here
//     } catch (error) {
//       console.error("Error:", error.message);
//       // Handle error here
//     }
//   };

//   const checkBeforeNavigate = () => {
//     if (credentials.room.length > 0 && credentials.username.length > 0) {
//       navigation.navigate("chat", {
//         name: credentials.username,
//         room: credentials.room,
//       });
//     } else {
//       Alert.alert("plese fill the values!!");
//     }
//   };

//   const moveToRegister = () => {
//     navigation.navigate("register");
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text>JOIN ROOM</Text>
//         <Input
//           label="room"
//           value={credentials.room}
//           placeholder="room"
//           onChangeText={(value) => handleInputChange("room", value)}
//         />
//         <Input
//           label="username"
//           placeholder="username"
//           value={credentials.username}
//           secureTextEntry
//           onChangeText={(value) => handleInputChange("username", value)}
//         />

//         {/* <Button children={"to Register screen"} onPress={moveToRegister} /> */}
//         <Button children={"Join Room"} onPress={checkBeforeNavigate} />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center",
//   },
// });

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const DATA = [
  {
    _id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    name: "First Item",
  },
  {
    _id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    name: "First Item",
  },
  {
    _id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    name: "First Item",
  },
];

const Item = ({ title, id, senderId, onNavigate }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => onNavigate(senderId, id)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default function RoomCreation({ navigation }) {
  const [datas, setData] = useState(DATA);

  const state = useSelector((state) => state.user);
  console.log(state);
  const getAllusers = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.32:3500/api/auth/getAll"
      );

      if (response.status == 200) {
        console.log("useList", response.data);
        const filteredData = response.data.data.filter(
          (e) => e._id !== state.userid
        );
        console.log(filteredData);
        setData(filteredData);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNavigate = async (sender, reciver) => {
    try {
      const body = {
        senderId: sender,
        reciverId: reciver,
      };
      const createdId = await axios.post(
        "http://192.168.1.32:3500/api/room/createRoom",
        body
      );

      console.log("Hello", createdId.data);
      navigation.navigate("chat", {
        name: state.username,
        room: createdId.data.data,
        id: sender,
        reciverId: reciver,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={datas}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            id={item._id}
            senderId={state.userid}
            navigation={navigation}
            name={item.name}
            onNavigate={onNavigate}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
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
});
