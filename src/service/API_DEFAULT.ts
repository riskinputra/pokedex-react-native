import axios from "axios";

const POKEMONS_API = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default POKEMONS_API;
