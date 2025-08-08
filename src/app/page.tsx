"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/global/Header";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/motionVariants/motionVariants";
import ProductCarousel from "@/components/global/ProductCarousel";
import PageWrapper from "@/components/contexts/PageWrapper";
import Footer from "@/components/global/Footer";
import Benefits from "@/components/global/Benefits";
import Food1 from "@/../public/alimentara1.png";
import Tricou1 from "@/../public/banner.jpg";
import ShoppingList from "@/components/global/ShoppingList";
import Link from "next/link";
import XMenu from "@/components/utils/XMenu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useProductStock } from "@/components/hooks/useProductStock";
import { StockMap } from "@/components/utils/types";
import {
  produseAlimentare,
  produseVestimentare,
} from "@/components/utils/StaticImages";

export default function Home() {
  const { user } = useUser();
  const isAdmin = user?.organizationMemberships?.some((m) => {
    const orgMatches = m.organization.slug?.includes("admins"); // More flexible matching
    const roleMatches = m.role === "org:admin";
    return orgMatches && roleMatches;
  });

  const [, setHoveredFood] = useState<boolean>(false);
  const [, setHoveredClothes] = useState<boolean>(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlimenteModal, setIsAlimenteModal] = useState(false);
  const [isVestimentareModal, setIsVestimentareModal] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAlimenteModal || isVestimentareModal) {
      setTimeout(() => {
        carouselRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [isAlimenteModal, isVestimentareModal]);

  useEffect(() => {
    if (isMenuOpen || isAlimenteModal || isVestimentareModal) {
      document.body.classList.add("bodyClass");
    } else {
      document.body.classList.remove("bodyClass");
    }

    // Clean up on unmount
    return () => document.body.classList.remove("bodyClass");
  }, [isMenuOpen, isAlimenteModal, isVestimentareModal]);

  const handleVestimentareModal = () => {
    setIsVestimentareModal(!isVestimentareModal);
  };

  const handleAlimenteModal = () => {
    setIsAlimenteModal(!isAlimenteModal);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Asigură-te că video-ul se încarcă corect
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Auto-play prevented:", error);
      });
    }
  }, []);

  const vestimentareIds = produseVestimentare.map((p) => p.id);
  const alimentareIds = produseAlimentare.map((p) => p.id);

  const [vestStocks, setVestStocks] = useState<Record<string, StockMap>>({});
  const [alimStocks, setAlimStocks] = useState<Record<string, StockMap>>({});

  useProductStock(
    [...vestimentareIds, ...alimentareIds],
    (productId, stock) => {
      setVestStocks((prev) => {
        if (vestimentareIds.includes(productId)) {
          return { ...prev, [productId]: stock };
        }
        return prev;
      });

      setAlimStocks((prev) => {
        if (alimentareIds.includes(productId)) {
          return { ...prev, [productId]: stock };
        }
        return prev;
      });
    }
  );

  useEffect(() => {
    // combine the two arrays of IDs into one
    const allIds = [...vestimentareIds, ...alimentareIds];
    if (!allIds.length) return;

    const query = allIds.map((id) => `id=${encodeURIComponent(id)}`).join("&");

    const fetchData = () => {
      fetch(`/api/produse?${query}`)
        .then((res) => res.json())
        .then((data) => {
          // normalize to an array
          const list = Array.isArray(data) ? data : [data];

          // build two separate maps
          const vestMap = {} as Record<string, StockMap>;
          const alimMap = {} as Record<string, StockMap>;

          list.forEach((p) => {
            const stock = { S: p.stocS, M: p.stocM, L: p.stocL };
            if (vestimentareIds.includes(p.id)) {
              vestMap[p.id] = stock;
            }
            if (alimentareIds.includes(p.id)) {
              alimMap[p.id] = stock;
            }
          });

          setVestStocks(vestMap);
          setAlimStocks(alimMap);
        })
        .catch(console.error);
    };

    // Broadcast updates to other tabs
    const channel = new BroadcastChannel("stock-sync");
    fetchData(); // initial fetch
    const interval = setInterval(() => {
      fetchData();
      channel.postMessage("update"); // broadcast an update
    }, 5000);

    channel.onmessage = (event) => {
      console.log("[Other tab] Message received:", event.data);
      if (event.data === "update") {
        fetchData(); // re-fetch if another tab sent a message
      }
    };

    // ✅ ADD THIS: listen to updates from other tabs
    channel.onmessage = (event) => {
      if (event.data === "update") {
        console.log("📥 Update received from another tab");
        fetchData();
      }
    };

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, [vestimentareIds.join(","), alimentareIds.join(",")]);

  return (
    <PageWrapper>
      <div id="bg" className="relative z-20">
        {/* Overlay that darkens the content when menu is open */}
        <div
          className={`z-20 fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-75" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        />
        {(isAlimenteModal || isVestimentareModal) && (
          <div
            className={`z-30 fixed inset-0 bg-black w-[100dvw] ${
              isAlimenteModal || isVestimentareModal
                ? "opacity-75"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={
              isAlimenteModal ? handleAlimenteModal : handleVestimentareModal
            }
          />
        )}

        {/* Sliding Menu */}
        <div
          className={`max-w-container-300 text-yellowCustom bg-black fixed top-0 left-0 h-full xs:w-1/4 z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div
              className="flex justify-between items-center mb-4"
              onClick={toggleMenu}
            >
              <h2 className="text-2xl font-bold">Meniu</h2>
              <XMenu className="hidden lg:block" />
            </div>
            <ul className="space-y-2">
              <motion.li
                variants={buttonVariants}
                initial="hidden"
                animate="end"
                whileHover="hover"
                className="underline"
              >
                <Link className="cursor-pointer" href="/">
                  Acasa
                </Link>
              </motion.li>
              {isAdmin && (
                <motion.li
                  variants={buttonVariants}
                  initial="hidden"
                  animate="end"
                  whileHover="hover"
                  className=""
                >
                  <Link className="cursor-pointer" href="/admin">
                    Admin
                  </Link>
                </motion.li>
              )}

              {/* Sign In/Sign Out based on auth state */}
              {user ? (
                <motion.li
                  variants={buttonVariants}
                  initial="hidden"
                  animate="end"
                  whileHover="hover"
                  className=""
                >
                  <SignOutButton>
                    <button className="cursor-pointer">Sign Out</button>
                  </SignOutButton>
                </motion.li>
              ) : (
                <motion.li
                  variants={buttonVariants}
                  initial="hidden"
                  animate="end"
                  whileHover="hover"
                  className="cursor-pointer"
                >
                  <Link href="sign-in">
                    Sign In <span className="text-xs">(Admin)</span>
                  </Link>
                </motion.li>
              )}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <section
          className={`text-yellowCustom bg-black flex flex-col gap-[5rem] transition-all duration-300 ${
            isMenuOpen ? "blur-sm" : ""
          }`}
        >
          {/* BG - VIDEO */}
          <div className="z-20 relative flex flex-col justify-between items-center">
            <Header
              toggleMenu={toggleMenu}
              className="fixed"
              title="BEESTRONG"
              audio="true"
              cart="true"
            />
            {/* WIP: LOOP */}
            <div className="relative z-0 top-0 left-0 w-full h-[100dvh] object-cover aspect-video object-cover aspect-video">
              <video
                preload="metadata"
                ref={videoRef}
                autoPlay
                muted
                width="100%"
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source
                  className="relative z-0"
                  src="/videos/beeVideo2.mp4"
                  type="video/mp4"
                />
                Browser-ul tău nu suportă tag-ul video.
              </video>
            </div>
            <h2 className="relative bottom-52I sm:bottom-64I lg:bottom-75I z-40 text-yellowCustom font-bold bg-black p-16P text-center text-sm sm:text-lg lg:text-2xl">
              FORTA DIVINA, DIRECT DE LA ALBINA
            </h2>
          </div>

          {/* PRODUCTS */}
          <div className="relative flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-0 px-[1rem]">
            {(isVestimentareModal || isAlimenteModal) && (
              <ProductCarousel
                ref={carouselRef}
                isAlimenteModal={isAlimenteModal}
                isVestimentareModal={isVestimentareModal}
                vestStocks={vestStocks}
                alimStocks={alimStocks}
                handleAlimenteModal={handleAlimenteModal}
                handleVestimentareModal={handleVestimentareModal}
              />
            )}
            <Card
              onClick={handleAlimenteModal}
              onMouseEnter={() => setHoveredFood(true)}
              onMouseLeave={() => setHoveredFood(false)}
              className="relative z-10 w-full max-w-container-400 h-[16.875rem] 2xs:h-[20.625rem] xs:h-400H group overflow-hidden cursor-pointer"
            >
              <Image
                className="absolute -top-128I 2xs:-top-16I object-cover 2xs:aspect-2/2 rounded-16BR transition-transform duration-300 scale-108 group-hover:scale-110"
                src={Food1}
                alt="img"
              />
              <h3 className="absolute left-[1rem] bottom-[2rem] bg-black text-yellowCustom px-[0.5rem]">
                Art Alimentare
              </h3>
            </Card>

            <Card
              onClick={handleVestimentareModal}
              onMouseEnter={() => setHoveredClothes(true)}
              onMouseLeave={() => setHoveredClothes(false)}
              className="relative z-10 w-full max-w-container-400 h-[16.875rem] 2xs:h-[20.625rem] xs:h-400H group overflow-hidden cursor-pointer"
            >
              <Image
                className="absolute -top-48I object-cover aspect-1/2 rounded-16BR transition-transform duration-300 group-hover:scale-105"
                src={Tricou1}
                // src={hoveredClothes ? Tricou2 : Tricou1}
                alt="img"
              />
              <h3 className="absolute left-[1rem] bottom-[2rem] bg-black text-yellowCustom px-[0.5rem]">
                Art Vestimentare
              </h3>
            </Card>
          </div>

          {/* COMMUNITY */}
          <div className="w-full max-w-container-1000 mx-auto mb-[5rem] xs:mb-[15rem] sm:mb-[25rem]">
            <Card className="flex items-center text-5xl font-bold bg-black">
              <div className="bg absolute z-0 inset-0 w-full aspect-2/1 object-cover rounded-16BR bg-black" />
              <h2 className="relative top-96I sm:top-176I z-10 bg-black p-16P text-yellowCustom text-sm sm:text-lg lg:text-2xl">
                {/* COMUNITATE */}
                ???
              </h2>
            </Card>
          </div>
          <Benefits />
          <Footer />

          {(isVestimentareModal || isAlimenteModal) && <ShoppingList />}
        </section>
      </div>
    </PageWrapper>
  );
}
