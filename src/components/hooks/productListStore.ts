// hooks/productListStores.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TipProdus = 'aliment' | 'vestimentar';

export type Produs = {
  id: string;
  nume: string;
  pret: number;
  cantitate: number;
  imagine: string;
  tip: TipProdus;
};

interface StareLista {
  produse: Produs[];
  adaugaProdus: (produs: Produs) => void;
  actualizeazaCantitate: (id: string, cantitateNoua: number) => void;
  stergeProdus: (id: string) => void;
  golesteLista: () => void;
  produseFiltrate: (tip: TipProdus) => Produs[]; // New utility function
  modificaCantitate: (id: string, modificare: number) => void;
}

export const useProductListStore = create<StareLista>()(
  persist(
    (set, get) => ({
      produse: [],
      adaugaProdus: (produs) =>
        set((state) => {
          const existent = state.produse.find((p) => p.id === produs.id);
          if (existent) {
            return {
              produse: state.produse.map((p) =>
                p.id === produs.id
                  ? { ...p, cantitate: p.cantitate + produs.cantitate }
                  : p
              ),
            };
          }
          return { produse: [...state.produse, produs] };
        }),
      actualizeazaCantitate: (id, cantitateNoua) =>
        set((state) => ({
          produse: state.produse.map((produs) =>
            produs.id === id
              ? { ...produs, cantitate: Math.max(0, cantitateNoua) }
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
                  cantitate: Math.max(0, produs.cantitate + modificare),
                }
              : produs
          ),
        })),
    }),
    { name: 'products-storage' }
  )
);
