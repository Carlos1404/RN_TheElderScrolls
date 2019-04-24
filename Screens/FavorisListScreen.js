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
  state = { favorites: [], favoritesCard: [] };
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

  fetchTheData = idCard => {
    axios
      .get(`${BASE_URL}cards/${idCard}`)
      .then(response => {
        favoriteCards = this.state.favorites;
        favoriteCards.push(response.data.card);
        this.setState({ favoritesCard: favoriteCards, isLoading: false });
      })
      .catch(err => console.warn(err));
  };

  componentDidMount() {
    this._retrieveData();
  }

  isCardFavorite = idCard => {
    return this.state.favorites.includes(idCard);
  };

  renderItem = ({ item, index }) => {
    console.log("render :");
    return (
      <View style={Styles.listItem}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("CardDetails", {
              card: item,
              onFavoriteChange: this.clickFavorite,
              isFavorite: this.isCardFavorite(item.id)
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
    this.state.favorites.map(e => console.log(e.name));
    const { favorites } = this.state;
    console.log("on fav");
    return (
      <View style={Styles.container}>
        <Text style={{ textAlign: "center" }}>Favoris</Text>
        <View style={Styles.list}>
          <Text>Ici {favorites.length}</Text>
          <FlatList
            data={favorites}
            renderItem={this.renderItem}
            numColumns={2}
            keyExtractor={(item, i) => i.toString()}
          />
          <Text>Ici</Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(FavorisListScreen);
