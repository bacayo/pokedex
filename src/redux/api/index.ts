import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonType, Pokemon } from "@/types/types";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

// Get all Pokemon list

const fetchPokemonData = (pokemon: any) => {
  let url = pokemon.url;
  fetch(url)
    .then((res) => res.json())
    .then((pokeData) => {
      console.log(pokeData);
      return pokeData;
    });
};

export const getPokemonAsync = createAsyncThunk<Pokemon[]>(
  "pokemon/getPokemonAsync",
  async () => {
    const response = await axios.get("pokemon");
    const allPokemon = response.data.results;

    const pokeListPromises = allPokemon.map(async (pokemon: any) => {
      const pokeListAll = await axios.get(pokemon.url);
      return pokeListAll.data;
    });

    const pokeListAllResponses = await Promise.all(pokeListPromises);
    return pokeListAllResponses;
  }
);

export const getPokemonTypesAsync = createAsyncThunk<PokemonType[]>(
  "pokemonTypeSlice/getPokemonTypesAsync",
  async () => {
    const res = await axios.get("type");
    return res.data.results;
  }
);
