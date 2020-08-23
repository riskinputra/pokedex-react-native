import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { width }
})

const PokemonMoves = () => {
  return (
    <View style={styles.container}>
      <Text>PokemonMoves</Text>
    </View>
  )
}

export default PokemonMoves
