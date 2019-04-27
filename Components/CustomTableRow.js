import React from "react";
import { View, Text } from "react-native";
import { Styles } from "../styles";

const CustomTableRow = props => {
  const content = props.content;
  return (
    content &&
    typeof content != "object" && (
      <View style={Styles.rows}>
        <Text style={Styles.titleRow}>{props.title} : </Text>
        <Text style={Styles.contentRow}>{props.content}</Text>
      </View>
    )
  );
};

export default CustomTableRow;
