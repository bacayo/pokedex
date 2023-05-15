import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonType, Pokemon } from "@/types/types";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

// Get all Pokemon list
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

type PokemonDetailType = {
  name: string | string[] | undefined;
};

export const getPokemonDetailAsync = createAsyncThunk<Pokemon, string>(
  "pokemonDetailSlice/getPokemonDetailAsync",
  async (name: string) => {
    const response = await axios.get(`pokemon/${name}`);
    return response.data;
  }
);
