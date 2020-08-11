import methods from "./methods";

// POKEMON API
// Methods GET

const getPokemonsList = (): any => methods.GET_API("pokemon/");

export default {
  getPokemonsList,
};
