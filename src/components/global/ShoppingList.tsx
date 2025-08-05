'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import Minus from '../utils/Minus';
import { motion } from 'framer-motion';
import { useProductListStore } from '../hooks/productListStore';

const ShoppingList = () => {
  const produse = useProductListStore((state) => state.produse);

  const [down, setDown] = useState<boolean>(false);

  const itemsInCart = produse.filter(
    (produs) =>
      produs.cantitate > 0 &&
      produs.pret > 0 &&
      !Number.isNaN(produs.pret)
  );

  const totalGeneral = produse.reduce(
    (total, produs) => total + produs.cantitate * produs.pret,
    0
  );

  const toggleList = () => {
    setDown(!down);
  };

  const listClass = down ? 'h-64H' : 'h-256H overflow-y-auto';

  return (
    <section
      className={`fixed bottom-0 text-xl text-yellowCustom w-full z-40 text-center mx-auto ${listClass}`}
    >
      <div className="bg-black p-32P pt-64P w-full max-w-container-600 mx-auto rounded-t-16BR">
        <motion.div onClick={toggleList} className="relative bottom-32I">
          <Minus className="absolute right-0" />
        </motion.div>
        <h3 className="underline mb-32M text-2xl">Cumparaturile tale</h3>
        {itemsInCart.length === 0 ? (
          <p className="text-yellowCustom text-center py-8">Cosul este gol</p>
        ) : (
          <ul>
            {produse
            .filter(
    (produs) =>
      produs.cantitate > 0 &&
      produs.pret > 0 &&
      !Number.isNaN(produs.pret)
  )
            .map((produs) => {
              const pretTotal = produs.cantitate * produs.pret;
              if (produs.cantitate === 0) return
              return (
                <React.Fragment key={produs.id}>
                  <li className="underline">
                    <div className="flex justify-around items-center gap-10">
                      <Image
                        className="w-10 h-10 bg-black z-50 rounded-full"
                        src={
                          produs.imagine.startsWith('/')
                            ? produs.imagine
                            : `/${produs.imagine}`
                        }
                        width={300}
                        height={300}
                        alt={produs.nume}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/pantaloni.jpg'; // Fallback
                        }}
                      />
                      <h3>{produs.nume}{produs.tip === 'vestimentar' && `(${produs.marime || 'S'})`}</h3>
                      <h3>
                        Pret{' '}
                        <span>
                          {produs.cantitate} * {produs.pret} = {pretTotal}
                        </span>{' '}
                        lei
                      </h3>
                    </div>
                  </li>
                  <hr className="bg-gray-400 h-1 w-full my-[1rem]" />
                </React.Fragment>
              );
            })}
            <li className="underline">
              <div className="flex justify-between items-center gap-10">
                <h3>Pret total: </h3>
                <span>
                  <span>{totalGeneral.toFixed(2)}</span> lei
                </span>
              </div>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default ShoppingList;
