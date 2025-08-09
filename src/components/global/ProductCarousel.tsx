"use client";

import React, { forwardRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import XMenu from "../utils/XMenu";
import Vestimentare from "./Vestimentare";
import Alimentare from "./Alimentare";
import QuestionCard from "./QuestionCard";
import { StockMap } from "../utils/types";
import {
  alimentareImages,
  produseAlimentare,
  produseVestimentare,
  vestimentareImages,
} from "../utils/StaticImages";

type carouselProps = {
  isAlimenteModal: boolean;
  isVestimentareModal: boolean;
  handleAlimenteModal: (isOpen: boolean) => void;
  handleVestimentareModal: (isOpen: boolean) => void;
  vestStocks: Record<string, StockMap>;
  alimStocks: Record<string, StockMap>;
};

const ProductCarousel = forwardRef<HTMLDivElement, carouselProps>(
  (
    {
      isAlimenteModal,
      isVestimentareModal,
      vestStocks,
      alimStocks,
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
          className="absolute -left-0 -inset-y-45 xs:-inset-y-80 lg:-inset-y-46 bg-black w-[200dvw] opacity-100 h-[28.125rem] z-50 lg:h-[26.125rem] overflow-y-auto"
        ></div>

        <Carousel
          opts={{
            align: "start",
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
              {produseAlimentare.map((prod, idx) => (
                <Alimentare
                  key={prod.id}
                  images={alimentareImages[idx]}
                  nume={prod.nume}
                  pret={prod.pret}
                  idProdus={prod.id}
                  availableStock={alimStocks[prod.id]?.S ?? 0}
                />
              ))}
              <QuestionCard />
            </CarouselContent>
          )}
          {isVestimentareModal && (
            <CarouselContent className="w-[31.25rem] h-[18.75rem]">
              {produseVestimentare.map((prod, idx) => (
                <Vestimentare
                  key={prod.id}
                  images={vestimentareImages[idx]}
                  nume={prod.nume}
                  pret={prod.pret}
                  idProdus={prod.id}
                  stockMap={vestStocks[prod.id] ?? { S: 0, M: 0, L: 0 }}
                />
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
ProductCarousel.displayName = "ProductCarousel";

export default ProductCarousel;
