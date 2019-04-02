import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0
  },
  list: {
    flex: 10,
    justifyContent: "space-around"
  },
  listItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  picker: { height: 50, width: 170 },
  searchBar: {
    paddingHorizontal: 15
  },
  settingsContainer: {
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: "#d6d7da"
  }
}));
