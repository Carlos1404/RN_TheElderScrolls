import React, { Component } from "react";
import axios from "axios";
import CustomSearchBar from "../Components/CustomSearchBar";
import Settings from "../Components/Settings";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { BASE_URL } from "../Constants";
import Styles from "../styles";
import BottomNavigation, {
  FullTab,
  createMaterialBottomTabNavigator
} from "react-native-material-bottom-navigation";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import HomeListScreen from "./HomeListScreen";
import CardDetailsScreen from "./CardDetailsScreen";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

const BottomNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeListScreen },
    Favoris: { screen: CardDetailsScreen }
  },
  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" }
  }
);

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

  tabs = [
    {
      key: "home",
      icon: "gamepad-variant",
      label: "Home",
      barColor: "#388E3C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "favoris",
      icon: "movie",
      label: "Favoris",
      barColor: "#B71C1C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  );

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

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

  selectAType = type => {
    const subtype = type == "Creature" ? this.state.selectedSubtype : "";
    const attri = type == "Creature" ? this.state.selectedAttribute : "";
    this.setState(
      {
        selectedType: type,
        selectedSubtype: subtype,
        selectedAttribute: attri
      },
      () => this.fetchTheData()
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
    const {
      page,
      name,
      selectedSubtype,
      selectedType,
      selectedAttribute
    } = this.state;
    axios
      .get(
        `${BASE_URL}cards?page=${page}&name=${name}&type=${selectedType}&subtypes=${selectedSubtype}&attributes=${selectedAttribute}`
      )
      .then(response =>
        this.setState({ cards: response.data.cards, isLoading: false })
      )
      .catch(err => console.warn(err));
  };

  resetFilter = () => {
    this.setState(
      { selectedType: "", selectedSubtype: "", selectedAttribute: "" },
      () => this.fetchTheData()
    );
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
    if (isLoading) {
      return <Text>Loading content...</Text>;
    } else {
      return (
        <View style={Styles.container}>
          <CustomSearchBar
            onTextChanged={this.onTextChanged}
            currentName={name}
          />
          <Settings
            selectedType={selectedType}
            selectedSubtype={selectedSubtype}
            selectedAttribute={selectedAttribute}
            selectAType={this.selectAType}
            selectASubType={this.selectASubtype}
            selectAAttribute={this.selectAAttribute}
            resetFilter={this.resetFilter}
          />
          <BottomNavigator />
          <BottomNavigation
            onTabPress={newTab => this.setState({ activeTab: newTab.key })}
            renderTab={this.renderTab}
            tabs={this.tabs}
          />
        </View>
      );
    }
  }
}

export default CardsListScreen;
