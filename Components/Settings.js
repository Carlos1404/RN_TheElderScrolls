import React, { Component } from "react";
import { Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { BASE_URL } from "../Constants";
import axios from "axios";

export default class Settings extends Component {
  state = {
    types: [],
    subtypes: []
  };
  componentDidMount() {
    this.fetchTheType();
    this.fetchSubtypes();
  }
  fetchTheType = () => {
    axios
      .get(`${BASE_URL}types`)
      .then(response => this.setState({ types: response.data.types }))
      .catch(err => console.warn(err));
  };
  fetchSubtypes = () => {
    axios
      .get(`${BASE_URL}subtypes`)
      .then(response => this.setState({ subtypes: response.data.subtypes }))
      .catch(err => console.warn(err));
  };

  render() {
    const { types, subtypes } = this.state;
    console.log(subtypes);
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ flex: 1 }}>Choose Wanted Types</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {types.map(type => (<Text>{type}</Text>, <CheckBox title={type} />))}
        </View>
        <Text style={{ flex: 1 }}>Choose Wanted subtypes</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {subtypes.map(type => (
            <CheckBox title={type} />
          ))}
        </View>
      </View>
    );
  }
}
