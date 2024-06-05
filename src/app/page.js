"use client";

import InfoSection from "@/sections/info";
import PaymentSection from "@/sections/payment";
import { useEffect } from "react";
export default function Home() {
  useEffect(()=>{
    fetch('http://localhost:5000/api')
    .then((response) => response.json())
    .then((data) => console.log(data))
  },[])
  return (
    <main className="min-h-screen w-full grid grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
    <InfoSection/>
    <PaymentSection/>
    </main>
  );
}
