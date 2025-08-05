// hooks/productListStores.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TipProdus = 'aliment' | 'vestimentar';

export type Produs = {
  id: string;
  productId: string;
  nume: string;
  pret: number;
  cantitate: number;
  disponibil: number;
  imagine: string;
  tip: TipProdus;
  marime?: 'S' | 'M' | 'L';
};

interface StareLista {
  produse: Produs[];
  adaugaProdus: (produs: Produs) => void;
  actualizeazaCantitate: (id: string, cantitateNoua: number) => void;
  stergeProdus: (id: string) => void;
  golesteLista: () => void;
  produseFiltrate: (tip: TipProdus) => Produs[]; // New utility function
  modificaCantitate: (id: string, modificare: number) => void;
  // Admin Only
  actualizeazaStoc: (id: string, stocNou: number) => void
  modificaMarime: (productId: string, newSize: 'S'|'M'|'L') => void
}

export const useProductListStore = create<StareLista>()(
  persist(
    (set, get) => ({
      produse: [],
      adaugaProdus: (produs) =>
        set((state) => {
          const existent = state.produse.find((p) => p.id === produs.id);
          if (existent) {
            // Prevent adding more than available
            const cantitateNoua = Math.min(
              existent.cantitate + produs.cantitate,
              existent.disponibil
            )
            return {
              produse: state.produse.map((p) =>
                p.id === produs.id
                  ? { ...p, cantitate: cantitateNoua } : p
              ),
            };
          }
          return { produse: [...state.produse, produs] };
        }),
      actualizeazaCantitate: (id, cantitateNoua) =>
        set((state) => ({
          produse: state.produse.map((produs) =>
            produs.id === id
              ? { ...produs, cantitate: Math.min(Math.max(0, cantitateNoua), produs.disponibil) }
              : produs
          ),
        })),
      stergeProdus: (id) =>
        set((state) => ({
          produse: state.produse.filter((produs) => produs.id !== id),
        })),
      golesteLista: () => set({ produse: [] }),
      produseFiltrate: (tip) => get().produse.filter((p) => p.tip === tip),
      modificaCantitate: (id, modificare) =>
        set((state) => ({
          produse: state.produse.map((produs) =>
            produs.id === id
              ? {
                  ...produs,
                  cantitate: Math.min(Math.max(0, produs.cantitate + modificare), produs.disponibil),
                }
              : produs
          ),
        })),
      actualizeazaStoc: (id, stocNou) => 
        set((state) => ({
          produse: state.produse.map((produs) => 
          produs.id === id
          ? {
            ...produs,
            disponibil: stocNou,
            // Ensure cart quantity doesn't exceed new stock
            cantitate: Math.min(produs.cantitate, stocNou)
          } :
          produs
          ),
        })),
      modificaMarime: (productId, newSize) =>
        set((state) => ({
          produse: state.produse.map((produs) => 
            produs.productId === productId
          ? {
            ...produs,
            marime: newSize
          } : produs
          ),
        }))
    }),
    { name: 'products-storage' }
  )
);
