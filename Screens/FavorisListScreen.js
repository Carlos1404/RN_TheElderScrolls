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

class FavorisListScreen extends Component {
  state = { favorites: [], favoritesCard: [] };
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
        console.log("test1", favorites)
        favorites.array.forEach(id => {
          console.log(idCard);
          this.fetchTheData(idCard)
        });
        console.log("test favori ", favorites);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  fetchTheData = (idCard) => {
    axios
      .get(
        `${BASE_URL}cards/${idCard}`
      )
      .then(response => {
        console.log("test2")
        favoriteCards = this.state.favoritesCard;
        favoriteCards.push(response.data.card);
        console.log(favoriteCards);
        this.setState({ favoritesCard: favoriteCards, isLoading: false });})
      .catch(err => console.warn(err));
  };

  componentDidMount() {
    this._retrieveData();
  }

  isCardFavorite = idCard => {
    return this.state.favorites.includes(idCard);
  };

  renderItem = ({ item, index }) => {
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
          <Image style={{ width: 140, height: 200 }} source={{ uri: item.imageUrl }} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log(this.state);
    return (
      <View style={Styles.container}>
      <Text style={{ textAlign: "center" }}>Favoris</Text>
        <View style={Styles.list}>
              <FlatList
                data={this.state.favorites}
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
