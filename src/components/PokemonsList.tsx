import React, { useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableHighlight } from "react-native";

import { PokemonsContext } from "../context/pokemonContext";
import * as types from "../store/types";

import PokemonsItem from "./PokemonsItem";
import Axios from "axios";

const PokemonsList = (props: any) => {
  const { navigate } = props.navigation;
  const { state, dispatch } = useContext(PokemonsContext);
  const setPokemons = (data: any) => {
    dispatch({
      type: "FETCH_POKEMONS_DATA",
      payload: data,
    });
  };

  const fetchPokemons = async () => {
    const { data } = await Axios.get("https://pokeapi.co/api/v2/pokemon/");
    const setData: types.PokemonState = {
      next: data.next,
      previous: data.previous,
      pokemons: data.results,
    };
    setPokemons(setData);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const goToNextScreen = (id: number) => {
    return navigate("Detail", { id });
  };

  const renderItem = ({ item }: any) => {
    const pokemonSplitUrl = item.url.split("/");
    const getId = pokemonSplitUrl[pokemonSplitUrl.length - 2];
    return (
      <TouchableHighlight onPress={() => goToNextScreen(getId)}>
        <PokemonsItem id={getId} name={item.name} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => {
          const pokemonSplitUrl = item.url.split("/");
          const getId = pokemonSplitUrl[pokemonSplitUrl.length - 2];
          return getId;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(PokemonsList);
