import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import CardDetailsScreen from "./Screens/CardDetailsScreen";
import CardsListScreen from "./Screens/CardsListScreen";
import FavorisListScreen from "./Screens/FavorisListScreen";
import React from "react";
import { Icon } from "react-native-elements";
import { Colors } from "./styles";

const BottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: CardsListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconName = `cards${focused ? "" : "-outline"}`;
          const iconColor = focused ? Colors.lightBrown : Colors.darkBrown;
          return <Icon name={iconName} type="material-community" color={iconColor} />;
        }
      }
    },
    Favoris: {
      screen: props => <FavorisListScreen {...props} />,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconName = `favorite${focused ? "" : "-border"}`;
          const iconColor = focused ? Colors.lightBrown : Colors.darkBrown;
          return <Icon name={iconName} type="Material" color={iconColor} />;
        }
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: Colors.lightBrown,
      inactiveTintColor: Colors.darkBrown,
      activeBackgroundColor: Colors.darkGrey,
      inactiveBackgroundColor: Colors.lightGrey
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    home: { screen: BottomNav, navigationOptions: { header: null } },
    CardDetails: { screen: CardDetailsScreen }
  },
  {
    initialRouteName: "home"
  }
);

const Navigator = createAppContainer(MainNavigator);

export default Navigator;
