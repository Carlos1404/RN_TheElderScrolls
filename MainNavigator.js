import { createStackNavigator, createAppContainer } from "react-navigation";
import CardDetailsScreen from "./Screens/CardDetailsScreen";
import CardsListScreen from "./Screens/CardsListScreen";
import HomeListScreen from "./Screens/HomeListScreen";
import FavorisListScreen from "./Screens/FavorisListScreen";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const MainNavigator = createStackNavigator(
  {
    CardsList: CardsListScreen,
    CardDetails: CardDetailsScreen
  },
  {
    initialRouteName: "CardsList"
  }
);
import { createBottomTabNavigator } from "react-navigation";

const BottomNav = createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeListScreen },
    Favoris: { screen: FavorisListScreen }
  },
  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" }
  }
);
export const BottomNavigator = createAppContainer(BottomNav);

const Navigator = createAppContainer(MainNavigator);

export default Navigator;
