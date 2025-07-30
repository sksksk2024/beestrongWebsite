'use client';

import React, { forwardRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import XMenu from '../utils/XMenu';
import Vestimentare from './Vestimentare';
import Alimentare from './Alimentare';
import Food1 from '@/../public/alimentare.jpg';
import Food2 from '@/../public/alimentare2.jpg';
import Tricou from '@/../public/tricou.jpg';

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
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index}>
                  <Alimentare
                    src1={Food1}
                    src2={Food2}
                    name="Miere de mana"
                    pret={40}
                  />
                  <Alimentare
                    src1={Food2}
                    src2={Food1}
                    name="Miere de tei"
                    pret={30}
                  />
                </React.Fragment>
              ))}
            </CarouselContent>
          )}
          {isVestimentareModal && (
            <CarouselContent className="w-[31.25rem] h-[18.75rem]">
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index}>
                  <Vestimentare
                    src1={Tricou}
                    src2={Tricou}
                    name="Tricou Simplu"
                    pret={150}
                  />
                  <Vestimentare
                    src1={Tricou}
                    src2={Tricou}
                    name="Tricou Galaxy"
                    pret={150}
                  />
                </React.Fragment>
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

export default ProductCarousel;
