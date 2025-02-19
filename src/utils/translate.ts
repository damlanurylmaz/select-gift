const MYMEMORY_API_URL = "https://api.mymemory.translated.net/get";

export async function translateText(text: string): Promise<string> {
  if (!text || text.trim() === "") return "";

  try {
    const response = await fetch(
      `${MYMEMORY_API_URL}?q=${encodeURIComponent(
        text
      )}&langpair=en|tr&de=your@email.com`
    );
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }

    // Çeviri başarısız olursa orijinal metni döndür
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

// Birden fazla metni çevirmek için
export async function translateBatch(texts: string[]): Promise<string[]> {
  const validTexts = texts.filter((text) => text && text.trim() !== "");

  try {
    const promises = validTexts.map((text) => translateText(text));
    return await Promise.all(promises);
  } catch (error) {
    console.error("Batch translation error:", error);
    return texts;
  }
}

// Test fonksiyonu
export async function testTranslation() {
  try {
    const result = await translateText("Hello, this is a test message.");
    console.log("Translation test result:", result);
    return result === "Merhaba, bu bir test mesajıdır.";
  } catch (error) {
    console.error("Translation test failed:", error);
    return false;
  }
}
