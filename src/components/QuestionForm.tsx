import React from "react";
import { Stack, TextField, Button, MenuItem, FormControl } from "@mui/material";

interface QuestionFormProps {
  onSubmit: (data: any) => void;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [formData, setFormData] = React.useState({
    age: "",
    gender: "",
    interests: "",
    relationship: "",
    budget: "",
    occasion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          required
          label="Yaş"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          required
          select
          label="Cinsiyet"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">Seçiniz</MenuItem>
          <MenuItem value="male">Erkek</MenuItem>
          <MenuItem value="female">Kadın</MenuItem>
          <MenuItem value="other">Diğer</MenuItem>
        </TextField>

        <TextField
          required
          label="İlgi Alanları"
          name="interests"
          multiline
          rows={3}
          value={formData.interests}
          onChange={handleChange}
          placeholder="Spor, müzik, teknoloji vb."
          fullWidth
        />

        <TextField
          required
          select
          label="İlişki Türü"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">Seçiniz</MenuItem>
          <MenuItem value="family">Aile Üyesi</MenuItem>
          <MenuItem value="friend">Arkadaş</MenuItem>
          <MenuItem value="partner">Sevgili/Eş</MenuItem>
          <MenuItem value="colleague">İş Arkadaşı</MenuItem>
        </TextField>

        <TextField
          required
          label="Bütçe (TL)"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          required
          select
          label="Özel Gün"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">Seçiniz</MenuItem>
          <MenuItem value="birthday">Doğum Günü</MenuItem>
          <MenuItem value="anniversary">Yıldönümü</MenuItem>
          <MenuItem value="graduation">Mezuniyet</MenuItem>
          <MenuItem value="other">Diğer</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Hediye Önerilerini Gör
        </Button>
      </Stack>
    </form>
  );
}
