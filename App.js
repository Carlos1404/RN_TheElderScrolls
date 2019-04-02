import React from "react";
import { Platform } from "react-native";
import Navigator from "./MainNavigator";
import { SafeAreaView } from "react-navigation";

if (Platform.OS === "android") {
  // removes extra space at top of header on android
  SafeAreaView.setStatusBarHeight(0);
}

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}
