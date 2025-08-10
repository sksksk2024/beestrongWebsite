// app/comanda/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comanda — BEESTRONG",
  robots: { index: false, follow: false },
};

export default function ComandaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
