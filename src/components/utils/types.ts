// src/types.ts

export type MarimeType = 'S' | 'M' | 'L'

export type StockMap = {
  S: number;
  M: number;
  L: number;
};

export type OrderItem = {
  productId: string;
  nume: string;
  cantitate: number;
  pret: number;
  imagine: string;
  marime?: 'S' | 'M' | 'L'
};

export type Order = {
  id: string;
  nume: string;
  email: string;
  telefon: string;
  marimeTricou: string;
  marimePantaloni: string;
  codPostal: string;
  iteme: OrderItem[];
  total: number;
  createdAt: string;
};

export type InvalidProduct = {
  nume?: string;
  productId: string;
  error: string;
};

export type Product = {
  id: string;
  nume: string;
  descriere: string;
  imagine: string;
  categorie: string;
  pret: number;
  pretReducere?: number;
  stoc: number;
  marimi: string[];
};
