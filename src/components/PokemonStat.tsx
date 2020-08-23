import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { map, result } from 'lodash';

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
  }
})

interface PokemonStatProps {
  status: Array<any>,
  bgColor: string
}
const PokemonStat = ({ status, bgColor }: PokemonStatProps) => {
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

  const statusBar = map(status, (stat) => {
    const getStatNum = result(stat, 'base_stat', 0)
    const getStatName = result(stat, 'stat.name', '')
    const statCounter = getStatNum < 10 ? `00${getStatNum}` : (getStatNum < 100 ? `0${getStatNum}` : getStatNum)
    const statName = statAbbreviation(getStatName)

    return (
      <View style={styles.stat}>
        <Text style={[styles.label, { color: bgColor }]}>{statName}</Text>
        <Text style={[styles.count, { color: bgColor }]}>{statCounter}</Text>
        <View style={[styles.lineChart, { backgroundColor: '#F0F0F0', width: '100%' }]}>
          <View style={[styles.lineChart, { backgroundColor: bgColor, width: `${getStatNum}%` }]}></View>
        </View>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      {statusBar}
    </View>
  )
}

export default PokemonStat
