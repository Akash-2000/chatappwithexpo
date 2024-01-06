import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatScreen from "./pages/Chatscreen";
import RoomCreation from "./pages/RoomCreation";
import RoomList from "./pages/RoomList";
import Register from "./pages/Register";
import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { Provider } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={RoomList} />
            <Stack.Screen name="create" component={RoomCreation} />
            <Stack.Screen name="chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
