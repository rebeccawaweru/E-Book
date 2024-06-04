"use client";
import ShopCart from "@/components/cart";
import Billing from "@/components/billing";
import { createContext, useReducer,useState,useMemo } from "react";
export const CartContext = createContext()
export default function PaymentSection(){
    const data = [
        {
            id:1,
            title:`MANUAL: "KILL YOUR ENEMIES"`,
            price:1500,
            qnty:1,
            total:1500,
            format:'manual'
        },
        {
            id:2,
            title:`E-BOOK: "KILL YOUR ENEMIES"`,
            price:700,
            qnty:0,
            total:0,
            format:'soft'
        },
    ];
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
      const finalTotal = useMemo(()=> {
        return total && (!manual ? (total + 200).toLocaleString() : total.toLocaleString())
      },[total,manual])
    
    const initialState = {
        step:1
    }
    const reducer = (state=initialState,action) => {
        switch(action.type){
            case 'Next':
                return {
                    step: state.step + 1
                }
            case 'Prev':
                return {
                    step: state.step - 1
                }
            case 'Reset':
                return initialState
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return <CartContext.Provider value={{items,total,manual,finalTotal,handleIncrement,handleDecrement}}>
        <section className="px-4 py-2 space-y-8 font-sans text-sm flex flex-col justify-center">
         <p className="text-slate-400 ">Step {state.step} / 2</p>
      {state.step === 1 && <ShopCart/>}
      {state.step === 2 && <Billing/>}
      <div className={`flex flex-wrap ${state.step > 1 ? 'justify-between' : 'justify-end'}`}>
      {state.step > 1 ?  <button onClick={()=>dispatch({type:'Prev'})} className="w-1/4 bg-black px-4 py-2  text-white hover:bg-black hover:scale-110">Previous</button> : null}
      {state.step === 1 && <button onClick={()=>dispatch({type:'Next'})} className="w-1/4  bg-orange-500 px-4 py-2 text-white hover:bg-black hover:scale-110">Next</button> }
      {state.step > 1 && <button className="w-1/4  bg-orange-500 px-4 py-2  text-white hover:bg-black hover:scale-110">Pay Ksh {finalTotal}</button>}
      </div>
    </section>
    </CartContext.Provider>
}