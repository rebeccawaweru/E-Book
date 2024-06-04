import React, { useContext, useMemo } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CartContext } from "@/sections/payment";
export default function ShopCart(){
    const { items, handleIncrement, handleDecrement} = useContext(CartContext) 
    return <>
        <div className="flex justify-between font-bold font-bold text-sm">
            <div><p>Product</p></div>
            <div><p>Sub Total</p></div>
        </div>
        <hr className="border-slate-300"></hr>
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
        <hr className="border-slate-300"></hr>
            </div>
        })}
    </>
}