// src/app/api/comanda/route.ts

import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type OrderItem = {
  productId: string;
  cantitate: number;
  pret: number;
  nume: string;
  imagine: string;
};

type Iteme = {
  productId: string;
  nume: string;
  cantitate: number;
  pret: number;
  imagine: string;
};

// UPDATE STATUS OF AN ORDER
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID si status sunt obligatorii' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Actualizare esuata:', error);
    return NextResponse.json({ error: 'Actualizare esuata' }, { status: 500 });
  }
}

// GET ALL ORDERS
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Generare comenzi esuata: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // Validate required fields
    if (!orderData.email || !orderData.telefon) {
      return NextResponse.json(
        { error: 'Email-ul si numarul de telefon sunt obligatorii!' },
        { status: 400 }
      );
    }

    // Verify all products exist and have sufficient stock
const productIds = orderData.iteme.map((i:any) => i.productId);
const products = await prisma.product.findMany({
  where: { id: { in: productIds } },
  select: { id: true, stoc: true, nume: true },
});

// then build a map for quick lookup:
const productsMap = Object.fromEntries(products.map(p => [p.id, p]));

const invalidProducts = orderData.iteme.map((item: OrderItem) => {
  const prod = productsMap[item.productId];
  if (!prod) {
    return { valid: false, productId: item.productId, error: 'Produsul nu există' };
  }
  if (prod.stoc < item.cantitate) {
    return { valid: false, productId: item.productId, productName: prod.nume, available: prod.stoc, requested: item.cantitate, error: 'Stoc insuficient' };
  }
  return { valid: true, productId: item.productId };
}).filter((v: any) => !v.valid);

if (invalidProducts.length) {
  return NextResponse.json(
    { error: 'Produse invalide', invalidProducts },
    { status: 400 }
  );
}

    // Create transaction to update stock and create order
   const result = await prisma.$transaction(async (tx) => {
  // Get all products at once
  const products = await tx.product.findMany({
    where: {
      id: { in: orderData.iteme.map((i: any) => i.productId) }
    },
    select: { id: true, stoc: true, nume: true }
  });

  // Verify all products were found
  if (products.length !== orderData.iteme.length) {
    const missingIds = orderData.iteme
      .filter((i: any) => !products.some(p => p.id === i.productId))
      .map((i: any) => i.productId);
    throw new Error(`Produse lipsă: ${missingIds.join(', ')}`);
  }

  // Verify stock
  const outOfStock = products.filter(p => {
    const item = orderData.iteme.find((i: any) => i.productId === p.id);
    return p.stoc < item!.cantitate;
  });

  if (outOfStock.length > 0) {
    throw new Error(
      `Stoc epuizat pentru: ${outOfStock.map(p => p.nume).join(', ')}`
    );
  }

  // Update stocks
  await Promise.all(
    orderData.iteme.map((item: Iteme) =>
      tx.product.update({
        where: { id: item.productId },
        data: { stoc: { decrement: item.cantitate } }
      })
    )
  );

  // Create order
  return await tx.order.create({
    data: {
      numeClient: orderData.nume,
      email: orderData.email,
      telefon: orderData.telefon,
      marimeTricou: orderData.marimeTricou || 'N/A',
      marimePantaloni: orderData.marimePantaloni || 'N/A',
      codPostal: orderData.codPostal,
      iteme: orderData.iteme,
      total: orderData.total,
      status: 'Nelivrat',
      produse: {
        connect: orderData.iteme.map((item: any) => ({
          id: item.productId
        }))
      }
    }
  });
});

    // Save to DB
    // const order = await prisma.order.create({
    //   data: {
    //     numeClient: orderData.nume,
    //     email: orderData.email,
    //     telefon: orderData.telefon,
    //     marimeTricou: orderData.marimeTricou || 'N/A',
    //     marimePantaloni: orderData.marimePantaloni || 'N/A',
    //     codPostal: orderData.codPostal,
    //     iteme: orderData.iteme,
    //     total: orderData.total,
    //     status: 'Nelivrat',
    //   },
    // });
    // Format products for email

    if (!process.env.SENDGRID_API_KEY) {
  return NextResponse.json({ error: 'Missing SENDGRID_API_KEY' }, { status: 500 });
}

    const productsHtml = orderData.iteme
      .map(
        (product: any) => `
        <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <h3 style="margin: 0; color: #333;">${product.nume}</h3>
          <p style="margin: 5px 0; color: #666;">
            Cantitate: ${product.cantitate} × ${product.pret} RON = ${product.cantitate * product.pret} RON
          </p>
        </div>
      `
      )
      .join('');

    // Send emails
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!, // site owner
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject: `Comanda noua de la ${orderData.nume || orderData.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0;">Detalii Client</h3>
            <p><strong>Nume:</strong> ${orderData.nume || 'Nu exista'}</p>
            <p><strong>Email:</strong> ${orderData.email}</p>
            <p><strong>Telefon:</strong> ${orderData.telefon}</p>
            <p><strong>Cod Postal:</strong> ${orderData.codPostal || 'Nu exista'}</p>
            <p><strong>Marime Tricou:</strong> ${orderData.marimeTricou || 'N/A'}</p>
            <p><strong>Marime Pantaloni:</strong> ${orderData.marimePantaloni || 'N/A'}</p>
          </div>
          
          <h3 style="margin-bottom: 5px;">Produsele Comandate</h3>
          ${productsHtml}
          
          <div style="margin-top: 20px; font-size: 1.2em;">
            <strong>Total: ${orderData.total} RON</strong>
          </div>
          
          <p style="margin-top: 30px; font-size: 0.9em; color: #718096;">
            ID comanda: ${result.id}<br>
            Comandata in: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });
    await sgMail.send({
      to: orderData.email, // client
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject: `Confirmare Comanda`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Iti multumim de comanda!</h2>
          <p>In maximum 7 zile lucratoare ti-o aducem.</p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Detalii Comanda</h3>
            ${productsHtml}
            
            <div style="margin-top: 15px; font-size: 1.2em;">
              <strong>Total: ${orderData.total} RON</strong>
            </div>
          </div>
          
          <h3>Informatii Curierat</h3>
          <p>In maximum 7 zile lucratoare iti aducem comanda. Iti trimitem mai multe detalii daca este cazul.</p>
          
          <p style="margin-top: 30px; font-size: 0.9em; color: #718096;">
            ID comanda: ${result.id}<br>
            Comandata in: ${new Date().toLocaleString()}
          </p>
          
          <p style="margin-top: 20px;">
            Daca ai intrebari, scrie-ne la ${process.env.ADMIN_EMAIL}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, orderId: result });
  } catch (error) {
    console.error('Trimitere esuata:', error);
    return NextResponse.json({ error: 'Eroare la procesare' }, { status: 500 });
  }
}
