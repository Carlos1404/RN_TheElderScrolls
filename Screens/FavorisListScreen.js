import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { BASE_URL } from "../Constants";
import { Styles } from "../styles";
import axios from "axios";

class FavorisListScreen extends Component {
  state = { favorites: [], favoriteCards: [] };
  _storeFav = async () => {
    try {
      await AsyncStorage.setItem(
        "FAVORITE",
        JSON.stringify(this.state.favorites)
      );
    } catch (error) {
      console.warn(error);
    }
  };

  _retrieveData = async () => {
    try {
      var favorites = await AsyncStorage.getItem("FAVORITE");
      favorites = JSON.parse(favorites);
      if (favorites !== null) {
        favorites.map(fav => this.fetchTheData(fav));
      }
    } catch (error) {
      console.log(error);
    }
  };

  clickFavorite = idCard => {
    console.log("pas encore implémenté");
  };

  fetchTheData = idCard => {
    console.log(`${BASE_URL}cards/${idCard}`);
    axios
      .get(`${BASE_URL}cards/${idCard}`)
      .then(response => {
        (favoriteCards = this.state.favorites),
          favoriteCards.push(response.data.card),
          this.setState(
            { favoriteCards: favoriteCards, isLoading: false },
            () => console.log(this.state.favoriteCards.length)
          );
      })
      .catch(err => console.warn(err));
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({ favorites: [], favoriteCards: [] }, () =>
        this._retrieveData()
      );
    });
  }

  renderItem = ({ item, index }) => {
    console.log("item ", item);
    return (
      <View style={Styles.listItem}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("CardDetails", {
              card: item,
              onFavoriteChange: this.clickFavorite,
              isFavorite: true
            })
          }
        >
          <Text style={{ textAlign: "center" }}>{item.name}</Text>
          <Image
            style={{ width: 140, height: 200 }}
            source={{ uri: item.imageUrl }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log("render :", this.state.favoriteCards);
    return (
      <View style={Styles.container}>
        <Text style={{ textAlign: "center" }}>Favoris</Text>
        <View style={Styles.list}>
          <FlatList
            data={this.state.favoriteCards}
            renderItem={this.renderItem}
            numColumns={2}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(FavorisListScreen);
