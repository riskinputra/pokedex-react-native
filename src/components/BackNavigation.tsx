import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(16),
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonArrow: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

});

interface BackNavigationProps {
  isScroll: boolean;
  name: string
}

const BackNavigation = ({ isScroll, name }: BackNavigationProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonArrow}>
        <Ionicons
          name="md-arrow-round-back"
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {isScroll && (
        <View style={{ width: width - 100, paddingHorizontal: RFValue(16) }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFF',
              fontSize: 24,
              textTransform: 'capitalize',
              fontWeight: 'bold'
            }}
          >
            {name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BackNavigation;
