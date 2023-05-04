import { createSlice } from "@reduxjs/toolkit";
import { getPokemonTypesAsync } from "../api";
import { PokemonType } from "@/types/types";

interface PokemonTypeState {
  pokemonType: PokemonType[] | null;
  isLoading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
}

const initialState: PokemonTypeState = {
  pokemonType: null,
  error: undefined,
  isLoading: "idle",
};

const pokemonTypeSlice = createSlice({
  name: "pokemonType",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPokemonTypesAsync.pending, (state) => {
      state.isLoading = "pending";
    });
    builder.addCase(getPokemonTypesAsync.fulfilled, (state, action) => {
      state.isLoading = "fulfilled";
      state.pokemonType = action.payload;
    });
    builder.addCase(getPokemonTypesAsync.rejected, (state, action) => {
      state.isLoading = "rejected";
      state.error = action.error.message;
    });
  },
});

export default pokemonTypeSlice.reducer;
