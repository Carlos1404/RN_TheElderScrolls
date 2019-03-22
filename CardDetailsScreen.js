import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import star_empty from "./star_empty.png";
import star from "./star.png";

class CardDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const card = navigation.getParam("card");
    const onFavoriteChange = navigation.getParam("onFavoriteChange");
    const isFavorite = navigation.getParam("isFavorite");

    return {
      title: "Détails d'une carte",
      headerTitleStyle: { width: "100%", alignItems: "center" },
      headerRight: (
        <TouchableOpacity
          onPress={() => (
            navigation.setParams({ isFavorite: !isFavorite }),
            onFavoriteChange(card.id)
          )}
        >
          <Image
            source={navigation.getParam("isFavorite") ? star : star_empty}
            style={{ width: 24, height: 24, marginEnd: 16 }}
          />
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { navigation } = this.props;
    card = navigation.getParam("card");
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{card.name}</Text>
        <Image
          style={{ width: 200, height: 300 }}
          source={{ uri: card.imageUrl }}
        />
        <Text style={styles.body}>{card.rarity}</Text>
        <Text style={styles.body}>{card.type}</Text>
        <Text style={styles.body}>
          {card.cost} {card.cost > 1 ? "pièces" : "pièce"}
        </Text>
      </View>
    );
  }
}

export default CardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    margin: 16,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center"
  },
  body: {
    margin: 16,
    fontSize: 20,
    padding: 10,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#FFC107",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});
