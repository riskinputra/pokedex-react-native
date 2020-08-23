import React from 'react'
import Animated, { interpolate, Extrapolate } from "react-native-reanimated";
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: '#FFF',
    position: 'relative',
    zIndex: 0
  },
  tabsLabel: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 110,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})

interface TabLabelProps {
  index: number;
  currentIndex: Animated.Node<number>;
  bgColor: string;
  name: string;
}

const TabLabel = ({ index, currentIndex, bgColor, name }: TabLabelProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.container,
      ]}
    >
      <Animated.View
        style={
          {
            opacity,
            backgroundColor: bgColor,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999,
            borderRadius: 50,
          }
        }
      >
        <Text
          style={[[styles.tabsLabel, { color: '#FFFFFF', fontWeight: 'bold' }]]}
        >
          {name}
        </Text>
      </Animated.View>
      <Animated.View style={{ zIndex: 0, position: 'relative' }}>
        <Text style={[styles.tabsLabel, { color: '#000000' }]}>{name}</Text>
      </Animated.View>
    </Animated.View>
  )
}

export default TabLabel
