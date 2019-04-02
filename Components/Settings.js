import React, { Component } from "react";
import { View, Picker } from "react-native";
import { BASE_URL } from "../Constants";
import axios from "axios";
import Styles from "../styles";

export default class Settings extends Component {
  state = {
    types: [],
    subtypes: [],
    attributes: []
  };
  componentDidMount() {
    this.fetchTheType();
    this.fetchSubtypes();
    this.fetchAttr();
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
  fetchAttr = () => {
    axios
      .get(`${BASE_URL}attributes`)
      .then(response => this.setState({ attributes: response.data.attributes }))
      .catch(err => console.warn(err));
  };

  render() {
    const { types, subtypes, attributes } = this.state;
    const {
      selectASubType,
      selectAType,
      selectedSubtype,
      selectedType,
      selectedAttribute,
      selectAAttribute
    } = this.props;
    console.log("typeselected : ", selectedType);

    return (
      <View style={Styles.settingsContainer}>
        <Picker
          selectedValue={selectedType}
          style={Styles.picker}
          onValueChange={type => selectAType(type.replace(" ", ""))}
        >
          <Picker.Item label="All Types" value="" />
          {types.map((type, index) => (
            <Picker.Item label={type} value={type} key={index} />
          ))}
        </Picker>
        {selectedType == "Creature" && (
          <View style={{ flexDirection: "row" }}>
            <Picker
              selectedValue={selectedSubtype}
              style={Styles.picker}
              onValueChange={subtype => selectASubType(subtype.replace(" ", ""))}
            >
              <Picker.Item label="All Subtypes" value="" />
              {subtypes.map((subtype, index) => (
                <Picker.Item label={subtype} value={subtype} key={index} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedAttribute}
              style={Styles.picker}
              onValueChange={subtype => selectAAttribute(subtype.replace(" ", ""))}
            >
              <Picker.Item label="All Attributes" value="" />
              {attributes.map((attr, index) => (
                <Picker.Item label={attr} value={attr} key={index} />
              ))}
            </Picker>
          </View>
        )}
      </View>
    );
  }
}
