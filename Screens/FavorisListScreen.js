import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";

class FavorisListScreen extends Component {
  state = { favorites: [] };
  _storeFav = async () => {
    try {
      await AsyncStorage.setItem("FAVORITE", JSON.stringify(this.state.favorites));
    } catch (error) {
      console.warn(error);
    }
  };

  _retrieveData = async () => {
    try {
      const favorites = await AsyncStorage.getItem("FAVORITE");
      if (favorites !== null) {
        this.setState({ favorites });
        console.log("favlist ", favorites);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }

  render() {
    console.log(this.state);
    return (
      <View>
        <Text> In Fav </Text>
      </View>
    );
  }
}

export default withNavigation(FavorisListScreen);
