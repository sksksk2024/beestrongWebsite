import React, { useEffect, useState } from "react";
import Minus from "../utils/Minus";
import Plus from "../utils/Plus";
import { Card, CardContent } from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { CarouselItem } from "../ui/carousel";
import { useProductListStore } from "../hooks/productListStore";
import { getImageUrl } from "../utils/imageHelpers";
import { MarimeType } from "../utils/types";
import { motion } from "framer-motion";

type TricouType = {
  images: (string | StaticImageData)[];
  nume: string;
  pret: number;
  idProdus: string;
  // marime?: MarimeType
  stockMap: { S: number; M: number; L: number };
};

const Tricou = ({ images, nume, pret, idProdus, stockMap }: TricouType) => {
  const [marime, setMarime] = useState<MarimeType>("S");

  const [stoc, setStoc] = useState(false);
  const [, setIsHovered] = useState(false);

  const { stergeProdus, modificaCantitate, adaugaProdus, produse } =
    useProductListStore();

  const [current, setCurrent] = useState(0);

  // every 5 seconds advance to the next image (wrap around)
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, [images.length]);

  const uniqueId = `${idProdus}-${marime}`;
  const produs = produse.find((p) => p.id === uniqueId);

  // remaining stock for this size
  const currentQuantity = produs?.cantitate || 0;
  // const remaining = stockMap[marime] - currentQuantity

  const handleModifyQuantity = (change: number) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity < 0 || newQuantity > stockMap[marime]) return;

    if (currentQuantity > 0) {
      // Modify existing product quantity
      modificaCantitate(uniqueId, change);
    } else if (newQuantity > 0) {
      // Add new product
      const sizeSuffix = marime || "S"; // default to "S" if none selected

      adaugaProdus({
        id: uniqueId,
        productId: idProdus,
        nume: nume,
        pret: pret,
        cantitate: newQuantity,
        disponibil: stockMap[marime],
        imagine: getImageUrl(images[0]),
        tip: "vestimentar",
        marime: sizeSuffix,
      });
    } else if (currentQuantity > 0 && newQuantity <= 0) {
      // Remove product
      stergeProdus(uniqueId);
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
                className="px-32P text-xl absolute -top-[100px] w-full h-[300px] rounded-16BR z-50 duration-300 group-hover:scale-106 font-bold bg-gray-800/60 rounded-t-16BR px-16P py-8P"
              >
                <h3 className="mb-8M">Stocuri:</h3>
                <div className="flex flex-col gap-1 sm:gap-4 w-full text-black">
                  {(["S", "M", "L"] as MarimeType[]).map((s) => {
                    const sizeQuantity =
                      produse.find((p) => p.id === `${idProdus}-${s}`)
                        ?.cantitate || 0;
                    const remaining = stockMap[s] - sizeQuantity;

                    return (
                      <button
                        onClick={() => {
                          setMarime(s);
                          // modificaMarime(uniqueId, s)
                          setStoc(false);
                        }}
                        key={s}
                        type="button"
                        className={`rounded-16BR text-sm text-center py-8P  px-16P font-bold cursor-pointer hover:scale-105
                                ${marime === s ? "bg-gray-800 text-yellowCustom" : "bg-gray-400 text-white"}
                                `}
                      >
                        {s} ({" "}
                        {remaining === null
                          ? "se incarca"
                          : `${remaining} ramase`}{" "}
                        )
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8M">Cost: {pret} lei</div>
              </div>
            ) : (
              <div
                onClick={() => setStoc(!stoc)}
                className="text-xl absolute z-50 duration-300 group-hover:scale-119 right-0 bottom-[196px] font-bold bg-gray-800 rounded-tr-16BR rounded-bl-16BR border-2 border-black px-16P py-8P"
              >
                Detalii
              </div>
            )}
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={images[current]}
                alt={nume}
                className={`relative bottom-24I object-cover aspect-2/2 rounded-16BR transition-transform duration-300 group-hover:scale-105`}
              />
            </motion.div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center gap-10 cursor-pointer h-112H relative bottom-64I">
          <button
            onClick={() => handleModifyQuantity(-1)}
            disabled={currentQuantity <= 0}
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
            disabled={currentQuantity >= stockMap[marime]}
            className="bg-black h-48H w-48W rounded-16BR"
          >
            <Plus className="pl-[0.6rem]" />
          </button>
        </div>
      </div>
    </CarouselItem>
  );
};

export default Tricou;
