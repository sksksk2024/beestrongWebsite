import Image from 'next/image';
import React from 'react';
import Insta from '../utils/Insta';
import Tiktok from '../utils/Tiktok';
import YouTube from '../utils/Youtube';
import Facebook from '../utils/Facebook';
import Phone from '../utils/Phone';
import Email from '../utils/Email';
import anaf from '@/../public/anaf.png';
import anpc from '@/../public/anpc.webp';
import beestrongIcon from '@/../public/beestrong.svg';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center md:items-start gap-5 md:pl-32P z-10">
      <div className="flex items-center">
        <div className="flex justify-center items-center">
          <Image src={beestrongIcon} className="w-1/2" alt="beestrong icon" />
          <span className="font-bold sm:text-xl lg:text-3xl">STRONG</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href="https://www.instagram.com/beestrong_ro/" target="_blank">
          <Insta />
        </Link>
        <Link href="https://www.tiktok.com/@beestrong.ro" target="_blank">
          <Tiktok />
        </Link>
        <Link
          href="https://www.youtube.com/@Pop.George/featured"
          target="_blank"
        >
          <YouTube />
        </Link>
        <Link href="https://www.facebook.com/share/1A9HkyJe7N/" target="_blank">
          <Facebook />
        </Link>
      </div>
      <Link
        href="tel:+40719832756"
        className=" relative z-50 flex items-center gap-2"
      >
        <Phone />
        <span>(+40)755-073-716</span>
      </Link>
      <Link
        href="mailto:george.beestrong@gmail.com"
        className=" relative z-50 flex items-center gap-2"
      >
        <Email />
        <span>george.beestrong@gmail.com</span>
      </Link>

      <div className="w-full flex flex-col md:flex-row md:justify-start items-center gap-5 md:gap-10">
        <Link href='https://anpc.ro/' target="_blank">
        <Image className="w-128W" src={anpc} alt="ANPC" />
        </Link>
        <Link href='https://www.anaf.ro' target="_blank">
        <Image className="w-128W" src={anaf} alt="ANAF" />
        </Link>
      </div>

      <p className='text-sm mb-32M max-w-container-400 text-center md:text-start'>
        &copy; {new Date().getFullYear()} Beestrong |{' '}
        Toate drepturile rezervate
      </p>
    </footer>
  );
};

export default Footer;
