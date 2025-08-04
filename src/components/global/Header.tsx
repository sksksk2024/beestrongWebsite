'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pulsesVariants, svgVariants } from '../motionVariants/motionVariants';
import BurgerMenu from '../utils/BurgerMenu';
import ShoppingCart from '../utils/ShoppingCart';
import Unmute from '../utils/Unmute';
import Link from 'next/link';
import Mute from '../utils/Mute';
import { useAudio } from '../contexts/AudioContext';
import { useProductListStore } from '../hooks/productListStore';

type HeaderProps = {
  toggleMenu: () => void;
  className?: string;
  title: string;
  audio: string;
  cart: string;
};

const Header = ({ toggleMenu, className, title, audio, cart }: HeaderProps) => {
  const { produse } = useProductListStore();
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <header
      className={`${className} top-0 z-50 flex justify-between items-center p-[1rem] py-0 w-full bg-black/60`}
    >
      <div className="blur w-full absolute inset-0"></div>
      <motion.button
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={toggleMenu}
        className={`z-50 cursor-pointer`}
      >
        <BurgerMenu className="w-32W sm:w-48W h-48H sm:h-64H" />
      </motion.button>

      <h1 className="absolute w-[100dvw] left-0 z-30 text-yellow-400 font-bold bg-black p-8P pl-0 -mt-8M sm:mt-0 sm:p-16P sm:pl-0 text-center text-lg sm:text-2xl lg:text-3xl">
        {title}
      </h1>
      <div className="flex justify-center items-center">
        {audio === 'true' && (
          <button
            onClick={toggleAudio}
            className="relative z-50 text-yellow-400 font-bold text-3xl"
          >
            {isPlaying ? (
              <Unmute className="w-[2.5rem] sm:w-64W h-48H sm:h-64H -mb-16M" />
            ) : (
              <Mute className="w-[2.5rem] sm:w-64W h-48H sm:h-64H -mb-16M" />
            )}
          </button>
        )}
        {cart === 'true' && (
          <Link
            href="/comanda"
            className="relative z-50 text-yellow-400 font-bold text-3xl group"
          >
            {/* When visible shopping list */}
            {produse.length > 0 && produse[0].cantitate > 0 && (
              <motion.div
                variants={pulsesVariants}
                animate="visible"
                className="z-50 absolute left-[0.3rem] sm:left-[0.5rem] bottom-[0.5rem] w-[0.6rem] h-[0.6rem] sm:w-16W sm:h-16H rounded-full bg-red-500"
              />
            )}
            <ShoppingCart className="w-[2.5rem] sm:w-64W h-48H sm:h-64H group" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
