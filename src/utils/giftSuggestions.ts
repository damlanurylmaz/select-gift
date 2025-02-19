interface GiftCategory {
  category: string;
  items: Array<{
    title: string;
    description: string;
    priceRange: [number, number];
    ageRange: [number, number];
    gender: string[];
    occasions: string[];
  }>;
}

const GIFT_DATABASE: GiftCategory[] = [
  {
    category: "teknoloji",
    items: [
      {
        title: "Akıllı Saat",
        description:
          "Fitness ve sağlık takibi yapabilen modern bir akıllı saat",
        priceRange: [500, 2000],
        ageRange: [15, 60],
        gender: ["male", "female", "other"],
        occasions: ["birthday", "graduation", "anniversary"],
      },
      {
        title: "Kablosuz Kulaklık",
        description: "Yüksek ses kaliteli, gürültü önleyici kablosuz kulaklık",
        priceRange: [400, 1500],
        ageRange: [12, 70],
        gender: ["male", "female", "other"],
        occasions: ["birthday", "graduation"],
      },
      {
        title: "E-kitap Okuyucu",
        description:
          "Binlerce kitabı yanınızda taşıyabileceğiniz kompakt cihaz",
        priceRange: [1000, 3000],
        ageRange: [18, 80],
        gender: ["male", "female", "other"],
        occasions: ["birthday", "graduation", "anniversary"],
      },
    ],
  },
  {
    category: "hobi",
    items: [
      {
        title: "Profesyonel Resim Seti",
        description: "Sanatsal yeteneklerinizi geliştirmek için eksiksiz set",
        priceRange: [300, 1000],
        ageRange: [10, 80],
        gender: ["male", "female", "other"],
        occasions: ["birthday", "graduation"],
      },
      {
        title: "Yoga Seti",
        description: "Mat, blok ve kayış içeren temel yoga ekipmanları",
        priceRange: [200, 800],
        ageRange: [16, 70],
        gender: ["male", "female", "other"],
        occasions: ["birthday", "graduation", "anniversary"],
      },
    ],
  },
  {
    category: "moda",
    items: [
      {
        title: "Deri Cüzdan",
        description: "El yapımı, kaliteli deri cüzdan",
        priceRange: [200, 1000],
        ageRange: [18, 80],
        gender: ["male", "female"],
        occasions: ["birthday", "anniversary"],
      },
      {
        title: "Lüks Kol Saati",
        description: "Şık ve zarif tasarımlı klasik kol saati",
        priceRange: [1000, 5000],
        ageRange: [25, 70],
        gender: ["male", "female"],
        occasions: ["anniversary", "graduation"],
      },
    ],
  },
];

export function generateSuggestions(preferences: {
  age: number;
  gender: string;
  interests: string[];
  budget: number;
  occasion: string;
}) {
  const suggestions = [];

  // Tüm kategorileri dolaş
  for (const category of GIFT_DATABASE) {
    // Her kategorideki ürünleri filtrele
    const matchingItems = category.items.filter(
      (item) =>
        // Bütçe kontrolü
        item.priceRange[0] <= preferences.budget &&
        item.priceRange[1] >= preferences.budget &&
        // Yaş kontrolü
        item.ageRange[0] <= preferences.age &&
        item.ageRange[1] >= preferences.age &&
        // Cinsiyet kontrolü
        item.gender.includes(preferences.gender) &&
        // Özel gün kontrolü
        item.occasions.includes(preferences.occasion)
    );

    suggestions.push(
      ...matchingItems.map((item) => ({
        title: item.title,
        description: item.description,
        price: `${item.priceRange[0]} TL - ${item.priceRange[1]} TL`,
      }))
    );
  }

  // Eğer hiç öneri bulunamazsa, sadece bütçe bazlı öneriler sun
  if (suggestions.length === 0) {
    for (const category of GIFT_DATABASE) {
      const budgetItems = category.items.filter(
        (item) =>
          item.priceRange[0] <= preferences.budget &&
          item.priceRange[1] >= preferences.budget
      );

      suggestions.push(
        ...budgetItems.map((item) => ({
          title: item.title,
          description: item.description,
          price: `${item.priceRange[0]} TL - ${item.priceRange[1]} TL`,
        }))
      );
    }
  }

  // Rastgele sırala ve en fazla 4 öneri döndür
  return suggestions.sort(() => Math.random() - 0.5).slice(0, 4);
}
