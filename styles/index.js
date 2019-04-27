import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0
  },
  containerCenter: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    margin: 16,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center"
  },
  titleRow: { flex: 2, fontWeight: "bold", fontSize: 18 },
  contentRow: { flex: 3, fontSize: 14 },
  rows: {
    flex: 1,
    alignSelf: "center",
    marginHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  mainRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  body: {
    fontSize: 20,
    width: 100,
    padding: 5,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#FFC107",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
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
