export const FETCH_POKEMONS_DATA = "FETCH_POKEMONS_DATA";
export type FETCH_POKEMONS_DATA = typeof FETCH_POKEMONS_DATA;

export interface PokemonsList {
  name: string;
  url: string;
}

export interface PokemonState {
  next: string;
  previous: string;
  pokemons: Array<PokemonsList>;
}

export interface PokemonAction {
  type: FETCH_POKEMONS_DATA;
  payload: PokemonState;
}

export type PokemonsTypes = PokemonAction;
