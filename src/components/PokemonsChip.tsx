import React from "react";
import { View, StyleSheet, Image } from "react-native";
import * as images from "./images/types";
import { typesColor } from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 50,
    position: "relative",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  icon: {
    height: 15,
    width: 15,
  },
});

interface PokemonsIconProps {
  types: string;
  key: string;
  id: string;
}

const PokemonsIcon = ({ key, id, types }: PokemonsIconProps) => {
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
      {...{ key, id }}
    >
      <Image source={imageIcon[types]} style={styles.icon} />
    </View>
  );
};

export default PokemonsIcon;
