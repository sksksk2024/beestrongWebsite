// import { Webhook } from 'svix';
// import { WebhookEvent } from '@clerk/nextjs/server';
// import { headers } from 'next/headers';
// import prisma from '@/lib/prisma';

// export async function POST(req: Request) {
//   const secret = process.env.SIGNING_SECRET;
//   if (!secret) return new Response('Missing secret', { status: 500 });

//   const wh = new Webhook(secret);
//   const body = await req.text();
//   const headerPayload = await headers();

//   const event = wh.verify(body, {
//     'svix-id': headerPayload.get('svix-id')!,
//     'svix-timestamp': headerPayload.get('svix-timestamp')!,
//     'svix-signature': headerPayload.get('svix-signature')!,
//   }) as WebhookEvent;

//   if (event.type === 'user.created') {
//     const { id, clerkId, email_addresses, public_metadata } = event.data as any;

//     const email = email_addresses?.[0]?.email_address;

//     const { nume, codPostal, numarTelefon } = public_metadata;

//     await prisma.client.upsert({
//       where: { id },
//       update: {},
//       create: {
//         clerkId: id,
//         email,
//         nume: `${nume}`,
//         codPostal: `${codPostal}`,
//         numarTelefon: `${numarTelefon}`,
//       },
//     });
//   }
//   return new Response('OK');
// }
