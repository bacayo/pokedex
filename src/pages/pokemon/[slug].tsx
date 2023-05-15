import { getPokemonDetailAsync } from "@/redux/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  CssBaseline,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import Image from "next/image";
import PokeTypeChip from "@/components/PokeTypeChip";
import axios from "axios";
import { PokemonSpecies } from "@/types/types";
import PokemonDetailRow from "@/components/pokemonDetail/PokemonDetailRow";
import Link from "next/link";

const Pokemon = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;
  const theme = useTheme();

  const { pokemonDetail, isLoading } = useAppSelector(
    (state) => state.pokemonDetail
  );
  const [species, setSpecies] = React.useState<PokemonSpecies | null>(null);

  const getSpecies = async () => {
    if (!isLoading) {
      const res = await axios.get(pokemonDetail?.species.url as string);
      setSpecies(res.data);
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (slug) {
      dispatch(getPokemonDetailAsync(slug as string));
      // getSpecies();
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (isLoading === "fulfilled") {
      axios
        .get(pokemonDetail?.species.url as string)
        .then((res) => setSpecies(res.data))
        .catch((err) => console.log(err));
    }
  }, [isLoading]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Paper
          elevation={2}
          sx={{
            marginY: 2,
          }}
        >
          <Typography
            variant="h3"
            textTransform="capitalize"
            color={theme.palette.text.primary}
            textAlign="center"
            gutterBottom
            fontWeight={theme.typography.fontWeightMedium}
          >
            {slug}
          </Typography>
          {/* Left side big image */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <Box flex={1}>
              {pokemonDetail?.sprites.other["official-artwork"]
                .front_default && (
                <Image
                  alt="poke-image"
                  width={300}
                  height={300}
                  src={
                    pokemonDetail?.sprites.other["official-artwork"]
                      .front_default
                  }
                />
              )}
            </Box>
            {/* Pokedex data */}
            <Box flex={1}>
              <Typography gutterBottom variant="h4" fontWeight="600">
                Pokedex Data
              </Typography>
              <Divider />
              <PokemonDetailRow pokemonDetail={pokemonDetail?.id} name="id" />
              <Divider />
              <Box
                display="flex"
                flexDirection="row"
                // justifyContent="space-around"
                alignItems="center"
              >
                <Typography width={120} textTransform="capitalize" gutterBottom>
                  type
                </Typography>
                <Box
                  // width="0%"
                  display="flex"
                  justifyContent="flex-start"
                  flexDirection="row"
                  marginLeft={8}
                >
                  {pokemonDetail?.types.map((item) => (
                    <PokeTypeChip key={item.type.name} item={item} />
                  ))}
                </Box>
              </Box>
              <Divider />
              <Box display="flex" flexDirection="row">
                <Typography width={120} gutterBottom textTransform="capitalize">
                  species
                </Typography>
                <Typography marginLeft={8} gutterBottom fontWeight="400">
                  {species?.genera[7].genus}
                </Typography>
              </Box>
              <Divider />
              <PokemonDetailRow
                name="height"
                pokemonDetail={Number(pokemonDetail?.height) / 10 + " m"}
              />
              <Divider />
              <PokemonDetailRow
                name="weight"
                pokemonDetail={Number(pokemonDetail?.weight) / 10 + " kg"}
              />
              <Divider />
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography width={120} textTransform="capitalize" gutterBottom>
                  abilities
                </Typography>
                <Box
                  // width="0%"
                  display="flex"
                  justifyContent="flex-start"
                  flexDirection="row"
                  marginLeft={8}
                >
                  {pokemonDetail?.abilities.map((item) => (
                    <Link
                      style={{
                        margin: 2,
                        textDecoration: "none",
                        textTransform: "capitalize",
                      }}
                      href={item.ability.url}
                      key={item.ability.name}
                    >
                      <Typography gutterBottom>{item.ability.name}</Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
            {/* Pokedex training and breeding */}
            <Box
              border={1}
              borderColor={"black"}
              display="flex"
              flexDirection="column"
              flex={1}
            >
              <Typography gutterBottom variant="h4" fontWeight={600}>
                Training
              </Typography>
              <Divider />
              <Box display="flex" flexDirection="row">
                <Typography width={200} gutterBottom>
                  Ev Yield
                </Typography>
                {/* <Typography gutterBottom>
                 
                </Typography> */}
                {pokemonDetail?.stats.map(
                  (item) =>
                    item.effort === 1 && (
                      <Typography
                        textTransform="capitalize"
                        gutterBottom
                        key={item.stat.name}
                      >
                        {item.effort} {item.stat.name.replace(/-/g, " ")},
                      </Typography>
                    )
                )}
              </Box>
              <Divider />
              <Box display="flex" flexDirection="row">
                <Typography width={200} gutterBottom>
                  catch rate
                </Typography>
                <Typography gutterBottom>{species?.capture_rate}</Typography>
              </Box>
              <Divider />
              <Box display="flex" flexDirection="row">
                <Typography width={200} gutterBottom>
                  base friendship
                </Typography>
                <Typography gutterBottom>{species?.base_happiness}</Typography>
              </Box>
              <Divider />

              <Box display="flex" flexDirection="row">
                <Typography width={200} gutterBottom>
                  base exp
                </Typography>
                <Typography gutterBottom>
                  {pokemonDetail?.base_experience}
                </Typography>
              </Box>
              <Divider />
              <Box display="flex" flexDirection="row">
                <Typography width={200} gutterBottom>
                  growth rate
                </Typography>
                <Typography textTransform="capitalize" gutterBottom>
                  {species?.growth_rate.name.replace(/-/g, " ")}
                </Typography>
              </Box>
              <Box>
                <Typography gutterBottom variant="h4" fontWeight="600">
                  Breeding
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Pokemon;
