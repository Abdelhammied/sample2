import { Box, styled } from "@mui/material";

export const SearchItemStyledBox = styled(Box)(({ theme }) => ({
  width: theme.spacing(40),
  gap: theme.spacing(2),
  border: `2px solid #eee`,
  borderRadius: "5px",
  padding: theme.spacing(),
  cursor: "pointer",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export const HoverItemStyledBox = styled(Box)(({ theme }) => ({
  background: "#eee",
  padding: theme.spacing(1),
  border: `1px solid #ccc`,
  zIndex: 99999,
}));
