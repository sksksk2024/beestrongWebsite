// app/admin/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — BEESTRONG",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
