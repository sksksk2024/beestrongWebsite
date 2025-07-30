// lib/schemas.ts
import { z } from 'zod';

export const OrderSchema = z.object({
  nume: z.string().min(2),
  email: z.string().email('Invalid email address'),
  telefon: z.string().min(10),
  marimeTricou: z.string().optional(),
  marimePantaloni: z.string().optional(),
  codPostal: z.string().min(4),
});

export type EmailInput = z.infer<typeof OrderSchema>;
