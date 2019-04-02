import React, { Component } from "react";
import { TextField } from "react-native-material-textfield";
import Styles from "../styles";
import { View } from "react-native";

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
