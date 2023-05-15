import {
  Box,
  Container,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Header } from "@/components/home/header/Header";
import PokeGrid from "@/components/PokeGrid/PokeGrid";

import { getPokemonAsync, getPokemonTypesAsync } from "@/redux/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";

const Home = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  // const { pokemon } = useAppSelector((state) => state.pokemon);
  const { pokemonType } = useAppSelector(
    (state: RootState) => state.pokemonType
  );

  const [type, setType] = useState("All");
  const [searchPokemon, setSearchPokemon] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    dispatch(getPokemonAsync());
    dispatch(getPokemonTypesAsync());
  }, [dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Header />
        <Box marginTop={6} display="flex" justifyContent="center">
          <TextField
            sx={{
              width: 300,
              marginX: 2,
            }}
            value={searchPokemon}
            onChange={(e) => setSearchPokemon(e.target.value)}
            id="pokemon-name"
            label="Name"
            variant="outlined"
            size="medium"
          />
          <FormControl
            sx={{
              width: 200,
            }}
          >
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={handleChange}>
              <MenuItem value="All">--All--</MenuItem>
              {pokemonType?.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  <Typography textTransform="capitalize">
                    {item.name}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginY={3}>
          <PokeGrid searchPokemon={searchPokemon} pokeType={type} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
