import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontSize: 32,
  },
});

interface PokemonItemProps {
  id: number;
  name: string;
}

const PokemonsItem = ({ id, name }: PokemonItemProps) => {
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  return (
    <View style={styles.item}>
      <SvgUri width="100px" height="100px" uri={imageSource} />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default PokemonsItem;
