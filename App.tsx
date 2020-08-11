import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PokemonsContextProvider } from "./src/context/pokemonContext";

import Home from "./src/Pages/Home";
import LoadAssets from "./src/components/LoadAssets";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const PagesState = createStackNavigator();
const PagesNavigator = () => {
  return (
    <PagesState.Navigator headerMode="none">
      <PagesState.Screen name="Home" component={Home} />
    </PagesState.Navigator>
  );
};

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <PokemonsContextProvider>
        <PagesNavigator />
      </PokemonsContextProvider>
    </LoadAssets>
  );
}
