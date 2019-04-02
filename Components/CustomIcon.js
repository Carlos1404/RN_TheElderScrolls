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
    const { name = "help", size = 20, color = "black", type = "Entypo" } = this.props;

    switch (type) {
      case "Entypo":
        return <Entypo name={name} size={size} color={color} />;
      case "Ionicons":
        return <Ionicons name={name} size={size} color={color} />;
      case "MaterialIcons":
        return <MaterialIcons name={name} size={size} color={color} />;
      case "AntDesign":
        return <AntDesign name={name} size={size} color={color} />;
      case "Foundation":
        return <Foundation name={name} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      case "FontAwesome":
        return <FontAwesome name={name} size={size} color={color} />;
      default:
        return <Ionicons name={name} size={size} color={color} />;
    }
  }
}
