import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../redux/slices/pokemonSlice";
import pokemonTypeReducer from "../redux/slices/pokemonTypeSlice";
import pokemonDetailReducer from "../redux/slices/pokemonDetailSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonType: pokemonTypeReducer,
    pokemonDetail: pokemonDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
