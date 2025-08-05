// lib/schemas.ts
import { z } from 'zod';

export const OrderSchema = z.object({
  nume: z.string().min(2, { message: 'Numele trebuie să conțină cel puțin 2 caractere' }),
  email: z.string().email('Email invalid').min(5, { message: 'Adresa de email nu este validă' }),
  telefon: z.string().min(10, { message: 'Numărul de telefon trebuie să fie valid' }),
  codPostal: z.string().min(4, { message: 'Codul poștal trebuie să fie valid' }),
  adresa: z.string().min(5, { message: 'Adresa trebuie să fie valida' }),
});

export type EmailInput = z.infer<typeof OrderSchema>;
