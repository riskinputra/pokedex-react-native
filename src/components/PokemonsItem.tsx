import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SvgUri } from "react-native-svg";
import { map, result } from "lodash";

import PokemonsChip from "./PokemonsChip";
import Axios from "axios";

import { bgPokemonColor } from "../utils/colors";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
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
  pokeball: {
    flex: 1,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonImage: {
    flex: 1,
  },
  pokemonInfo: {
    flex: 2,
    justifyContent: "center",
    position: "relative",
  },
  pokemonName: {
    borderBottomColor: "white",
    borderBottomWidth: 8,
    position: "relative",
  },
  pokemonTypes: {
    justifyContent: "flex-end",
    padding: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
    textTransform: "capitalize",
    textAlign: "right",
    fontWeight: "700",
    color: "white",
  },
  id: {
    position: "absolute",
    right: 0,
    top: -16,
    fontWeight: "600",
    color: "white",
  },
});

interface PokemonItemProps {
  id: number;
  name: string;
}

const PokemonsItem = ({ id, name }: PokemonItemProps) => {
  const [types, setTypes] = useState([]);
  const [color, setColor] = useState("");

  const getPokemonDetail = async () => {
    const resDetail = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const resSpecies = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    setTypes(result(resDetail.data, "types"));
    setColor(result(resSpecies.data, "color.name"));
  };

  useEffect(() => {
    getPokemonDetail();
  }, []);

  const formatId =
    id < 10
      ? ("#00" + id).slice(-4)
      : id < 100
      ? ("#0" + id).slice(-4)
      : "#" + id;
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  const pokemonsTypes = map(types, (type: any, index: number) => {
    return (
      <PokemonsChip
        key={`${name}-types-${index}`}
        id={`${name}-types-${index}`}
        types={type.type.name}
      />
    );
  });

  const bgColor: any = bgPokemonColor;

  return (
    <View style={[styles.item, { backgroundColor: bgColor[color] }]}>
      <ImageBackground
        source={require("./images/pokemon.png")}
        style={styles.pokeball}
      >
        <SvgUri
          width="100px"
          height="100px"
          uri={imageSource}
          style={styles.pokemonImage}
        />
      </ImageBackground>
      <View style={styles.pokemonInfo}>
        <View style={styles.pokemonName}>
          <Text style={styles.id}>{formatId}</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.pokemonTypes}>{pokemonsTypes}</View>
      </View>
    </View>
  );
};

export default PokemonsItem;
