import React, { Component } from "react";
import axios from "axios";
import CustomSearchBar from "../Components/CustomSearchBar";
import Settings from "../Components/Settings";
import { Text, View, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";
import { BASE_URL } from "../Constants";
import Styles from "../styles";

class CardsListScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    cards: [],
    nbCardToDisplay: 10,
    page: 1,
    selectedType: "",
    selectedSubtype: "",
    selectedAttribute: "",
    name: "",
    favorites: [],
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
          <Image style={{ width: 140, height: 200 }} source={{ uri: item.imageUrl }} />
        </TouchableOpacity>
      </View>
    );
  };

  selectAType = type => {
    const subtype = type == "Creature" ? this.state.selectedSubtype : "";
    const attri = type == "Creature" ? this.state.selectedAttribute : "";
    this.setState({ selectedType: type, selectedSubtype: subtype, selectedAttribute: attri }, () =>
      this.fetchTheData()
    );
  };
  selectASubtype = subtype => {
    this.setState({ selectedSubtype: subtype }, () => this.fetchTheData());
  };
  selectAAttribute = attri => {
    this.setState({ selectedAttribute: attri }, () => this.fetchTheData());
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
    const { page, name, selectedSubtype, selectedType, selectedAttribute } = this.state;
    axios
      .get(
        `${BASE_URL}cards?page=${page}&name=${name}&type=${selectedType}&subtypes=${selectedSubtype}&attributes=${selectedAttribute}`
      )
      .then(response => this.setState({ cards: response.data.cards, isLoading: false }))
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
      isLoading,
      selectedType,
      selectedSubtype,
      selectedAttribute
    } = this.state;
    console.log("cards : ", cards.length);
    if (isLoading) {
      return <Text>Loading content...</Text>;
    } else {
      return (
        <View style={Styles.container}>
          <CustomSearchBar onTextChanged={this.onTextChanged} currentName={name} />
          <Settings
            selectedType={selectedType}
            selectedSubtype={selectedSubtype}
            selectedAttribute={selectedAttribute}
            selectAType={this.selectAType}
            selectASubType={this.selectASubtype}
            selectAAttribute={this.selectAAttribute}
          />
          <View style={Styles.list}>
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
