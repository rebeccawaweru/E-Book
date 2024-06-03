"use client";
import ShopCart from "@/components/cart";
import Billing from "@/components/billing";
import { useReducer } from "react";
export default function PaymentSection(){
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
    return <section className="px-4 py-2 space-y-8 font-sans text-sm flex flex-col justify-center">
         <p className="text-slate-400 ">Step {state.step} / 2</p>
      {state.step === 1 && <ShopCart/>}
      {state.step === 2 && <Billing/>}
      <div className={`flex flex-wrap ${state.step > 1 ? 'justify-between' : 'justify-end'}`}>
      {state.step > 1 ?  <button onClick={()=>dispatch({type:'Prev'})} className="w-1/4 bg-black px-4 py-2  text-white hover:bg-black hover:scale-110">Previous</button> : null}
      {state.step === 1 && <button onClick={()=>dispatch({type:'Next'})} className="w-1/4  bg-orange-500 px-4 py-2 text-white hover:bg-black hover:scale-110">Next</button> }
      {state.step > 1 && <button className="w-1/4  bg-orange-500 px-4 py-2  text-white hover:bg-black hover:scale-110">Pay Ksh 3,000</button>}
      </div>
    
    </section>
}