import React from "react";
<<<<<<< HEAD
import { StyleSheet, Text, View, StatusBar } from "react-native";
=======
import { StyleSheet, Text, View } from "react-native";
>>>>>>> origin
import Navigator from "./MainNavigator";

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
