import { StyleSheet, Text, View, Image, TextInput } from "react-native";

import { Colors } from "../constants/colors";

import searchImage from "../assets/icons/search.png";

const SearchBar = ({ placeholder, onPress, value, onChangeText }) => {
  return (
    <View style={styles.searchBar}>
      <Image source={searchImage} style={styles.searchIcon} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark[200],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: "#ab8bff",
    resizeMode: "contain",
  },
  textInput: {
    flex: 1,
    marginLeft: 20,
    color: "white",
  },
});
