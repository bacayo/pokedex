import React from "react";
import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Header = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography padding={2} variant="h3" textAlign="center">
        Complete Pokémon Pokédex
      </Typography>
      <Box
        borderRadius={2}
        padding={1}
        sx={{
          backgroundColor: theme.palette.grey.A200,
        }}
      >
        <Typography margin={2}>
          This is a full list of every Pokémon from all 9 generations of the
          Pokémon series, along with their main stats.
        </Typography>
        <Typography margin={2}>
          The table is sortable by clicking a column header, and searchable by
          using the controls above it.
        </Typography>
      </Box>
    </Box>
  );
};
