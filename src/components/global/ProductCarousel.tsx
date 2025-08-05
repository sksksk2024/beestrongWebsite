'use client';

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
import Food1 from '@/../public/alimentara1.png';
import Food2 from '@/../public/alimentara2.png';
import Food3 from '@/../public/alimentara3.png';
import zebra1 from '@/../public/tricouri/zebraJersey (1).jpg'
import zebra2 from '@/../public/tricouri/zebraJersey (2).jpg'
import zebra3 from '@/../public/tricouri/zebraJersey (3).jpg'
import zebra4 from '@/../public/tricouri/zebraJersey (4).jpg'
import zebra5 from '@/../public/tricouri/zebraJersey (5).jpg'
import galaxy1 from '@/../public/tricouri/galaxyJersey (1).jpg'
import galaxy2 from '@/../public/tricouri/galaxyJersey (2).jpg'
import galaxy3 from '@/../public/tricouri/galaxyJersey (3).jpg'
import galaxy4 from '@/../public/tricouri/galaxyJersey (4).jpg'
import galaxy5 from '@/../public/tricouri/galaxyJersey (5).jpg'
import shNegri1 from '@/../public/tricouri/shNegri (1).jpg'
import shNegri2 from '@/../public/tricouri/shNegri (2).jpg'
import shNegri3 from '@/../public/tricouri/shNegri (3).jpg'
import shNegri4 from '@/../public/tricouri/shNegri (4).jpg'
import shAlbi1 from '@/../public/tricouri/shAlbi (1).jpg'
import shAlbi2 from '@/../public/tricouri/shAlbi (2).jpg'
import shAlbi3 from '@/../public/tricouri/shAlbi (3).jpg'
import shAlbi4 from '@/../public/tricouri/shAlbi (4).jpg'
import shAlbi5 from '@/../public/tricouri/shAlbi (5).jpg'
import maieuNegru1 from '@/../public/tricouri/maieuNegru (1).jpg'
import maieuNegru2 from '@/../public/tricouri/maieuNegru (2).jpg'
import maieuNegru3 from '@/../public/tricouri/maieuNegru (3).jpg'
import maieuAlb1 from '@/../public/tricouri/maieuAlb (1).jpg'
import maieuAlb2 from '@/../public/tricouri/maieuAlb (2).jpg'
import maieuAlb3 from '@/../public/tricouri/maieuAlb (3).jpg'
import maieuAlb4 from '@/../public/tricouri/maieuAlb (4).jpg'
import comAlb1 from '@/../public/tricouri/comAlb (1).jpg'
import comAlb2 from '@/../public/tricouri/comAlb (2).jpg'
import comAlb3 from '@/../public/tricouri/comAlb (3).jpg'
import comAlb4 from '@/../public/tricouri/comAlb (4).jpg'
import comAlb5 from '@/../public/tricouri/comAlb (5).jpg'
import comNegru1 from '@/../public/tricouri/comNegru (1).jpg'
import comNegru2 from '@/../public/tricouri/comNegru (2).jpg'
import comNegru3 from '@/../public/tricouri/comNegru (3).jpg'
import comNegru4 from '@/../public/tricouri/comNegru (4).jpg'
import comNegru5 from '@/../public/tricouri/comNegru (5).jpg'
import comNegru6 from '@/../public/tricouri/comNegru (6).jpg'
import honey1 from '@/../public/tricouri/honeyJersey (1).jpg'
import honey2 from '@/../public/tricouri/honeyJersey (2).jpg'
import honey3 from '@/../public/tricouri/honeyJersey (3).jpg'
import honey4 from '@/../public/tricouri/honeyJersey (4).jpg'
import honey5 from '@/../public/tricouri/honeyJersey (5).jpg'
import hoodie1 from '@/../public/tricouri/hoodie (1).jpg'
import hoodie2 from '@/../public/tricouri/hoodie (2).jpg'
import hoodie3 from '@/../public/tricouri/hoodie (3).jpg'
import QuestionCard from './QuestionCard';

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
    const vestimentareImages = [
      [zebra1, zebra2, zebra3, zebra4, zebra5],            // for Zebra Jersey
      [galaxy1, galaxy2, galaxy3, galaxy4, galaxy5],       // for Galaxy Jersey
      [shNegri1, shNegri2, shNegri3, shNegri4],            // for Shorts Negri
      [shAlbi1, shAlbi2, shAlbi3, shAlbi4, shAlbi5],       // for Shorts Albastri
      [maieuNegru1, maieuNegru2, maieuNegru3],             // for Maieu Negru
      [maieuAlb1, maieuAlb2, maieuAlb3, maieuAlb4],        // for Maieu Alb
      [comNegru1, comNegru2, comNegru3, comNegru4, comNegru5, comNegru6],
      [comAlb1, comAlb2, comAlb3, comAlb4, comAlb5],
      [honey1, honey2, honey3, honey4, honey5],
      [hoodie1, hoodie2, hoodie3],
    ]
    const alimentareImages = [
      [Food1], [Food3], [Food2]
    ]

    // Define products with their DB IDs
    const produseVestimentare = [
    {
        id: 'cmdycjcqt00009g808nl9fzjt',
        nume: 'Zebra Jersey',
        pret: 159.99,
        stocS: 8,
      stocM: 7,
      stocL: 5,
    },
    {
        id: 'cmdycjcqt00019g80px84qtcs',
        nume: 'Galaxy Jersey',
        pret: 159.99,
      stocS: 6,
      stocM: 7,
      stocL: 4,
    },
    {
        id: 'cmdycjcqt00029g80ayy5k8eo',
        nume: 'Shorts Negri',
        pret: 179.99,
      stocS: 4,
      stocM: 6,
      stocL: 3,
    },
    {
        id: 'cmdycjcqt00039g80bcprqacr',
        nume: 'Shorts Albastri',
        pret: 179.99,
      stocS: 5,
      stocM: 5,
      stocL: 3,
    },
    {
        id: 'cmdycjcqt00049g80iz8a8ivc',
        nume: 'Maieu Negru',
        pret: 139.99,
      stocS: 4,
      stocM: 9,
      stocL: 7,
    },
    {
        id: 'cmdycjcqt00099g80igarj7cn',
        nume: 'Maieu Alb',
        pret: 139.99,
      stocS: 7,
      stocM: 8,
      stocL: 6,
    },
    {
        id: 'cmdycjcqt00069g80xrzswqwp',
        nume: 'Compression t-shirt negru',
        pret: 149.99,
      stocS: 6,
      stocM: 12,
      stocL: 6,
    },
    {
      id: 'cmdycjcqt00079g80wvm5xnch',
      nume: 'Compression T-shirt alb',
      pret: 149.99,
      stocS: 7,
      stocM: 12,
      stocL: 10,
    },
    {
        id: 'cmdycjcqt00059g80gyj6ussh',
        nume: 'Honey Jersey',
        pret: 159.99,
      stocS: 8,
      stocM: 7,
      stocL: 4,
    },
    {
        id: 'cmdycjcqt00089g80opx52zvq',
        nume: 'Hoodie Rocket',
        pret: 189.99,
      stocS: 4,
      stocM: 6,
      stocL: 4,
    },
]

const produseAlimentare = [
    {
        id: 'cmdycjcqt000a9g803mi0z40j',
        src1: Food1,
        src2: Food1,
        nume: 'Loaded Honey cu Creatina',
        pret: 37.99,
      stocS: 99,
      stocM: 99,
      stocL: 99,
    },
    {
        id: 'cmdycjcqt000b9g808tiz5863',
        nume: 'Loaded Honey cu Ashwagandha',
        pret: 39.99,
      stocS: 99,
      stocM: 99,
      stocL: 99,
    },
    {
        id: 'cmdycjcqt000c9g806qk5mhwa',
        nume: 'Love Honey',
        pret: 49.99,
      stocS: 99,
      stocM: 99,
      stocL: 99,
    },
    // {
    //     id: 'cmdycjcqt000a9g803mi0z40j',
    //     nume: 'Loaded Honey cu Creatina',
    //     pret: 35,
    //   stocS: 99,
    //   stocM: 99,
    //   stocL: 99,
    // },
]

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
              {produseAlimentare.map((produs, index) => (
                <Alimentare
                  key={produs.id}
                  images={alimentareImages[index]}
              nume={produs.nume}
              pret={produs.pret}
              idProdus={produs.id}
                />
              ))}
              <QuestionCard />
            </CarouselContent>
          )}
          {isVestimentareModal && (
            <CarouselContent className="w-[31.25rem] h-[18.75rem]">
            {produseVestimentare.map((produs, index) => (
              <Vestimentare
              key={produs.id}
              images={vestimentareImages[index]}
              nume={produs.nume}
              pret={produs.pret}
              idProdus={produs.id} />
                  ))}
                  <QuestionCard />
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
