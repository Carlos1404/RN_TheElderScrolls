import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class CardsListScreen extends React.Component {
  static navigationOptions = {
    title: 'CardsList'
  };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Button
            title="Go to Card Details"
            onPress={() => this.props.navigation.navigate("CardDetails")}
          />
        </View>
      );
    }
  }

  export default CardsListScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });