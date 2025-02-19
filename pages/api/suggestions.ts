import type { NextApiRequest, NextApiResponse } from "next";
import { generateGiftSuggestions } from "../../utils/ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { age, gender, interests, budget, occasion } = req.body;

    const suggestions = await generateGiftSuggestions({
      age: parseInt(age),
      gender,
      interests: interests.split(",").map((i: string) => i.trim()),
      budget: parseInt(budget),
      occasion,
    });

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: String(error),
    });
  }
}
