'use client';
// @typescript-eslint/no-explicit-any

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Header from '@/components/global/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import XMenu from '@/components/utils/XMenu';
import Minus from '@/components/utils/Minus';
// import { useProductListStore } from '@/components/hooks/productListStore';
import { SignOutButton } from '@clerk/nextjs';
// import Food1 from '@/../public/alimentare.jpg';
// import Food2 from '@/../public/alimentare2.jpg';
// import Tricou1 from '@/../public/tigru1.jpg';
// import Tricou11 from '@/../public/tigru2.jpg';
// import Tricou2 from '@/../public/rocket1.jpg';
// import Tricou22 from '@/../public/stelar2.jpg';
// import Tricou3 from '@/../public/pantaloniNegri1.jpg';
// import Tricou33 from '@/../public/pantaloniNegri2.jpg';
// import Tricou4 from '@/../public/pantaloniAlbastri1.jpg';
// import Tricou44 from '@/../public/pantaloniAlbastri2.jpg';
// import Tricou5 from '@/../public/maieu1.jpg';
// import Tricou55 from '@/../public/maieu2.jpg';
// import Tricou6 from '@/../public/jeAlb1.jpg';
// import Tricou66 from '@/../public/jeAlb2.jpg';
// import Tricou7 from '@/../public/je1.jpg';
// import Tricou77 from '@/../public/je2.jpg';
// import Tricou8 from '@/../public/fire1.jpg';
// import Tricou88 from '@/../public/fire2.jpg';
// import Tricou9 from '@/../public/beast1.jpg';
// import Tricou99 from '@/../public/beast2.jpg';
// import Tricou10 from '@/../public/albRocket1.jpg';
// import Tricou101 from '@/../public/albRocket2.jpg';

interface Order {
  id: string;
  numeClient: string;
  email: string;
  telefon: string;
  marimeTricou: string;
  marimePantaloni: string;
  codPostal: string;
  iteme: {
    id: string;
    nume: string;
    pret: number;
    cantitate: number;
    imagine: string;
  }[];
  total: number;
  status: 'Nelivrat' | 'Livrat';
  createdAt: string;
}

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [down, setDown] = useState<boolean>(false);
  const [closeList,] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('api/comanda');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/comanda', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      const updatedOrder = await res.json();

      // Update local state
      setOrders(
        orders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleOrderDetails = (order: Order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
    setDown(false);
  };

  const removeClass = closeList ? 'hidden' : 'block';
  const listClass = down ? 'h-64H' : 'h-256H overflow-y-auto';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="h-auto bg-black text-yellowCustom px-16P py-48P w-full">
      {/* Overlay that darkens the content when menu is open */}
      <div
        className={`z-20 fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-75' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      <div className="relative z-30 mb-64M">
        <Header
          toggleMenu={toggleMenu}
          className="fixed"
          title="ADMIN PANEL"
          audio="false"
          cart="false"
        />
      </div>
      {/* Sliding Menu */}
      <div
        className={`max-w-container-300 text-yellowCustom bg-black fixed top-0 left-0 h-full xs:w-1/4 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
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
              className=""
            >
              <Link className="cursor-pointer" href="/">
                Acasa
              </Link>
            </motion.li>
            <motion.li
              variants={buttonVariants}
              initial="hidden"
              animate="end"
              whileHover="hover"
              className="underline"
            >
              <Link className="cursor-pointer" href="/admin">
                Admin
              </Link>
            </motion.li>

            {/* Sign In/Sign Out based on auth state */}
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
          </ul>
        </div>
      </div>
      <h2 className="text-sm sm:text-xl lg:text-2xl font-bold underline mb-48M">
        Ultima luna
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-container-1500 mb-128M">
          <thead>
            <tr className="underline">
              <th className="text-left p-2">Nume</th>
              <th className="text-left p-2">Numar de telefon</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Marime haina</th>
              <th className="text-left p-2">Marime pantaloni</th>
              <th className="text-left p-2">Cod postal</th>
              <th className="text-left p-2">Cumparaturi</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-400">
                <td className="p-2">{order.numeClient}</td>
                <td className="p-2">{order.telefon}</td>
                <td className="p-2">{order.email}</td>
                <td className="p-2">{order.marimeTricou}</td>
                <td className="p-2">{order.marimePantaloni}</td>
                <td className="p-2">{order.codPostal}</td>
                <td className="p-2">
                  <motion.div onClick={() => toggleOrderDetails(order)}>
                    <Minus className="relative z-50" />
                  </motion.div>
                </td>
                <td
                  // order.id
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      order.status === 'Nelivrat' ? 'Livrat' : 'Nelivrat'
                    )
                  }
                  className={`relative left-2 py-2 cursor-pointer duration-300 hover:font-bold ${order.status === 'Nelivrat' ? 'text-red-500' : 'text-green-500'}`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shopping List for Selected Order */}
      {selectedOrder && (
        <div className="flex flex-col justify-center items-center w-full">
          <section
            className={`fixed bottom-0 transform-x-1/2 text-xl text-yellowCustom z-30 text-center ${listClass} ${removeClass}`}
          >
            <div className="bg-gray-800 p-32P pt-32P w-full mx-auto rounded-t-16BR">
              <h3 className="underline mb-32M text-2xl">
                {selectedOrder.numeClient}
              </h3>
              <ul>
                {selectedOrder.iteme.map((item: any, index: number) => {
                  const pretTotal = item.cantitate * item.pret;
                  return (
                    <React.Fragment key={index}>
                      <li className="underline">
                        <div className="flex justify-around items-center gap-10">
                          <Image
                            className="w-10 h-10 bg-black z-50 rounded-full"
                            src={item.imagine}
                            width={100}
                            height={100}
                            alt="img"
                          />
                          <h3>{item.nume}</h3>
                          <p>
                            Pret{' '}
                            <span>
                              {item.cantitate} * {item.pret} = {pretTotal}
                            </span>{' '}
                            lei
                          </p>
                        </div>
                      </li>
                      <hr className="bg-gray-400 h-1 w-full my-[1rem]" />
                    </React.Fragment>
                  );
                })}
                <li className="underline overflow-x-auto">
                  <div className="flex justify-between items-center gap-10">
                    <h3>Pret total: </h3>
                    <p>
                      <span>{selectedOrder.total}</span> lei
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
