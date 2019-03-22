import React, { Component } from "react";
import { TextField } from "react-native-material-textfield";
import { StyleSheet, Text, View, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";

export default class CustomSearchBar extends Component {
  render() {
    const { onTextChanged, currentName } = this.props;
    return (
      <TextField
        label="Search"
        value={currentName}
        placeHolder="Search..."
        onChangeText={res => onTextChanged(res)}
      />
    );
  }
}
