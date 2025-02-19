import { useState } from "react";
import type { Suggestion, FormData } from "../types";

export const useGiftSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Bir hata oluştu");
      }

      setSuggestions(data.suggestions);
      return data.suggestions;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestions,
    isLoading,
    error,
    fetchSuggestions,
  };
};
