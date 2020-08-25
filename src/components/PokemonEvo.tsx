import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import { SvgUri } from 'react-native-svg';
import { result, isEmpty } from 'lodash';

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 32
  },
  name: { fontSize: 15, textTransform: 'capitalize', color: '#666666' },
  pokemonEvol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderColor: '#EDEDED'
  },
  level: {
    fontSize: 16
  }
})

interface PokemonEvoProps {
  evolution: any;
  colors: string
}

const PokemonEvo = ({ evolution, colors }: PokemonEvoProps) => {
  const getId = (url: string) => {
    const splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 2]
  }

  const imageSource = (url: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getId(url)}.svg`;
  }
  const listOfEvolution = (from: any, to: any) => {
    return (
      <View style={styles.pokemonEvol}>
        {from &&
          (<View style={{ alignItems: 'center' }}>
            <SvgUri width="65" height="65" uri={imageSource(result(from, 'url'))} />
            <Text style={styles.name}>{result(from, 'name')}</Text>
          </View>)
        }
        {from &&
          (<View style={{ alignItems: 'center' }}>
            <Text style={[styles.level, { color: colors }]}>LV.{result(from, 'lv')}</Text>
            <Image source={require("./images/arrow.png")} />
          </View>)
        }
        {to && (
          <View style={{ alignItems: 'center' }}>
            <SvgUri width="65" height="65" uri={imageSource(result(to, 'url'))} />
            <Text style={styles.name}>{result(to, 'name')}</Text>
          </View>
        )}
      </View>
    )
  }
  const evolution2 = !isEmpty(evolution) ? evolution.evolves_to[0] : {}
  const evolution3 = !isEmpty(evolution2) ? evolution2.evolves_to[0] : {}
  const evolution4 = !isEmpty(evolution3) ? evolution3.evolves_to[0] : {}

  const getEvo = !isEmpty(evolution) && (
    <View>
      {!isEmpty(evolution2) && listOfEvolution({ url: result(evolution, 'species.url', ''), name: result(evolution, 'species.name', ''), lv: result(evolution2.evolution_details[0], 'min_level', 0) }, { url: result(evolution2, 'species.url', ''), name: result(evolution2, 'species.name', '') })}
      {!isEmpty(evolution3) && listOfEvolution({ url: result(evolution2, 'species.url', ''), name: result(evolution2, 'species.name', ''), lv: result(evolution3.evolution_details[0], 'min_level', 0) }, { url: result(evolution3, 'species.url', ''), name: result(evolution3, 'species.name', '') })}
      {!isEmpty(evolution4) && listOfEvolution({ url: result(evolution3, 'species.url', ''), name: result(evolution3, 'species.name', ''), lv: result(evolution4.evolution_details[0], 'min_level', 0) }, { url: result(evolution4, 'species.url', ''), name: result(evolution4, 'species.name', '') })}
    </View>
  )
  return (
    <View style={styles.container}>
      {getEvo}
    </View>
  )
}

export default React.memo(PokemonEvo)
