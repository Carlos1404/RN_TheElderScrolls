import { createStackNavigator, createAppContainer } from "react-navigation";
import CardDetailsScreen from "./Screens/CardDetailsScreen";
import CardsListScreen from "./Screens/CardsListScreen";
import HomeListScreen from "./Screens/HomeListScreen";
import FavorisListScreen from "./Screens/FavorisListScreen";
import React from "react";
import { Icon } from "react-native-elements";

const colors = {
  darkBrown: "#505050",
  lightBrown: "#8c7762",
  darkBlue: "#215260",
  blue: "#628c8b",
  ligthBlue: "#8cbcbe",
  darkGrey: "#393939",
  lightGrey: "#dfdfdf"
};

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

const BottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconName = `cards${focused ? "" : "-outline"}`;
          const iconColor = focused ? colors.lightBrown : colors.darkBrown;
          return <Icon name={iconName} type="material-community" color={iconColor} />;
        }
      }
    },
    Favoris: {
      screen: FavorisListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconName = `favorite${focused ? "" : "-border"}`;
          const iconColor = focused ? colors.lightBrown : colors.darkBrown;
          return <Icon name={iconName} type="Material" color={iconColor} />;
        }
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: colors.lightBrown,
      inactiveTintColor: colors.darkBrown,
      activeBackgroundColor: colors.darkGrey,
      inactiveBackgroundColor: colors.lightGrey
    }
  }
);

export const BottomNavigator = createAppContainer(BottomNav);
const Navigator = createAppContainer(MainNavigator);

export default Navigator;
