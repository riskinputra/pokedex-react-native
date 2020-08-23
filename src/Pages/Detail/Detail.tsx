import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Axios from "axios";
import { result, isEmpty } from "lodash";
import { LinearGradient } from "expo-linear-gradient";

import { BackNavigation, PokemonDetail } from "../../components";
import { bgPokemonColor, bgColor } from "../../utils/colors";
import { SvgUri } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    position: 'relative'
  },
});

const Detail: any = (props: any) => {
  const { id } = props.route.params;
  const [isScroll, setIsScroll] = useState(false)
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

  const statusColor: any = bgPokemonColor;
  const getColor: string = result(species, "color.name");
  const dataNotEmpty = !isEmpty(species) && !isEmpty(detail)
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  const handleScroll = (scrollValue: number) => {
    if (scrollValue > 0) {
      setIsScroll(true)
    }
  }

  useEffect(() => {
    getPokemonDetail();
  }, []);

  return (
    dataNotEmpty &&
    <View style={[styles.container]}>
      <LinearGradient
        colors={[bgColor[getColor].primary, bgColor[getColor].secondary]}
        style={{ flex: 1 }}
      >
        <StatusBar
          barStyle={getColor === "white" ? "dark-content" : "light-content"}
          backgroundColor={statusColor[getColor]}
        />
        <BackNavigation isScroll={isScroll} name={result(detail, 'name', '')} />
        {!isScroll && (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -20, zIndex: 9999, position: 'relative', height: 150 }}>
            <SvgUri width="150px" height="150px" uri={imageSource} />
          </View>
        )}
        <PokemonDetail id={id} detail={detail} species={species} pokemonColor={getColor} handleScroll={handleScroll} />
      </LinearGradient>
    </View>)
};

export default React.memo(Detail);
