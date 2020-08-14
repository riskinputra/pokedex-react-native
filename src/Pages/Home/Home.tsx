import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { SearchBar, PokemonsList } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: RFValue(40),
    paddingHorizontal: RFValue(16),
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    lineHeight: 1.5 * 40,
    fontFamily: "SFProText-Bold",
    textAlign: "center",
  },
});

const Home = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <SearchBar />
      <PokemonsList navigation={props.navigation} />
    </View>
  );
};

export default Home;
