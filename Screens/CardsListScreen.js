import React, { Component } from "react";
import axios from "axios";
import { Font } from "expo";
import CustomSearchBar from "../Components/CustomSearchBar";
import Settings from "../Components/Settings";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { BASE_URL } from "../Constants";
import CustomIcon from "../Components/CustomIcon.js";

class CardsListScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    cards: [],
    nbCardToDisplay: 10,
    page: 1,
    name: "",
    favorites: [],
    showSettings: false,
    isLoading: true
  };

  onTextChanged = name => {
    this.setState({ name }, () => this.fetchTheData());
  };

  componentDidMount() {
    StatusBar.setHidden(true);
    this.fetchTheData();
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
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
  };

  deleteOfFavorites = idCard => {
    var index = this.state.favorites.indexOf(idCard);
    if (index > -1) {
      this.state.favorites.splice(index, 1);
    }
  };

  didReachEndList = numb => {
    const cards = this.state.cards;
    if (numb >= cards.length) {
      this.setState(
        state => ({ page: state.page + 1 }),
        () => {
          this.fetchTheData();
        }
      );
    }
  };

  fetchTheData = () => {
    const { page, name } = this.state;
    console.log(`${BASE_URL}cards?name=${name}`);
    axios
      .get(`${BASE_URL}cards?page=${page}&name=${name}`)
      .then(response =>
        this.setState({ cards: response.data.cards, isLoading: false })
      )
      .catch(err => console.warn(err));
  };

  onEndReached = () => {
    if (this.state.cards.length > 10) {
      this.setState(
        state => ({
          nbCardToDisplay: state.nbCardToDisplay + 10
        }),
        () => this.didReachEndList(this.state.nbCardToDisplay)
      );
    }
  };

  render() {
    const {
      nbCardToDisplay,
      cards,
      name,
      showSettings,
      isLoading
    } = this.state;
    console.log(showSettings);
    if (isLoading) {
      return <Text>Loading content...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <CustomSearchBar
            onTextChanged={this.onTextChanged}
            currentName={name}
          />
          {showSettings ? (
            <View style={{ flex: 2, marginBottom: 5, paddingBottom: 5 }}>
              <Settings />
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() =>
                  this.setState(state => ({
                    showSettings: !state.showSettings
                  }))
                }
              >
                <CustomIcon
                  name="menu-up-outline"
                  size={50}
                  type="MaterialCommunityIcons"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() =>
                this.setState(state => ({ showSettings: !state.showSettings }))
              }
            >
              <CustomIcon
                name="menu-down-outline"
                size={50}
                type="MaterialCommunityIcons"
              />
            </TouchableOpacity>
          )}
          <View style={styles.list}>
            <FlatList
              data={cards.slice(0, nbCardToDisplay)}
              renderItem={this.renderItem}
              numColumns={2}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, i) => i.toString()}
            />
          </View>
        </View>
      );
    }
  }
}

export default CardsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0
  },
  list: {
    flex: 10,
    justifyContent: "space-around"
  },
  listItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});