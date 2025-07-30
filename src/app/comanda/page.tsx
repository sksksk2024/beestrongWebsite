// app/comanda/page.tsx

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { OrderSchema } from '@/lib/schemas';
import PageWrapper from '@/components/contexts/PageWrapper';
import Image from 'next/image';
import { useProductListStore } from '@/components/hooks/productListStore';
import { z } from 'zod';

const Page = () => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { produse, golesteLista } = useProductListStore();
  const totalGeneral = produse.reduce(
    (total, produs) => total + produs.cantitate * produs.pret,
    0
  );

  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    telefon: '',
    marimeTricou: '',
    marimePantaloni: '',
    codPostal: '',
  });
  const [status, setStatus] = useState({ message: '', error: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      OrderSchema.parse(formData);

      if (produse.length === 0) {
        throw new Error('Adauga produse in cos mai intai!');
      }

      // Prepare order data
      const order = {
        ...formData,
        iteme: produse,
        total: totalGeneral,
      };

      // Send to API route
      const res = await fetch('/api/comanda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Success
      setFormData({
        nume: '',
        email: '',
        telefon: '',
        marimeTricou: '',
        marimePantaloni: '',
        codPostal: '',
      });
      golesteLista();
      setStatus({ message: 'Comanda trimisa cu succes!', error: false });

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newFieldError: Record<string, string> = {};
        err.errors.forEach((error) => {
          switch (error.path[0]) {
            case 'nume':
              newFieldError.nume =
                'Numele trebuie sa contina minim 2 caractere';
              break;
            case 'email':
              newFieldError.nume = 'Introdu o adresa de email valida';
              break;
            case 'telefon':
              newFieldError.nume = 'Introdu un numar de telefon valid';
              break;
            case 'codPostal':
              newFieldError.nume = 'Introdu un cod postal valid';
              break;
          }
        });
        setFieldErrors(newFieldError);
        setStatus({
          message: 'Te rugam sa completezi corect toate campurile',
          error: true,
        });
      } else {
        setStatus({
          message: err instanceof Error ? err.message : 'Eroare necunoscuta',
          error: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="h-auto flex flex-col justify-center items-center gap-20 bg-black text-white py-48P w-full lg:flex-row lg:gap-0 lg:py-0 lg:h-[100dvh]">
        <h1 className="hidden">Pagina de comanda</h1>
        <section className="flex flex-col justify-center items-start gap-2 mx-auto px-32P">
          <h2 className="text-center text-lg sm:text-2xl lg:text-3xl font-bold mb-16M mx-auto lg:mx-0 lg:text-start">
            Ce comanzi
          </h2>
          <ul>
            {produse.map((produs, index) => {
              const pretTotal = produs.cantitate * produs.pret;
              return (
                <React.Fragment key={index}>
                  <li className="underline">
                    <div className="flex justify-around items-center gap-10">
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
                      <h3>{produs.nume}</h3>
                      <p>
                        Pret{' '}
                        <span>
                          {produs.cantitate} * {produs.pret} = {pretTotal}{' '}
                        </span>{' '}
                        lei
                      </p>
                    </div>
                  </li>
                  <hr className="bg-gray-400 h-1 w-full my-[1rem]" />
                </React.Fragment>
              );
            })}
            <li className="underline">
              <div className="flex justify-between items-center gap-10">
                <h3>Pret total: </h3>
                <p>
                  <span>{totalGeneral}</span> lei
                </p>
              </div>
            </li>
          </ul>
        </section>
        <form
          className={`text-white flex flex-col justify-center items-center gap-2 mx-auto
            
            `}
        >
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center font-bold mb-16M">
            Trimite mesaj echipei!
          </h2>
          <input
            className="p-2 rounded bg-gray-800 min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Nume"
            value={formData.nume}
            onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
          />
          <input
            className="p-2 rounded bg-gray-800 min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className="p-2 rounded bg-gray-800 min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Marimea ta la tricou"
            value={formData.marimeTricou}
            onChange={(e) =>
              setFormData({ ...formData, marimeTricou: e.target.value })
            }
          />
          <input
            className="p-2 rounded bg-gray-800 min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Marimea ta la pantaloni"
            value={formData.marimePantaloni}
            onChange={(e) =>
              setFormData({ ...formData, marimePantaloni: e.target.value })
            }
          />
          <input
            className="p-2 rounded bg-gray-800 min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
            type="text"
            placeholder="Numar de telefon"
            value={formData.telefon}
            onChange={(e) =>
              setFormData({ ...formData, telefon: e.target.value })
            }
          />
          <input
            className="p-2 rounded bg-gray-800 min-w-container-300 w-full max-w-container-600 border border-gray-600 appearance-none focus:outline-2 focus:outline-offset-2 focus:border-blue-600 focus:outline-solid focus:shadow-outline"
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
              ${isSubmitting ? 'bg-gray-500' : 'bg-blue-600'}
              `}
            variants={buttonVariants}
            initial="initial"
            whileTap="tap"
            animate="exit"
          >
            {isSubmitting ? 'SE TRIMITE...' : 'TRIMITE'}
          </motion.button>
          {fieldErrors.nume && (
            <p className={`text-sm mt-8M text-red-500`}>{fieldErrors.nume}</p>
          )}
          {status.message === 'Comanda trimisa!' && (
            <p className="text-sm mt-8M text-green-500">Comanda trimisa!</p>
          )}
        </form>
      </div>
    </PageWrapper>
  );
};

export default Page;
