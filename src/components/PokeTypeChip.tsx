import { Box, Typography } from "@mui/material";
import Link from "next/link";

const bgcolor = (type: string) => {
  if (type === "grass") {
    return "#8bd36a";
  } else if (type === "poison") {
    return "#b76ea4";
  } else if (type === "fire") {
    return "#ff5f3f";
  } else if (type == "flying") {
    return "#9aa7fa";
  } else if (type === "dragon") {
    return "#8b7cec";
  } else if (type === "water") {
    return "#52a7fa";
  } else if (type === "bug") {
    return "#b7c43f";
  } else if (type === "normal") {
    return "#b7b6a4";
  } else if (type === "fighting") {
    return "#ad6353";
  } else if (type === "ground") {
    return "#e2c46a";
  } else if (type === "rock") {
    return "#c5b678";
  } else if (type === "ghost") {
    return "#7d7cc1";
  } else if (type === "steel") {
    return "#b7b6c1";
  } else if (type === "electric") {
    return "#fed24d";
  } else if (type === "psychic") {
    return "#fd6da2";
  } else if (type === "ice") {
    return "#7dd3fa";
  } else if (type === "dark") {
    return "#8b6e5b";
  } else if (type === "fairy") {
    return "#f1a7ec";
  }
};

const PokeTypeChip = ({ item }: { item: any }) => {
  return (
    <Box
      marginY={1}
      marginX={0.5}
      display="flex"
      justifyContent={"center"}
      key={item.type.name}
      borderRadius={1}
      width={72}
      bgcolor={bgcolor(item.type.name)}
    >
      <Link
        style={{ textDecoration: "none" }}
        href={`/type/${encodeURIComponent(item.type.name)}`}
      >
        <Typography textTransform="uppercase" color="#ebf2e4">
          {item.type.name}
        </Typography>
      </Link>
    </Box>
  );
};

export default PokeTypeChip;
