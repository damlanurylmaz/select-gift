export const RELATIONSHIPS = [
  { value: "family", label: "Aile Üyesi" },
  { value: "friend", label: "Arkadaş" },
  { value: "partner", label: "Sevgili/Eş" },
  { value: "colleague", label: "İş Arkadaşı" },
] as const;

export const OCCASIONS = [
  { value: "birthday", label: "Doğum Günü" },
  { value: "anniversary", label: "Yıldönümü" },
  { value: "graduation", label: "Mezuniyet" },
  { value: "other", label: "Diğer" },
] as const;

export const GENDERS = [
  { value: "male", label: "Erkek" },
  { value: "female", label: "Kadın" },
  { value: "other", label: "Diğer" },
] as const;
