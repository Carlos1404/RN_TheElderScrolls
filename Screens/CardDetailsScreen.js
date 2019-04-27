import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import star_empty from "../assets/Images/star_empty.png";
import star from "../assets/Images/star.png";
import CustomTableRow from "../Components/CustomTableRow";
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "../styles";

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
      <ScrollView>
        <View style={Styles.container}>
          <Text style={Styles.title}>{card.name}</Text>
          <View style={StyleMedia.mainRow}>
            <Text style={Styles.body}>{card.rarity}</Text>
            <Text style={Styles.body}>{card.type}</Text>
          </View>
          <View style={Styles.containerCenter}>
            <Image
              style={{ width: 200, height: 300 }}
              source={{ uri: card.imageUrl }}
            />
            <Text style={Styles.body}>
              {card.cost} {card.cost > 1 ? "pièces" : "pièce"}
            </Text>
          </View>
          {Object.entries(card).map((i, index) => (
            <CustomTableRow title={i[0]} content={i[1]} key={index} />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default CardDetailsScreen;
