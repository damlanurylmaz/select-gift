import type { NextApiRequest, NextApiResponse } from "next";
import { generateGiftSuggestions } from "../../utils/ai";

export const config = {
  maxDuration: 60, // 60 saniyeye düşürelim
  api: {
    bodyParser: true,
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { age, gender, interests, budget, occasion } = req.body;

    // Request timeout'u ayarlayalım
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 55000)
    );

    const suggestionPromise = generateGiftSuggestions({
      age: parseInt(age),
      gender,
      interests: interests.split(",").map((i: string) => i.trim()),
      budget: parseInt(budget),
      occasion,
    });

    // İlk tamamlanan promise'i alalım
    const suggestions = await Promise.race([suggestionPromise, timeoutPromise]);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("API Error:", error);

    // Daha detaylı hata mesajı
    const errorMessage =
      error instanceof Error ? error.message : "Bir hata oluştu";

    res.status(500).json({
      message: "Hediye önerileri alınırken bir hata oluştu",
      error: errorMessage,
      details: String(error),
    });
  }
}
