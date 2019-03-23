import React from "react";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
  Foundation
} from "@expo/vector-icons";
export default class CustomIcon extends React.Component {
  render() {
    const {
      name = "help",
      size = 20,
      color = "black",
      type = "Ionicons"
    } = this.props;

    switch (type) {
      case "Entypo":
        return <Entypo name={name} size={size} color="green" />;
      case "Ionicons":
        return <Ionicons name={name} size={size} color="green" />;
      case "MaterialIcons":
        return <MaterialIcons name={name} size={size} color="green" />;
      case "AntDesign":
        return <AntDesign name={name} size={size} color="green" />;
      case "Foundation":
        return <Foundation name={name} size={size} color="green" />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={name} size={size} color="green" />;
      case "FontAwesome":
        return <FontAwesome name={name} size={size} color="green" />;
      default:
        return <Ionicons name={name} size={size} color="green" />;
    }
  }
}
