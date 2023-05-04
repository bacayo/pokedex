import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { Typography, Box } from "@mui/material";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import Link from "next/link";

interface Column {
  id:
    | "id"
    | "name"
    | "type"
    | "total"
    | "hp"
    | "attack"
    | "defence"
    | "spAtk"
    | "spDef"
    | "speed";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "#", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "right",
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
    align: "right",
  },
  {
    id: "hp",
    label: "HP",
    minWidth: 170,
    align: "right",
  },
  {
    id: "attack",
    label: "Attack",
    minWidth: 170,
    align: "right",
  },
  {
    id: "defence",
    label: "Defence",
    minWidth: 170,
    align: "right",
  },
  {
    id: "spAtk",
    label: "Sp.Atk",
    minWidth: 170,
    align: "right",
  },
  {
    id: "spDef",
    label: "Sp.Def",
    minWidth: 170,
    align: "right",
  },
  {
    id: "speed",
    label: "Speed",
    minWidth: 170,
    align: "right",
  },
];

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

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { pokemon } = useAppSelector((state) => state.pokemon);
  const rows = pokemon;

  const theme = useTheme();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer elevation={5} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>#</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography>Name</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography>Type</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>HP</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Attack</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Defense</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Sp.Atk</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Sp.Def</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Speed</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              hover
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&.MuiTableRow-root:hover": { backgroundColor: "#fff9e0 " },
              }}
            >
              <TableCell component="th" scope="row">
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  flexDirection={"row"}
                >
                  <div>
                    {row.sprites.front_shiny !== null && (
                      <Image
                        alt="poke-img"
                        src={row.sprites.front_shiny}
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                  <Typography>{index + 1}</Typography>
                </Box>
              </TableCell>
              <TableCell align="left">
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/pokemon/${encodeURIComponent(row.name)}`}
                >
                  <Typography
                    fontWeight="600"
                    color={theme.palette.info.dark}
                    textTransform="capitalize"
                  >
                    {row.name}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell align="right">
                {row.types.map((item) => (
                  <Box
                    marginY={1}
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
                ))}
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight={600}>
                  {row.stats[0].base_stat +
                    row.stats[1].base_stat +
                    row.stats[2].base_stat +
                    row.stats[3].base_stat +
                    row.stats[4].base_stat +
                    row.stats[5].base_stat}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.stats[0].base_stat}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.stats[1].base_stat}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.stats[2].base_stat}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.stats[3].base_stat}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.stats[4].base_stat}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.stats[5].base_stat}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
