import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Axios from "axios";
import { result, isEmpty, map, forEach } from "lodash";
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
  const [weakness, setWeakness] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [moves, setMoves] = useState([]);

  const getTypeDetail = async (item: any) => {
    const resTypeDetail = await Axios.get(item.type.url)
    return await result(resTypeDetail.data, 'damage_relations.double_damage_from')
  }

  const getMovesApi = async (item: any) => {
    const resMovesDetail = await Axios.get(item.move.url)
    const getDetail = resMovesDetail.data
    return await { name: item.move.name, detail: result(getDetail.effect_entries[0], 'short_effect') }
  }


  const getPokemonDetail = async () => {
    const resDetail = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const resSpecies = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    // Get Weakness
    const pokemon_weakness: any = []
    const typeMaping = await Promise.all(
      map(resDetail.data.types, getTypeDetail)
    )
    forEach(typeMaping, (weak: any) => {
      pokemon_weakness.push(...weak)
    })

    // Get evolution
    const resEvolution = await Axios.get(
      result(resSpecies, 'data.evolution_chain.url')
    )

    // Get moves
    const pokemon_moves: any = []
    const movesMaping = await Promise.all(
      map(resDetail.data.moves, getMovesApi)
    )
    forEach(movesMaping, (move: any) => {
      pokemon_moves.push(move)
    })

    setDetail(resDetail.data);
    setSpecies(resSpecies.data);
    setWeakness(pokemon_weakness)
    setEvolution(resEvolution.data.chain)
    setMoves(pokemon_moves)
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
        <BackNavigation isScroll={isScroll} name={result(detail, 'name', '')} navigation={props.navigation} />
        {!isScroll && (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -20, zIndex: 9999, position: 'relative', height: 150 }}>
            <SvgUri width="150px" height="150px" uri={imageSource} />
          </View>
        )}
        <PokemonDetail id={id} detail={detail} species={species} pokemonColor={getColor} handleScroll={handleScroll} weakness={weakness} evolution={evolution} moves={moves} />
      </LinearGradient>
    </View>)
};

export default React.memo(Detail);
