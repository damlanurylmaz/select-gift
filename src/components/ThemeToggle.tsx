import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  const theme = useTheme();

  return (
    <IconButton
      onClick={onToggle}
      sx={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
      }}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
