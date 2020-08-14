import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Axios from "axios";
import { result } from "lodash";
import { LinearGradient } from "expo-linear-gradient";

import { BackNavigation, PokemonDetail } from "../../components";
import { bgPokemonColor, bgColor } from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
});

const Detail = (props: any) => {
  const { id } = props.route.params;
  const [detail, setDetail] = useState({});
  const [species, setSpecies] = useState({});
  const getPokemonDetail = async () => {
    const resDetail = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const resSpecies = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    setDetail(resDetail.data);
    setSpecies(resSpecies.data);
  };

  const stausColor: any = bgPokemonColor;
  const getColor: string = result(species, "color.name");

  useEffect(() => {
    getPokemonDetail();
  }, []);

  console.log(species);
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={[bgColor[getColor].primary, bgColor[getColor].secondary]}
        style={{ flex: 1 }}
      >
        <StatusBar
          barStyle={getColor === "white" ? "dark-content" : "light-content"}
          backgroundColor={stausColor[getColor]}
        />
        <BackNavigation />
        <PokemonDetail id={id} />
      </LinearGradient>
    </View>
  );
};

export default Detail;
