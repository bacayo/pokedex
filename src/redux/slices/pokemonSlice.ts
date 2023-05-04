import { createSlice } from "@reduxjs/toolkit";
import { getPokemonAsync } from "../api";
import { Pokemon } from "@/types/types";

interface PokemonState {
  isLoading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
  pokemon: Pokemon[];
}

const initialState: PokemonState = {
  isLoading: "idle",
  error: undefined,
  pokemon: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPokemonAsync.pending, (state) => {
      state.isLoading = "pending";
    });
    builder.addCase(getPokemonAsync.fulfilled, (state, action) => {
      state.isLoading = "fulfilled";
      state.pokemon = action.payload;
    });
    builder.addCase(getPokemonAsync.rejected, (state, action) => {
      state.isLoading = "rejected";
      state.error = action.error.message;
    });
  },
});

export default pokemonSlice.reducer;
