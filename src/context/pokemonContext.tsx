import React from "react";

import { createContext, Dispatch } from "react";
import { PokemonsTypes, PokemonState } from "../store/types";
import initialState from "../store/initialState";
import reducer from "../store/reducer";

interface PokemonsContextProps {
  state: PokemonState;
  dispatch: Dispatch<PokemonsTypes>;
}

export const PokemonsContext = createContext<PokemonsContextProps>({
  dispatch: () => {
    // Dispatch initial value
  },
  state: initialState,
});

// Create a provider for components to consume and subscribe to changes
export const PokemonsContextProvider = (props: any) => {
  const [state, dispatch]: any = React.useReducer(reducer, initialState);

  return (
    <PokemonsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PokemonsContext.Provider>
  );
};
