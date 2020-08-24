import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import { SvgUri } from 'react-native-svg';
import { result } from 'lodash';

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
  evlolution: any;
  colors: string
}

const PokemonEvo = ({ evlolution, colors }: PokemonEvoProps) => {
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
  return (
    <View style={styles.container}>
      {listOfEvolution({ url: result(evlolution, 'species.url', ''), name: result(evlolution, 'species.name', ''), lv: result(evlolution.evolves_to[0].evolution_details[0], 'min_level', 0) }, { url: result(evlolution.evolves_to[0], 'species.url', ''), name: result(evlolution.evolves_to[0], 'species.name', '') })}
    </View>
  )
}

export default React.memo(PokemonEvo)
