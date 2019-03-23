import { createStackNavigator, createAppContainer } from "react-navigation";
import CardDetailsScreen from "./Screens/CardDetailsScreen";
import CardsListScreen from "./Screens/CardsListScreen";

const MainNavigator = createStackNavigator(
  {
    CardsList: CardsListScreen,
    CardDetails: CardDetailsScreen
  },
  {
    initialRouteName: "CardsList"
  }
);

const Navigator = createAppContainer(MainNavigator);

export default Navigator;
