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
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Header } from "@/components/home/header/Header";
import PokeGrid from "@/components/PokeGrid/PokeGrid";

import { getPokemonAsync, getPokemonTypesAsync } from "@/redux/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
}

const Home = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  // const { pokemon } = useAppSelector((state) => state.pokemon);
  const { pokemonType } = useAppSelector(
    (state: RootState) => state.pokemonType
  );

  const [type, setType] = useState("");

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
            <InputLabel>Age</InputLabel>
            <Select value={type} onChange={handleChange}>
              <MenuItem value="All">--All--</MenuItem>
              {pokemonType?.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginY={3}>
          <PokeGrid />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
