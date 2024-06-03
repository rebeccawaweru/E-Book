"use client";
import React, { useState } from "react"
import { RiDeleteBinLine } from "react-icons/ri";
const data = [
    {
        id:1,
        title:`MANUAL: "KILL YOUR ENEMIES"`,
        price:1500,
        qnty:1,
        total:1500
    },
    {
        id:2,
        title:`E-BOOK: "KILL YOUR ENEMIES"`,
        price:700,
        qnty:0,
        total:0
    },

]
export default function PaymentSection(){
    const [items, setItems] = useState(data)
    const handleIncrement = (id) => {
      setItems(items.map((item) => {
        return item.id === id ? {...item, qnty:item.qnty + 1} : item
      }))  
    };
    const handleDecrement = (id) => {
        setItems(items.map((item) => {
            return item.id === id ? {...item, qnty:item.qnty - 1} : item
        }))
    };
    return <section className="px-4 py-2 space-y-8 font-sans text-sm flex flex-col justify-center">
        <p className="text-slate-400 ">Step 1 / 2</p>
        <div className="flex justify-between font-bold font-bold text-sm">
            <div><p>Product</p></div>
            <div><p>Sub Total</p></div>
        </div>
        <hr></hr>
        {items.map((item) => {
            return <div className="space-y-8" key={item.id}> <div className="flex justify-between items-center text-sm">
            <div><p className="tracking-wide">{item.title}</p></div>
            <div className="p-2 inline-flex items-center">
                <p className="mx-4">{item.qnty === 0 ? '' : item.qnty} x {item.price}</p>
                <button onClick={()=>handleIncrement(item.id)} className="shadow-md bg-black hover:bg-orange-500 hover:scale-110 text-white py-2 px-4 font-bold text-lg mx-2">+</button>
                {item.qnty === 1 && <button onClick={()=>handleDecrement(item.id)} className="shadow-md bg-red-800 hover:scale-110 py-3 px-4  text-xl text-white"><RiDeleteBinLine/></button>}
                {item.qnty > 1 && <button onClick={()=>handleDecrement(item.id)} className="shadow-md bg-slate-200 hover:scale-110 py-2 px-4 font-bold text-lg">-</button>}
                </div>
            <div><p>Ksh {(item.price * item.qnty).toLocaleString()}</p></div>
        </div>
        <hr></hr>
            </div>
        })}

        <button className="w-1/4 self-end bg-orange-500 px-4 py-2  text-white hover:bg-black hover:scale-110">Next</button>
    </section>
}