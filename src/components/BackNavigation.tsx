import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(16),
  },
  buttonArrow: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  iconArrow: {},
});

const BackNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonArrow}>
        <Ionicons
          name="md-arrow-round-back"
          size={24}
          color="white"
          style={styles.iconArrow}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackNavigation;
