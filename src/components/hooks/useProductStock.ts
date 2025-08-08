// hooks/useProductStock.ts
//  @typescript-eslint/no-explicit-any
'use client'

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js"
import { StockMap } from "../utils/types"

type ProductRow = {
    id: string
    nume: string
    pret: number
    imagine: string
    categorie: string
    descriere: string
    createdAt: string // or Date if you parse it
    stocS: number
    stocM: number
    stocL: number
}

type Callback = (productId: string, stock: StockMap) => void

export function useProductStock(
    productIds: string[],
    onStockUpdate: Callback
) {
    useEffect(() => {
        const channels = productIds.map((id) => {
            const channel = supabase
                .channel(`product_${id}`)
                .on(
                    'postgres_changes' as any,
                    {
                        event: '*',
                        schema: 'public',
                        table: 'Product',
                        filter: `id=eq.${id}`,
                    },
                    (payload: RealtimePostgresInsertPayload<ProductRow>) => {
                        const newStock = {
                            S: payload.new.stocS,
                            M: payload.new.stocM,
                            L: payload.new.stocL,
                        }
                        onStockUpdate(payload.new.id, newStock)
                    }
                )
                .subscribe()
            return channel
        })

        return () => {
            // Unsubscribe when component unmounts
            channels.forEach((ch) => {
                supabase.removeChannel(ch)
            })
        }
    }, [productIds.join(','), onStockUpdate, productIds]) // Depend on joined string to re-sub only when IDs change
}