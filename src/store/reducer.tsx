import * as types from "./types";

const reducer = (
  state: types.PokemonState,
  action: types.PokemonsTypes
): types.PokemonState => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_POKEMONS_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export default reducer;
