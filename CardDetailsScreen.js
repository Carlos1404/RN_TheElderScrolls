import React from "react";
import { StyleSheet, View, Button, Text, Image } from "react-native";

class CardDetailsScreen extends React.Component {
  static navigationOptions = {
    title: "CardDetails"
  };
  render() {
    const { navigation } = this.props;
    card = navigation.getParam("card");
    return (
      <View style={styles.container}>
        <Text>{card.name}</Text>
        <Image style={{ width: 200, height: 300 }} source={{ uri: card.imageUrl }} />
      </View>
    );
  }
}

export default CardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
