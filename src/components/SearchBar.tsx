import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet } from "react-native";

import { colors } from "../utils/colors";

const FORM_HEIGHT = 40;
const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    height: FORM_HEIGHT,
    position: "relative",
  },
  searchIcon: {
    padding: 10,
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 2,
  },
  searchForm: {
    height: FORM_HEIGHT,
    backgroundColor: colors.lightGrey,
    paddingLeft: 42,
    paddingRight: 16,
    borderRadius: 4,
  },
});

const SearchBar = () => {
  const [value, onChangeText] = useState("");

  return (
    <View style={styles.container}>
      <Ionicons
        name="md-search"
        size={24}
        color="grey"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchForm}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder="What Pokemons are you looking for ?"
      />
    </View>
  );
};

export default SearchBar;
