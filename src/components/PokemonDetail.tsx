import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { map, filter, result } from 'lodash';
import Animated, { divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash";

import PokemonsLabel from "./PokemonsLabel";
import PokemonStat from "./PokemonStat";
import PokemonEvo from "./PokemonEvo";
import PokemonMoves from "./PokemonMoves";
import TabLabel from "./TabLabel";
import { bgColor } from "../utils/colors";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

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
    marginTop: 16,
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 40,
    lineHeight: 66,
    textTransform: 'capitalize',
    color: '#4F4F4F',
    marginTop: 16
  },
  pokemonTypes: {
    flexDirection: "row"
  },
  pokemonDesc: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 15,
    lineHeight: 20,
    color: '#4F4F4F',
    paddingHorizontal: 16
  },
  pokemonTabs: {
    flexDirection: 'row',
    marginTop: 32,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative'
  },
  tabsLabel: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 110,
    textAlign: 'center',
    borderRadius: 50
  }
});

interface PokemonDetailProps {
  id: number;
  detail: object;
  species: object;
  pokemonColor: string;
  handleScroll: any;
}
const PokemonDetail = ({ detail, species, pokemonColor, handleScroll }: PokemonDetailProps) => {
  const [isScroll, setIsScroll] = useState(false)
  const { name, types }: any = detail
  const pokemonType = map(types, (type, index) => (
    <PokemonsLabel
      key={`${name}-types-${index}`}
      id={`${name}-types-${index}`}
      types={type.type.name}
    />
  ))
  const tabLabel = ['STAT', 'EVOLUTION', 'MOVES']
  const statusColor: any = bgColor;
  const pokemonDescription = filter(result(species, 'flavor_text_entries', []), (desc) => result(desc, 'version.name') === 'ruby')[0];

  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const handleScrollEvent = (event: any) => {
    const scrollCalculate = event.nativeEvent.contentOffset.y
    if (scrollCalculate > 0) {
      setIsScroll(true)
    }
    handleScroll(event.nativeEvent.contentOffset.y)
  }

  return (
    <ScrollView style={[styles.container, { minHeight: isScroll ? RFValue(height * 0.8) : RFValue(height * 0.4) }]} onScroll={(event) => handleScrollEvent(event)}>
      <View style={styles.containerPokemon}>
        {!isScroll && (<Text style={styles.pokemonName}>{name}</Text>)}
        <View style={styles.pokemonTypes}>
          {pokemonType}
        </View>
        <View>
          <Text style={styles.pokemonDesc}>{result(pokemonDescription, 'flavor_text', '')}</Text>
        </View>
        <View style={[styles.pokemonTabs]}>
          {tabLabel.map((name, index) => (<TabLabel key={index} currentIndex={divide(x, width)} name={name} bgColor={statusColor[pokemonColor].primary} {...{ index }} />))}
        </View>
        <Animated.View>
          <Animated.ScrollView
            ref={scroll}
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            {...scrollHandler}
          >
            <PokemonStat status={result(detail, 'stats')} bgColor={statusColor[pokemonColor].primary} />
            <PokemonEvo />
            <PokemonMoves />

          </Animated.ScrollView>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetail;
