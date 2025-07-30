import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import Delivery from '@/../public/Delivery.svg';
import Quality from '@/../public/Quality.svg';
import Provenance from '@/../public/Provenance.svg';

const Benefits = () => {
  return (
    <Card className="w-[100%] m-auto flex flex-col md:flex-row justify-around items-center gap-10 font-bold rounded-none">
      <div className="flex flex-col justify-center items-center text-center">
        <Image src={Delivery} className="w-128W" alt="Livrare" />
        <h4 className="text-xl">Livrare</h4>
        <p>Maxim 7 zile lucratoare</p>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <Image src={Quality} className="w-128W" alt="Calitate" />
        <h4 className="text-xl">Calitate</h4>
        <p>100% naturale</p>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <Image src={Provenance} className="w-128W" alt="Provenienta" />
        <h4 className="text-xl">Provenienta</h4>
        <p>Miere 100% naturale, de la apicultori</p>
      </div>
    </Card>
  );
};

export default Benefits;
