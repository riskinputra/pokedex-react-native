import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as images from "./images/types";
import { typesColor } from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 50,
    position: "relative",
    height: 30,
    width: 'auto',
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 5,
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  icon: {
    height: 15,
    width: 15,
  },
  label: {
    textTransform: 'capitalize', marginLeft: 8, color: '#fff'
  }
});

interface PokemonsLabelProps {
  types: string;
  id: string;
}

const PokemonsLabel = ({ id, types }: PokemonsLabelProps) => {
  const imageIcon: any = images;
  const typeColor: any = typesColor;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: typeColor[types].color,
          shadowColor: typeColor[types].shadow,
        },
      ]}
      {...{ id }}
    >
      <Image source={imageIcon[types]} style={styles.icon} />
      <Text style={styles.label}>{types}</Text>
    </View>
  );
};

export default PokemonsLabel;
