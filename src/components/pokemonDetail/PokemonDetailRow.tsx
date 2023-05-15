import React from "react";
import { Box, Typography } from "@mui/material";
import { Pokemon } from "@/types/types";

interface Props {
  //   pokemonDetail: Pokemon | undefined;
  pokemonDetail: any;
  name: string;
}

const PokemonDetailRow = ({ pokemonDetail, name }: Props) => {
  return (
    <Box display="flex" flexDirection="row">
      <Typography width={120} gutterBottom textTransform="capitalize">
        {name}
      </Typography>
      <Typography marginLeft={8} fontWeight="400">
        {pokemonDetail}
      </Typography>
    </Box>
  );
};

export default PokemonDetailRow;
