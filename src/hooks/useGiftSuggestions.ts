import { useState } from "react";
import type { Suggestion, FormData } from "../types";

export const useGiftSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        return true;
      } else {
        setError("Hediye önerileri alınamadı.");
        return false;
      }
    } catch (error) {
      setError("Hediye önerileri alınırken bir hata oluştu.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestions,
    isLoading,
    error,
    fetchSuggestions,
    clearError: () => setError(""),
  };
};
