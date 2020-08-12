import React, { useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { PokemonsContext } from "../context/pokemonContext";
import * as types from "../store/types";

import PokemonsItem from "./PokemonsItem";
import Axios from "axios";

const PokemonsList = () => {
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

  const renderItem = ({ item }: any) => {
    const pokemonSplitUrl = item.url.split("/");
    const getId = pokemonSplitUrl[pokemonSplitUrl.length - 2];
    return <PokemonsItem id={getId} name={item.name} />;
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
