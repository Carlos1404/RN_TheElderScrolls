import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
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
  },
  iconContainer: {
    alignSelf: "center",
    paddingHorizontal: 20
  }
});

export const Colors = {
  darkBrown: "#505050",
  lightBrown: "#8c7762",
  darkBlue: "#215260",
  blue: "#628c8b",
  ligthBlue: "#8cbcbe",
  darkGrey: "#393939",
  lightGrey: "#dfdfdf"
};
