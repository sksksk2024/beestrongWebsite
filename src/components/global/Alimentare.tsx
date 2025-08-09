import React, { useState } from "react";
import Minus from "../utils/Minus";
import Plus from "../utils/Plus";
import { Card, CardContent } from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { CarouselItem } from "../ui/carousel";
import { useProductListStore } from "../hooks/productListStore";
import { getImageUrl } from "../utils/imageHelpers";
import { MarimeType } from "../utils/types";

type AlimentareType = {
  images: (string | StaticImageData)[];
  nume: string;
  disponibil?: number;
  idProdus: string;
  pret: number;
  marime?: MarimeType;
  availableStock: number;
};

const Alimentare = ({
  images,
  nume,
  pret,
  idProdus,
  availableStock,
}: AlimentareType) => {
  const [stoc, setStoc] = useState(false);
  const [, setIsHovered] = useState(false);
  const { modificaCantitate, stergeProdus, adaugaProdus, produse } =
    useProductListStore();

  const produs = produse.find((p) => p.id === idProdus);
  const currentQuantity = produs?.cantitate ?? 0;
  let remaining: number | null = null;

  if (
    typeof availableStock === "number" &&
    typeof currentQuantity === "number"
  ) {
    remaining = Math.max(availableStock - currentQuantity, 0);
  }

  const canAddMore = currentQuantity < availableStock;

  const handleModifyQuantity = (change: number) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity < 0 || newQuantity > availableStock) return;

    if (currentQuantity > 0) {
      // Modify existing product quantity
      modificaCantitate(idProdus, change);
    } else if (newQuantity > 0) {
      // Add new product
      adaugaProdus({
        id: idProdus,
        productId: idProdus,
        nume: nume,
        pret: pret,
        cantitate: newQuantity,
        disponibil: availableStock,
        imagine: getImageUrl(images[0]),
        tip: "aliment",
      });
    } else if (currentQuantity > 0 && newQuantity <= 0) {
      // Remove product
      stergeProdus(idProdus);
    }
  };

  return (
    <CarouselItem id={nume} className="basis-[66%] max-w-[66%] px-2">
      <div className="p-[0.5625rem]">
        <Card>
          <CardContent
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center h-[9.375rem] cursor-pointer group mt-64M"
          >
            {stoc ? (
              <div
                onClick={() => setStoc(!stoc)}
                className="px-32P text-xl absolute -top-[100px] w-full h-1/2 z-50 duration-300 group-hover:scale-106 font-bold bg-gray-800/60 rounded-t-16BR px-16P py-8P"
              >
                <div className="">
                  Stoc:{" "}
                  {remaining === null || Number.isNaN(remaining)
                    ? "se incarca"
                    : `${remaining} ramase`}
                </div>
                <div className="">Cost: {pret} lei</div>
              </div>
            ) : (
              <div
                onClick={() => setStoc(!stoc)}
                className="text-xl absolute z-50 duration-300 group-hover:scale-119 right-0 bottom-[196px] font-bold bg-gray-800 rounded-tr-16BR rounded-bl-16BR border-2 border-black px-16P py-8P"
              >
                Detalii
              </div>
            )}
            <Image
              className={`relative bottom-24I object-cover aspect-2/2 rounded-16BR transition-transform duration-300 group-hover:scale-105`}
              src={images[0]}
              width={300}
              height={300}
              alt={nume}
            />
          </CardContent>
        </Card>
        <div className="flex items-center justify-center gap-10 cursor-pointer h-112H relative bottom-64I">
          <button
            onClick={() => handleModifyQuantity(-1)}
            className="bg-black h-48H w-48W rounded-16BR"
          >
            <Minus className="relative left-[0.1rem] pl-[0.5rem] w-32W" />
          </button>
          <input
            type="text"
            value={currentQuantity}
            readOnly
            className="p-4P text-yellowCustom bg-gray-800 font-bold text-2xl w-16 text-center border-2 border-black rounded-16BR"
            min="0" // Prevent negative numbers
          />
          <button
            onClick={() => handleModifyQuantity(1)}
            disabled={!canAddMore}
            className="bg-black h-48H w-48W rounded-16BR"
          >
            <Plus className="pl-[0.6rem]" />
          </button>
        </div>
      </div>
    </CarouselItem>
  );
};

export default Alimentare;
