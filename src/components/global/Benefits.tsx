import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Delivery from "@/../public/Delivery.svg";
import Quality from "@/../public/Quality.svg";
import Provenance from "@/../public/Provenance.svg";

const Benefits = () => {
  return (
    <Card className="w-[100%] text-yellowCustom m-auto flex flex-col lg:flex-row justify-around items-center gap-10 font-bold  rounded-none px-2">
      <div className="max-w-container-400 flex flex-col justify-center items-center gap-2 text-center bg-white rounded-16BR lg:w-1/3 border-t-4 border-x-2 border-black">
        <Image
          loading="lazy"
          src={Delivery}
          className="w-128W py-2"
          alt="Livrare"
        />
        <div className="bg-black py-8P px-8P min-w-container-300 xs:min-w-container-400 lg:min-w-0 w-full rounded-b-16BR">
          <h3 className="text-xl">Livrare</h3>
          <p>Maxim 7 zile lucratoare</p>
        </div>
      </div>
      <div className="max-w-container-400 flex flex-col justify-center items-center gap-2 text-center bg-white rounded-16BR lg:w-1/3 border-t-4 border-x-2 border-black">
        <Image
          loading="lazy"
          src={Quality}
          className="w-128W py-2"
          alt="Calitate"
        />
        <div className="bg-black py-8P px-8P min-w-container-300 xs:min-w-container-400 lg:min-w-0 w-full max-w-container-500 rounded-b-16BR">
          <h3 className="text-xl">Calitate</h3>
          <p>100% naturale</p>
        </div>
      </div>
      <div className="max-w-container-400 flex flex-col justify-center items-center gap-2 text-center bg-white rounded-16BR lg:w-1/3 border-t-4 border-x-2 border-black">
        <Image src={Provenance} className="w-128W py-2" alt="Provenienta" />
        <div className="bg-black py-8P px-8P min-w-container-300 max-w-container-300 xs:max-w-container-500 xs:min-w-container-400 lg:min-w-0 w-full rounded-b-16BR">
          <h3 className="text-xl">Provenienta</h3>
          <p>Miere 100% naturale, de la apicultori</p>
        </div>
      </div>
    </Card>
  );
};

export default Benefits;
