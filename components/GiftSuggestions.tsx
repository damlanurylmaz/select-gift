import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Button,
  Paper,
} from "@mui/material";
import { CardGiftcard, ArrowBack } from "@mui/icons-material";

interface Suggestion {
  title: string;
  description: string;
  price: string;
  stores: string;
}

interface GiftSuggestionsProps {
  suggestions: Suggestion[];
  onBack: () => void;
}

export default function GiftSuggestions({
  suggestions = [],
  onBack,
}: GiftSuggestionsProps) {
  const theme = useTheme();

  if (!suggestions.length) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "#121212"
              : "linear-gradient(45deg, #2196f3 30%, #1976d2 90%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            color: "white",
            textAlign: "center",
          }}
        >
          <CardGiftcard sx={{ fontSize: "3rem" }} />
          <Typography variant="h4" fontWeight="bold">
            Sizin İçin Öneriler
          </Typography>
          <Typography variant="subtitle1">
            İlgi alanlarınıza ve bütçenize uygun hediye önerileri
          </Typography>
        </Box>
      </Paper>

      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{ mb: 4 }}
        variant="outlined"
      >
        Forma Dön
      </Button>

      <Grid container spacing={3}>
        {suggestions.map((suggestion, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  {suggestion.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: "60px" }}
                >
                  {suggestion.description}
                </Typography>
                <Box
                  sx={{
                    mt: "auto",
                    pt: 2,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="success.main"
                    fontWeight="bold"
                  >
                    {suggestion.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {suggestion.stores}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
