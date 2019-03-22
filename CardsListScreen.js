import React, { Component } from "react";
import axios from "axios";
import CustomSearchBar from "./Components/CustomSearchBar";
import BottomNavigation, { FullTab } from "react-native-material-bottom-navigation";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Icon
} from "react-native";

const BASE_URL = "https://api.elderscrollslegends.io/v1/cards?";

class CardsListScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    cards: [],
    nbCardToDisplay: 10,
    page: 1,
    name: ""
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
          onPress={() => this.props.navigation.navigate("CardDetails", { card: item })}
        >
          <Text style={{ textAlign: "center" }}>{item.name}</Text>
          <Image
            style={{ width: 140, height: 200, textAlign: "center" }}
            source={{ uri: item.imageUrl }}
          />
        </TouchableOpacity>
      </View>
    );
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
    console.log(`${BASE_URL}name=${name}`);
    axios
      .get(`${BASE_URL}page=${page}&name=${name}`)
      .then(response => this.setState({ cards: response.data.cards }))
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
    const { nbCardToDisplay, cards, name } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginBottom: 5 }}>
          <CustomSearchBar onTextChanged={this.onTextChanged} currentName={name} />
        </View>
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

export default CardsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
