import React from "react";
import { Platform } from "react-native";
import Navigator from "./MainNavigator";
import { SafeAreaView } from "react-navigation";

if (Platform.OS === "android") {
  // removes extra space at top of header on android
  SafeAreaView.setStatusBarHeight(0);
}

export default class App extends React.Component {
  state = {
    favoris: [1, 2]
  };
  updateFavoris = favoris => {
    this.setState({ favoris });
  };
  render() {
    return <Navigator {...this.state} updateFavoris={this.updateFavoris} />;
  }
}
