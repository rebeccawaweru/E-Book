import Image from "next/image";
import { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { GiWorld } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
export default function InfoSection(){
    const images = ['/book.jpg', '/intro.jpg'];
    const [source,setSource] = useState('/book.jpg');
    return<div className="w-full bg-slate-100 p-4 space-y-4 font-sans flex flex-col justify-center">
        <section className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row items-center justify-center border-b border-b-2 border-b-solid  pb-4">
        <Image
        src={source}
        alt="Kill your enemies"
        className="w-3/4 h-84 object-cover"
        width={100}
        height={200}
        />
      <div className="p-4 text-sm leading-loose tracking-wide space-y-6 ">
        <p className="text-xl">KILL YOUR ENEMIES <span className="text-sm">by Abel Marite</span></p>
        <div className="flex space-x-2"><GiWorld className="mt-2"/> <p>Language: English</p></div> 
        <div className="flex space-x-2"><SlCalender className="mt-2"/> <p>Published: 24 April 2024</p> </div>
        <div className="flex space-x-2"><FaBook className="mt-2"/> <p>Page Count: 210</p> </div>
        <p className="tracking-wider leading-loose">Dive into the profound insights of author 
    Abel Marite as they unveil the strategies for triumphing over internal adversaries.</p>
        </div>

      
    </section>
    <div className="flex justify-center space-x-4">
    {images.map((i,index) => {
     return <Image key={i} src={i} alt="kill your enemies" width={100} height={100} objectFit="contain" onClick={()=>setSource(i)} className={`${i === source ? 'border border-double shadow-md border-4 border-orange-800' : null}`}/>
   })}
    </div>

      
    </div>
}