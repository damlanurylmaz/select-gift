import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Alert,
  Snackbar,
  Paper,
  useTheme,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import QuestionForm from "../components/QuestionForm";
import GiftSuggestions from "../components/GiftSuggestions";

interface FormValues {
  age: string;
  gender: string;
  interests: string;
  budget: string;
  occasion: string;
}

interface Suggestion {
  title: string;
  description: string;
  price: string;
  stores: string;
}

export default function Home() {
  const theme = useTheme();
  const [step, setStep] = React.useState(1);
  const [giftSuggestions, setGiftSuggestions] = React.useState<Suggestion[]>(
    []
  );
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Bir hata oluştu");
      }

      setGiftSuggestions(data.suggestions);
      setStep(2);
    } catch (error) {
      console.error("Error:", error);
      setError("Hediye önerileri alınırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setGiftSuggestions([]);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            theme.palette.mode === "dark"
              ? "#121212"
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
              background:
                theme.palette.mode === "dark"
                  ? "#1e1e1e"
                  : theme.palette.background.paper,
            }}
          >
            <Stack spacing={4}>
              <Box textAlign="center" mb={4}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)"
                        : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI Hediye Danışmanı
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ maxWidth: "600px", mx: "auto" }}
                >
                  Sevdikleriniz için mükemmel hediyeyi bulmak artık çok kolay!
                </Typography>
              </Box>

              {step === 1 && <QuestionForm onSubmit={handleSubmit} />}
              {step === 2 && giftSuggestions.length > 0 && (
                <GiftSuggestions
                  suggestions={giftSuggestions}
                  onBack={handleBack}
                />
              )}
            </Stack>
          </Paper>

          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError("")}
          >
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Container>
      </Box>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(4px)",
          background: "rgba(0, 0, 0, 0.8)",
        }}
        open={isLoading}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Hediye önerileri hazırlanıyor...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
