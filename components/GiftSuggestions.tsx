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
  const giftSuggestions = suggestions;

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

      <Grid container spacing={2}>
        {giftSuggestions.map((suggestion, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              elevation={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[4],
                },
                borderRadius: 2,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  {suggestion.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    minHeight: "80px",
                  }}
                >
                  {suggestion.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mt: 2,
                    fontSize: "0.875rem",
                    fontStyle: "italic",
                  }}
                >
                  {suggestion.stores}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.success.main,
                    textAlign: "right",
                    mt: "auto",
                  }}
                >
                  {suggestion.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
