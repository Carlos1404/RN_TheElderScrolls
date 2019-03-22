import {createStackNavigator, createAppContainer} from 'react-navigation';
import CardDetailsScreen  from "./CardDetailsScreen";
import CardsListScreen  from "./CardsListScreen";

const MainNavigator = createStackNavigator({
  CardsList: CardsListScreen,
  CardDetails: CardDetailsScreen,
},{
  initialRouteName: "CardsList"
}
);

const Navigator = createAppContainer(MainNavigator);

export default Navigator;