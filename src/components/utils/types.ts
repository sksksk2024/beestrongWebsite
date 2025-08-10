// src/types.ts

export type MarimeType = 'S' | 'M' | 'L'

export type AlimentareType = {
  // images: (string | StaticImageData)[];
  images: string[];
  nume: string;
  disponibil?: number;
  idProdus: string;
  pret: number;
  marime?: MarimeType;
  availableStock: number;
};

export type TricouType = {
  // images: (string | StaticImageData)[];
  images: string[];
  nume: string;
  pret: number;
  idProdus: string;
  stockMap: { S: number; M: number; L: number };
};

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

// export type Order = {
//   id: string;
//   nume: string;
//   email: string;
//   telefon: string;
//   codPostal: string;
//   iteme: OrderItem[];
//   total: number;
//   createdAt: string;
// };

export interface Order {
  id: string;
  numeClient: string;
  email: string;
  telefon: string;
  adresa: string;
  codPostal: string;
  iteme: OrderItem[]
  total: number;
  status: "Nelivrat" | "Livrat";
  createdAt: string;
}

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
