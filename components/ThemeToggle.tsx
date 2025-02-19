import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface ThemeToggleProps {
  onToggle: () => void;
}

export default function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const theme = useTheme();

  return (
    <IconButton
      onClick={onToggle}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        "&:hover": {
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
