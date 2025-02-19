import React from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  MenuItem,
  Typography,
} from "@mui/material";

interface FormValues {
  age: string;
  gender: string;
  interests: string;
  budget: string;
  occasion: string;
}

interface QuestionFormProps {
  onSubmit: (values: FormValues) => void;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [values, setValues] = React.useState<FormValues>({
    age: "",
    gender: "",
    interests: "",
    budget: "",
    occasion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Yaş"
          name="age"
          type="number"
          value={values.age}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          select
          label="Cinsiyet"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          required
          fullWidth
        >
          <MenuItem value="male">Erkek</MenuItem>
          <MenuItem value="female">Kadın</MenuItem>
        </TextField>

        <TextField
          label="İlgi Alanları"
          name="interests"
          value={values.interests}
          onChange={handleChange}
          required
          fullWidth
          helperText="Virgülle ayırarak birden fazla ilgi alanı girebilirsiniz"
        />

        <TextField
          label="Bütçe (TL)"
          name="budget"
          type="number"
          value={values.budget}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          select
          label="Özel Gün"
          name="occasion"
          value={values.occasion}
          onChange={handleChange}
          required
          fullWidth
        >
          <MenuItem value="birthday">Doğum Günü</MenuItem>
          <MenuItem value="graduation">Mezuniyet</MenuItem>
          <MenuItem value="anniversary">Yıldönümü</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          fullWidth
        >
          Hediye Önerisi Al
        </Button>
      </Stack>
    </Box>
  );
}
