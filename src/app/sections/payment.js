"use client";
import ShopCart from "@/components/cart";
import Billing from "@/components/billing";
import Preview from "@/components/preview";
import { createContext, useReducer,useState,useMemo } from "react";
import { data,initialState,reducer } from "@/utils/helpers";
export const CartContext = createContext()
export default function PaymentSection(){
    const [values,setValues] = useState({
        fullname:"",
        postaladdress:"",
        phone:"",
        email:""
    })
    const [items, setItems] = useState(data);
    const handleIncrement = (id) => {
        setItems(items.map((item) => {
          return item.id === id ? {...item, qnty:item.qnty + 1} : item
        }));
      };
      const handleDecrement = (id) => {
          setItems(items.map((item) => {
              return item.id === id ? {...item, qnty:item.qnty - 1} : item
          }))
      };
      const total = useMemo(()=>{
        return items.reduce((subtotal, current) => subtotal + (current.price * current.qnty),0)
      },[items])
      const manual = useMemo(()=>{
        return items.some(item => item.qnty === 0 && item.format === "manual")
     },[items])
    const handleChange = (e) => {
        setValues((prev) => ({...prev, [e.target.name]:e.target.value}));
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return <CartContext.Provider value={{items,total,manual,handleIncrement,handleDecrement,state,dispatch,values,setValues,setItems,handleChange}}>
        <section className="px-4 py-4 space-y-8 font-sans text-sm flex flex-col justify-center">
         <p className="text-slate-400 ">Step {state.step} / 3</p>
      {state.step === 1 && <ShopCart/>}
      {state.step === 2 && <Billing/>}
      {state.step === 3 && <Preview/>}
    </section>
    </CartContext.Provider>
}