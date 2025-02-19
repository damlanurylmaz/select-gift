import { CohereClient } from "cohere-ai";
import { translateBatch } from "./translate";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const translateGender = (gender: string) => {
  switch (gender) {
    case "male":
      return "man";
    case "female":
      return "woman";
    default:
      return "person";
  }
};

const translateOccasion = (occasion: string) => {
  switch (occasion) {
    case "birthday":
      return "birthday";
    case "graduation":
      return "graduation";
    case "anniversary":
      return "anniversary";
    default:
      return "special occasion";
  }
};

async function translateSuggestions(suggestions: any[]) {
  try {
    const USD_TO_TRY = 32;

    const translatedSuggestions = await Promise.all(
      suggestions.map(async (suggestion) => {
        const [translatedTitle, translatedDesc, translatedStores] =
          await translateBatch([
            suggestion.title.replace(/[*"]/g, ""),
            suggestion.description,
            suggestion.stores.replace(/Available at: /i, ""),
          ]);

        const priceMatch = suggestion.price.match(/\$(\d+)/);
        const priceUSD = priceMatch ? parseInt(priceMatch[1]) : 0;
        const priceTRY = priceUSD * USD_TO_TRY;

        return {
          title: translatedTitle,
          description: translatedDesc,
          price: priceMatch ? `${priceTRY.toLocaleString("tr-TR")} TL` : "",
          stores: `Mağazalar: ${translatedStores}`,
        };
      })
    );

    const isValid = translatedSuggestions.every(
      (s) => s.title && s.description && s.stores
    );

    if (!isValid) {
      console.error("Some translations are missing");
      return suggestions;
    }

    return translatedSuggestions;
  } catch (error) {
    console.error("Translation error:", error);
    return suggestions;
  }
}

function parseAIResponse(text: string) {
  const suggestions = text.match(/\d+\.\s*([^]*?)(?=\d+\.|$)/g) || [];

  return suggestions
    .map((suggestion) => {
      const lines = suggestion
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const title = lines[0]?.replace(/^\d+\.\s*/, "");

      return {
        title: title || "",
        description: lines[1] || "",
        price: lines[2] || "",
        stores: lines[3] || "",
      };
    })
    .filter(
      (suggestion) =>
        suggestion.title &&
        suggestion.description &&
        !suggestion.title.includes("QUERY") &&
        !suggestion.title.includes("EXAMPLE")
    );
}

interface GiftSuggestionParams {
  age: number;
  gender: string;
  interests: string[];
  budget: number;
  occasion: string;
}

export const generateGiftSuggestions = async (
  preferences: GiftSuggestionParams
) => {
  const budgetUSD = Math.round(preferences.budget / 32);

  const prompt = `Generate exactly 4 gift suggestions for a ${
    preferences.age
  }-year-old ${translateGender(preferences.gender)} 
who is interested in ${preferences.interests.join(", ")}.
Budget: $${budgetUSD} (strict limit)
Occasion: ${translateOccasion(preferences.occasion)}

IMPORTANT:
- Generate EXACTLY 4 suggestions
- Suggestions MUST be related to their interests (${preferences.interests.join(
    ", "
  )})
- Each item must be available in Turkey
- Prices must be within budget
- Include specific Turkish store names (e.g. Trendyol, Hepsiburada, D&R, Teknosa)

Format each suggestion exactly like this:

1. [Item Name]
[Item Description]
$[Price]
Available at: [Store1], [Store2], [Store3]

2. [Item Name]
[Item Description]
$[Price]
Available at: [Store1], [Store2], [Store3]

3. [Item Name]
[Item Description]
$[Price]
Available at: [Store1], [Store2], [Store3]

4. [Item Name]
[Item Description]
$[Price]
Available at: [Store1], [Store2], [Store3]`;

  try {
    const response = await cohere.generate({
      prompt,
      model: "command",
      maxTokens: 1000,
      temperature: 0.7,
    });

    const suggestions = parseAIResponse(response.generations[0].text);

    if (suggestions.length !== 4) {
      throw new Error("AI must generate exactly 4 suggestions");
    }

    const translatedSuggestions = await translateSuggestions(suggestions);

    if (!translatedSuggestions || translatedSuggestions.length !== 4) {
      console.error("Translation failed, returning original suggestions");
      return suggestions;
    }

    return translatedSuggestions;
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};
