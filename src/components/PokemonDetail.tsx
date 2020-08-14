import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "relative",
  },
  containerPokemon: {
    flex: 1,
    marginTop: -120,
    alignItems: "center",
  },
});

interface PokemonDetailProps {
  id: number;
}
const PokemonDetail = ({ id }: PokemonDetailProps) => {
  console.log({ id });
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  return (
    <View style={styles.container}>
      <View style={styles.containerPokemon}>
        <SvgUri width="150px" height="150px" uri={imageSource} />
      </View>
    </View>
  );
};

export default PokemonDetail;
