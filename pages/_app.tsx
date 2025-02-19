import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "'Poppins', sans-serif",
          allVariants: {
            fontFamily: "'Poppins', sans-serif",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                fontFamily: "'Poppins', sans-serif",
              },
            },
          },
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <ThemeToggle onToggle={toggleColorMode} />
    </MUIThemeProvider>
  );
}

export default MyApp;
