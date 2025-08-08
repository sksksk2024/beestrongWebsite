// app/comanda/page.tsx

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { OrderSchema } from '@/lib/schemas';
import PageWrapper from '@/components/contexts/PageWrapper';
import Image from 'next/image';
import { useProductListStore } from '@/components/hooks/productListStore';
import XMenu from '@/components/utils/XMenu';

type InvalidProduct = {
  nume?: string;
  productId: string;
  error: string;
};

const Page = () => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { produse, golesteLista, stergeProdus } = useProductListStore();
  let totalGeneral = produse.reduce(
    (total, produs) => total + produs.cantitate * produs.pret,
    0
  );
  totalGeneral += 20

  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    telefon: '',
    adresa: '',
    codPostal: '',
  });
  const [status, setStatus] = useState({ message: '', error: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsInCart = produse.filter((produs) => produs.cantitate > 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setIsSubmitting(true);

  try {
    const validation = OrderSchema.safeParse(formData);
if (!validation.success) {
  // Build a map of fieldErrors
  const fieldErrs: Record<string,string> = {};
  for (const issue of validation.error.issues) {
    fieldErrs[issue.path[0] as string] = issue.message;
  }
  setFieldErrors(fieldErrs);
  setStatus({ message: 'Completează toate câmpurile', error: true });
  setIsSubmitting(false);
  return;
}

    if (produse.length === 0) {
      throw new Error('Adauga produse in cos mai intai!');
    }

    const order = {
      ...formData,
      iteme: produse.filter(p => p.cantitate > 0).map(p => ({
        productId: p.productId,
        nume: p.nume,
        cantitate: p.cantitate,
        pret: p.pret,
        imagine:   p.imagine,
        marime: p.marime,
        tip: p.tip
      })),
      total: totalGeneral
    };

    const res = await fetch('/api/comanda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const responseData = await res.json();

    console.log('📬 /api/comanda status:', res.status, 'body:', responseData);
    
    if (!res.ok) {
      console.log('API error payload:', responseData);
      if (responseData.invalidProducts) {
        const errorDetails = responseData.invalidProducts
          .map((p: InvalidProduct) => `• ${p.nume || p.productId}: ${p.error}`)
          .join('\n');
        throw new Error(`Probleme cu produsele:\n${errorDetails}`);
      }
      throw new Error(responseData.error || 'Eroare la trimiterea comenzii');
    }

    // Success handling...
    setStatus({ message: 'Comanda trimisa cu succes!', error: false });
    golesteLista();
    
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } catch (err) {
    console.error('Order submission error:', err);
    setStatus({
      message: err instanceof Error ? err.message : 'Eroare necunoscuta',
      error: true
    });
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <PageWrapper>
      <div className="overflow-x-clip h-auto flex flex-col justify-center items-center gap-20 bg-black text-yellowCustom py-48P w-full xl:flex-row xl:gap-0 xl:py-0 xl:h-[100dvh]">
        <h1 className="hidden">Pagina de comanda</h1>
        <section className="flex flex-col justify-center items-start gap-2 mx-auto px-32P">
          <h2 className="text-lg sm:text-2xl xl:text-3xl font-bold mb-16M mx-auto xl:mx-0 xl:text-start">
            Ce comanzi
          </h2>
          {itemsInCart.length === 0 ? 'Cosul este gol' : (
          <ul className='w-full max-w-container-600'>
            {produse.map((produs, index) => {
              const pretTotal = (produs.cantitate * produs.pret).toFixed(2);
              if (produs.cantitate <= 0 || Number.isNaN(produs.cantitate) || Number.isNaN(produs.pret)) return
              return (
                <React.Fragment key={index}>
                  <li className="underline">
                    <div className="flex justify-around items-center gap-2 xl:min-w-container-600 sm:gap-10">
                      <Image
                        className="w-10 h-10 bg-black z-50 rounded-full"
                        src={
                          produs.imagine.startsWith('/')
                            ? produs.imagine
                            : `/${produs.imagine}`
                        }
                        width={100}
                        height={100}
                        alt={produs.nume}
                      />
                      <h3>{produs.nume}{produs.marime && `( ${produs?.marime} )`}</h3>
                      <p>
                        Pret{' '}
                        <span>
                          {produs.cantitate} * {produs.pret} = {pretTotal}{' '}
                        </span>{' '}
                        lei
                      </p>
<button type="button"
onClick={() => stergeProdus(produs.id)}
>
  <XMenu width={16} height={16} />
</button>
                    </div>
                  </li>
                  <hr className="bg-gray-400 h-1 w-full my-[1rem]" />
                </React.Fragment>
              );
            })}
            <li className="flex justify-between items-center gap-10">
              <div className="underline">
                Plata se face cash la livrare
              </div>
              <button
              onClick={() => golesteLista()}
              id='important2'
              className="cursor-pointer hover:scale-105 no-underline">Goleste Cos</button>
            </li>
            <hr className="bg-gray-400 h-1 w-full my-[1rem]" />
            <li className="underline">
              <div className="flex justify-between items-center gap-10">
                <h3>Pret total + 20 de lei transport: </h3>
                <p>
                  <span>
                    {Number.isNaN(totalGeneral)
                              ? 'dai refresh'
                            : `${totalGeneral.toFixed(2)}`}
                    </span> {!Number.isNaN(totalGeneral) && 'lei'}
                </p>
              </div>
            </li>
          </ul>
          )}
        </section>
        <form
          className={`text-yellowCustom flex flex-col justify-center items-center gap-2 mx-auto min-w-container-300 w-full max-w-container-600 px-32P xl:pr-32P`}
        >
          <h2 className="sm:text-2xl xl:text-3xl font-bold text-center font-bold mb-16M">
            Trimite mesaj echipei!
          </h2>
          <input
            className="p-2 rounded min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Nume"
            value={formData.nume}
            onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
          />
          {fieldErrors.nume && (
    <p 
    id='important'
    className="text-sm mt-1  mb-16M text-red-500">{fieldErrors.nume}</p>
  )}
          <input
            className="p-2 rounded min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {fieldErrors.email && (
    <p 
    id='important'
    className="text-sm mt-1  mb-16M text-red-500">{fieldErrors.email}</p>
  )}
          <input
            className="p-2 rounded min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Numar de telefon"
            value={formData.telefon}
            onChange={(e) =>
              setFormData({ ...formData, telefon: e.target.value })
            }
          />
          {fieldErrors.telefon && (
    <p 
    id='important'
    className="text-sm mt-1  mb-16M text-red-500">{fieldErrors.telefon}</p>
  )}
          <input
            className="p-2 rounded min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Adresa"
            value={formData.adresa}
            onChange={(e) =>
              setFormData({ ...formData, adresa: e.target.value })
            }
          />
          {fieldErrors.adresa && (
    <p 
    id='important'
    className="text-sm mt-1  mb-16M"
    >{fieldErrors.adresa}</p>
  )}
          <input
            className="p-2 rounded min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Cod postal"
            value={formData.codPostal}
            onChange={(e) =>
              setFormData({ ...formData, codPostal: e.target.value })
            }
          />

          <motion.button
            aria-label="Trimite comanda"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`text-lg font-bold min-w-container-300 w-full max-w-container-600 mt-16M py-16P cursor-pointer
              ${isSubmitting ? 'border border-white' : 'border border-white'}
              `}
            variants={buttonVariants}
            initial="initial"
            whileTap="tap"
            animate="exit"
          >
            {isSubmitting ? 'SE TRIMITE...' : 'TRIMITE'}
          </motion.button>
          {status.message && (
  <p
  id={`${status.error === false ? 'success': 'important'}`}
    className={`text-sm mt-8M ${
      status.error ? 'text-red-500' : 'text-green-500'
    }`}
  >
    {status.message}
  </p>
)}

        </form>
      </div>
    </PageWrapper>
  );
};

export default Page;
