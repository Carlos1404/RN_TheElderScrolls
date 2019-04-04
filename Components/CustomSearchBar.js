import React, { Component } from "react";
import { TextField } from "react-native-material-textfield";
import { View } from "react-native";
import { Styles } from "../styles";

export default class CustomSearchBar extends Component {
  render() {
    const { onTextChanged, currentName } = this.props;
    return (
      <View style={Styles.searchBar}>
        <TextField
          label="Search"
          value={currentName}
          placeHolder="Search..."
          onChangeText={res => onTextChanged(res)}
        />
      </View>
    );
  }
}
