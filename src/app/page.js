"use client";

import InfoSection from "@/sections/info";
import PaymentSection from "@/sections/payment";
export default function Home() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
    <InfoSection/>
    <PaymentSection/>
    </main>
  );
}
