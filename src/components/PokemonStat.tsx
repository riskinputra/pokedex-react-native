import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { map, result } from 'lodash';
import { LinearGradient } from "expo-linear-gradient";

import PokemonsChip from './PokemonsChip'

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    padding: 16,
  },
  stat: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: 'center'
  },
  label: {
    marginRight: RFValue(10),
    textTransform: 'uppercase',
    width: 40
  },
  lineChart: {
    flex: 1,
    borderRadius: 50,
    maxWidth: '100%',
    height: 8
  },
  count: {
    marginRight: RFValue(10)
  },
  weakness: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 12
  }
})

interface PokemonStatProps {
  status: Array<any>;
  colors: any;
  weakness: any;
}
const PokemonStat = ({ status, colors, weakness }: PokemonStatProps) => {
  const { primary, secondary }: any = colors
  const statAbbreviation = (stat: string) => {
    switch (stat) {
      case 'attack':
        return 'atk'
      case 'defense':
        return 'def'
      case 'special-attack':
        return 'satk'
      case 'special-defense':
        return 'sdef'
      case 'speed':
        return 'spd'
      case 'accuracy':
        return 'acc'
      case 'evasion':
        return 'eva'
      default:
        return stat
    }
  }

  const statusBar = map(status, (stat, index) => {
    const getStatNum = result(stat, 'base_stat', 0)
    const getStatName = result(stat, 'stat.name', '')
    const statCounter = getStatNum < 10 ? `00${getStatNum}` : (getStatNum < 100 ? `0${getStatNum}` : getStatNum)
    const statName = statAbbreviation(getStatName)

    return (
      <View style={styles.stat} key={index}>
        <Text style={[styles.label, { color: primary }]}>{statName}</Text>
        <Text style={[styles.count, { color: primary }]}>{statCounter}</Text>
        <View style={[styles.lineChart, { backgroundColor: '#F0F0F0', width: '100%' }]}>
          <LinearGradient
            colors={[primary, secondary]}
            style={[styles.lineChart, { width: `${getStatNum}%` }]}
          >
          </LinearGradient>
        </View>
      </View>
    )
  })

  const pokemonWeakness = map(weakness, (weak, index) => (
    <View
      key={`${weak.name}-types-${index}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.333333333333336%',
        marginBottom: 16
      }}
    >
      <PokemonsChip
        key={`${weak.name}-types-${index}`}
        id={`${weak.name}-types-${index}`}
        types={weak.name}
      />
      <Text style={{ fontSize: 20 }}>2X</Text>
    </View>
  ))

  return (
    <View style={styles.container}>
      {statusBar}
      <View>
        <View style={{ marginTop: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Text style={{ color: primary, fontSize: 20 }}>Weakness</Text>
        </View>
        <View style={styles.weakness}>
          {pokemonWeakness}
        </View>
      </View>
    </View>
  )
}

export default PokemonStat
