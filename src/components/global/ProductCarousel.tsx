'use client';
// @typescript-eslint/no-explicit-any

import React, { forwardRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import XMenu from '../utils/XMenu';
import Vestimentare from './Vestimentare';
import Alimentare from './Alimentare';
// import Food1 from '@/../public/alimentara1.png';
// import Food2 from '@/../public/alimentara2.png';
// import Food3 from '@/../public/alimentara3.png';
import Tricou1 from '@/../public/tigru1.jpg';
import Tricou11 from '@/../public/tigru2.jpg';
import Tricou2 from '@/../public/rocket1.jpg';
import Tricou22 from '@/../public/stelar2.jpg';
import Tricou3 from '@/../public/pantaloniNegri1.jpg';
import Tricou33 from '@/../public/pantaloniNegri2.jpg';
import Tricou4 from '@/../public/pantaloniAlbastri1.jpg';
import Tricou44 from '@/../public/pantaloniAlbastri2.jpg';
import Tricou5 from '@/../public/maieu1.jpg';
import Tricou55 from '@/../public/maieu2.jpg';
import Tricou6 from '@/../public/jeAlb1.jpg';
import Tricou66 from '@/../public/jeAlb2.jpg';
import Tricou7 from '@/../public/je1.jpg';
import Tricou77 from '@/../public/je2.jpg';
import Tricou8 from '@/../public/fire1.jpg';
import Tricou88 from '@/../public/fire2.jpg';
import Tricou9 from '@/../public/beast1.jpg';
import Tricou99 from '@/../public/beast2.jpg';
import Tricou10 from '@/../public/albRocket1.jpg';
import Tricou101 from '@/../public/albRocket2.jpg';

type carouselProps = {
  isAlimenteModal: boolean;
  isVestimentareModal: boolean;
  handleAlimenteModal: (isAlimenteModal: boolean) => void;
  handleVestimentareModal: (isVestimentareModal: boolean) => void;
};

const ProductCarousel = forwardRef<HTMLDivElement, carouselProps>(
  (
    {
      isAlimenteModal,
      isVestimentareModal,
      handleAlimenteModal,
      handleVestimentareModal,
    },
    ref
  ) => {
    // Define products with their DB IDs
    const produseVestimentare = [
    {
        id: 'cmdx59mo300009g1kx3trfci9',
        src1: Tricou1,
        src2: Tricou11,
        nume: 'Jersey Zebra',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400019g1kkd17uqga',
        src1: Tricou2,
        src2: Tricou22,
        nume: 'Jersey Galaxy',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400029g1kv8zfhs5h',
        src1: Tricou33,
        src2: Tricou3,
        nume: 'Shorts Negri',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400039g1kv53j5uyl',
        src1: Tricou44,
        src2: Tricou4,
        nume: 'Shorts Albastri',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400049g1k88dcw2nb',
        src1: Tricou5,
        src2: Tricou55,
        nume: 'Maieu Negru',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400059g1k6m5zry0s',
        src1: Tricou6,
        src2: Tricou66,
        nume: 'Jersey Honey',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400069g1kzrix4jo4',
        src1: Tricou7,
        src2: Tricou77,
        nume: 'Jersey Honey (Negru)',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400079g1ku00jnf5a',
        src1: Tricou8,
        src2: Tricou88,
        nume: 'Fire',
        pret: 150,
        stoc: 10
    },
    {
        id: 'cmdx59mo400089g1k7293k8t7',
        src1: Tricou9,
        src2: Tricou99,
        nume: 'Hoodie Rocket',
        pret: 150,
        stoc: 10
    },
    {
        id: '',
        src1: Tricou101,
        src2: Tricou10,
        nume: 'Compression T-shirt alb',
        pret: 150,
        stoc: 10
    },
]

// const produseAlimentare = [
//     {
//         id: 'cmdx59mo300009g1kx3trfci9',
//         src1: Food1,
//         src2: Food1,
//         nume: 'Jersey Zebra',
//         pret: 150,
//         stoc: 10
//     },
//     {
//         id: 'cmdx59mo400019g1kkd17uqga',
//         src1: Food2,
//         src2: Food2,
//         nume: 'Jersey Galaxy',
//         pret: 150,
//         stoc: 10
//     },
//     {
//         id: 'cmdx59mo400029g1kv8zfhs5h',
//         src1: Food3,
//         src2: Food3,
//         nume: 'Shorts Negri',
//         pret: 150,
//         stoc: 10
//     },
// ]

    return (
      <section
        ref={ref}
        id="bg"
        className="flex justify-center items-center w-[99dvw] absolute"
      >
        <div
          onClick={
            !isVestimentareModal
              ? () => handleAlimenteModal(!isAlimenteModal)
              : () => handleVestimentareModal(!isVestimentareModal)
          }
          className="absolute -left-0 -inset-y-45 xs:-inset-y-80 lg:-inset-y-20 bg-black w-[200dvw] opacity-100 h-[28.125rem] z-50 lg:h-[20.125rem]"
        ></div>

        <Carousel
          opts={{
            align: 'start',
          }}
          orientation="horizontal"
          className="z-50 relative top-32I xs:-top-96I lg:top-32I w-full max-w-xs -translate-y-1/2 pt-8"
        >
          <button
            onClick={
              !isVestimentareModal
                ? () => handleAlimenteModal(!isAlimenteModal)
                : () => handleVestimentareModal(!isVestimentareModal)
            }
            className="mb-32M absolute -top-32I right-0"
          >
            <XMenu />
          </button>
          {isAlimenteModal && (
            <CarouselContent className="w-[31.25rem] h-[18.75rem]">
              {produseVestimentare.map((produs) => (
                <Alimentare
                  key={produs.id}
              src1={produs.src1}
              src2={produs.src2}
              nume={produs.nume}
              pret={produs.pret}
              // idProdus={produs.id}
                />
              ))}
            </CarouselContent>
          )}
          {isVestimentareModal && (
            <CarouselContent className="w-[31.25rem] h-[18.75rem]">
            {produseVestimentare.map((produs) => (
              <Vestimentare
              key={produs.id}
              src1={produs.src1}
              src2={produs.src2}
              nume={produs.nume}
              pret={produs.pret}
              idProdus={produs.id} />
                  ))}
            </CarouselContent>
          )}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    );
  }
);
ProductCarousel.displayName = 'ProductCarousel';

export default ProductCarousel;
