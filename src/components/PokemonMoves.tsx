import React from 'react'
import { View, Text, Dimensions, StyleSheet, FlatList } from 'react-native'

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: { width, marginTop: 24 },
  item: {
    paddingVertical: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#EDEDED'
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 8,
    color: '#A4A4A4'
  }
})

interface PokemonMovesProps {
  moves: any
}

const Item = ({ detail, name }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text>{detail}</Text>
  </View>
);

const PokemonMoves = ({ moves }: PokemonMovesProps) => {
  console.log('object', moves)
  const renderItem = ({ item }: any) => (
    <Item detail={item.detail} name={item.name} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={moves}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

export default PokemonMoves
