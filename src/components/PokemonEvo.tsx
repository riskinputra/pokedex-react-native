import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { width }
})

const PokemonEvo = () => {
  return (
    <View style={styles.container}>
      <Text>PokemonEvo</Text>
    </View>
  )
}

export default PokemonEvo
