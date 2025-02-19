import React from "react";
import { Box, Container, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(45deg, #1a237e 30%, #311b92 90%)"
            : "linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: theme.palette.background.paper,
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
