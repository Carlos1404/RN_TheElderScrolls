import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

class CardsListScreen extends React.Component {
  static navigationOptions = {
    title: "CardsList"
  };
  state = {
    cards: [],
    favorites: []
  };

  componentDidMount() {
    fetch("https://api.elderscrollslegends.io/v1/cards?pageSize=20")
      .then(response => response.json())
      .then(response => this.setState({ cards: response.cards }))
      .catch(err => console.warn(err));
  }

  clickFavorite = idCard => {
    if (this.isCardFavorite(idCard)) {
      this.deleteOfFavorites(idCard);
    } else {
      this.addToFavorites(idCard);
    }
  };

  isCardFavorite = idCard => {
    return this.state.favorites.includes(idCard);
  };

  addToFavorites = idCard => {
    var updateList = this.state.favorites;
    updateList.push(idCard);
    this.setState({
      favorites: updateList
    });
    console.log(this.state.favorites);
  };

  deleteOfFavorites = idCard => {
    var index = this.state.favorites.indexOf(idCard);
    if (index > -1) {
      this.state.favorites.splice(index, 1);
    }
    console.log(this.state.favorites);
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("CardDetails", {
            card: item,
            onFavoriteChange: this.clickFavorite,
            isFavorite: this.isCardFavorite(item.id)
          })
        }
      >
        <Text>{item.name}</Text>
        <Image
          style={{ width: 100, height: 150 }}
          source={{ uri: item.imageUrl }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cards}
          renderItem={this.renderItem}
          numColumns={2}
          style={styles.list}
        />
      </View>
    );
  }
}

export default CardsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  list: {}
});
