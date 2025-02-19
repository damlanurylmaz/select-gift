export const giftTranslations: { [key: string]: string } = {
  // Kategoriler
  book: "kitap",
  watch: "saat",
  headphones: "kulaklık",
  camera: "kamera",
  wallet: "cüzdan",
  backpack: "sırt çantası",
  jewelry: "takı",
  game: "oyun",
  phone: "telefon",
  tablet: "tablet",
  speaker: "hoparlör",
  smart: "akıllı",
  wireless: "kablosuz",
  set: "seti",
  premium: "premium",
  professional: "profesyonel",
  digital: "dijital",
  portable: "taşınabilir",

  // Sıfatlar
  perfect: "mükemmel",
  great: "harika",
  high: "yüksek",
  quality: "kaliteli",
  modern: "modern",
  stylish: "şık",
  elegant: "zarif",
  beautiful: "güzel",
  comfortable: "rahat",
  durable: "dayanıklı",
  unique: "benzersiz",
  special: "özel",
  luxury: "lüks",
  classic: "klasik",

  // Özellikler
  bluetooth: "bluetooth",
  waterproof: "su geçirmez",
  rechargeable: "şarj edilebilir",
  adjustable: "ayarlanabilir",
  leather: "deri",
  stainless: "paslanmaz",
  steel: "çelik",
  gold: "altın",
  silver: "gümüş",

  // Bağlaçlar ve Edatlar
  with: "ile",
  for: "için",
  and: "ve",
  in: "içinde",
  of: "",
  the: "",
  a: "",
  an: "",
};

export function translateText(text: string): string {
  let translatedText = text.toLowerCase();

  Object.entries(giftTranslations).forEach(([eng, tr]) => {
    const regex = new RegExp(`\\b${eng}\\b`, "gi");
    translatedText = translatedText.replace(regex, tr);
  });

  translatedText =
    translatedText.charAt(0).toUpperCase() + translatedText.slice(1);

  return translatedText;
}
