export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

// Get all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.getAll('id')

    // If client asked for specific IDs...
    if (ids.length > 0) {
      const products = await prisma.product.findMany({
        where: { id: { in: ids } },
        select: { id: true, stocS: true, stocM: true, stocL: true }
      })

      // If only one ID, return a single object
      if (ids.length === 1) {
        const prod = products[0]
        if (!prod) {
          return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }
        return NextResponse.json(prod)
      }

      // Otherwise return the array
      return NextResponse.json(products)
    }

    // No IDs => return all
    const all = await prisma.product.findMany({
      select: { id: true, stocS: true, stocM: true, stocL: true }
    })
    return NextResponse.json(all)

  } catch (err) {
    console.error('API error in /api/produse:', err)
    return NextResponse.json(
      { error: 'Server error', details: (err as Error).message },
      { status: 500 }
    )
  }
}

// POST create new product
export async function POST(req: Request) {
    try {
        const data = await req.json()

        if (data.productId) {
            // Fetch product by ID
            const produs = await prisma.product.findUnique({
                where: {id: data.productId}
            })
            return NextResponse.json(produs)
        } else {
            // Create new product
            const product = await prisma.product.create({
                data: {
                    nume: data.nume,
                    pret: data.pret,
                    stocS: data.stocS,
                    stocM: data.stocM,
                    stocL: data.stocL,
                    imagine: data.imagine,
                    categorie: data.categorie,
                    descriere: data.descriere
                }
            })
            return NextResponse.json({id: product.id,
  nume: product.nume,
  imagine: product.imagine,
  stocS: product.stocS,
  stocM: product.stocM,
  stocL: product.stocL,
  pret: product.pret})
        }
    } catch (error) {
      console.error('Error:', error)
        return NextResponse.json(
            {error: 'Creare produs esuata'},
            {status: 500}
        )
    }
}

// PATCH update product stock
export async function PATCH(req: Request) {
    try {
        const { id, stocS, stocM, stocL } = await req.json()

        const updatedProduct = await prisma.product.update({
            where: {id},
            data: {
                stocS,
                stocM,
                stocL
            }
        })

        return NextResponse.json(updatedProduct)
    } catch (error) {
      console.error('Error', error)
        return NextResponse.json({
            error: 'Actualizare stoc esuata'
        }, {
            status: 500
        })
    }
}