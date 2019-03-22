import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

class CardDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'CardDetails'
  };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Button
            title="Go to Cards List"
            onPress={() => this.props.navigation.navigate("CardsList")}
          />
        </View>
      );
    }
  }

  export default CardDetailsScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });