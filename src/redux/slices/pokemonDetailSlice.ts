import { createSlice } from "@reduxjs/toolkit";
import { getPokemonDetailAsync } from "../api";
import { Pokemon } from "@/types/types";

interface PokemonDetailInterface {
  isLoading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
  pokemonDetail: Pokemon | undefined;
}

const initialState: PokemonDetailInterface = {
  isLoading: "idle",
  error: undefined,
  pokemonDetail: undefined,
};

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPokemonDetailAsync.pending, (state) => {
      state.isLoading = "pending";
    });
    builder.addCase(getPokemonDetailAsync.fulfilled, (state, action) => {
      state.isLoading = "fulfilled";
      state.pokemonDetail = action.payload;
    });
    builder.addCase(getPokemonDetailAsync.rejected, (state, action) => {
      state.isLoading = "rejected";
      state.error = action.error.message;
    });
  },
});

export default pokemonDetailSlice.reducer;
