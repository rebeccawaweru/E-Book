import { CartContext } from "@/sections/payment";
import { useContext } from "react";
export default function Preview(){
    const {total,manual,finalTotal,dispatch,items,values} = useContext(CartContext);
    const data = items.filter((item) => item.qnty > 0);
    const pay = () => {
        alert("Processing payment!")
    }
    return <>
    <i>Order Preview</i>
    <div className="space-y-2">
    <p className="font-bold">Personal Information</p>
      <hr className="border-slate-300"></hr>
    <p>{values.fullname}</p>
    <p>{values.postaladdress}</p>
    <p>Mpesa Number : {values.phone}</p>
    <p>Email: {values.email}</p>
    </div>
    <div className="space-y-2">
    <p className="font-bold">Book</p>
      <hr className="border-slate-300"></hr>
      {data.map((item)=>{
        return <div className="space-y-2" key={item.id}> <div className="flex justify-between items-center text-sm">
        <div><p className="tracking-wide">{item.title}</p></div>
        <div className="p-2 inline-flex items-center">
            <p className="mx-4">{item.qnty === 0 ? '' : item.qnty} x {item.price}</p>
        </div>
        <div><p>Ksh {(item.price * item.qnty).toLocaleString()}</p></div>
    </div>
    <hr className="border-slate-300"></hr>
        </div>
      })}
      </div>
      <div className="flex justify-between items-center text-sm font-semibold">
        <p>Subtotal</p>
        <p>Ksh {total && total.toLocaleString()}</p>
    </div>
    {!manual && 
    <div className="flex justify-between items-center text-sm font-semibold">
        <p>Delivery Fee</p>
        <p>Ksh 200</p>
    </div>
    }
    <div className="flex justify-between items-center text-sm font-semibold">
        <p className="font-bold">Total</p>
        <p>Ksh {finalTotal}</p>
    </div>
    <div className="flex flex-wrap justify-between">
      <button onClick={()=>dispatch({type:'Prev'})} className="w-1/4 bg-black px-4 py-2  text-white hover:bg-black hover:scale-110">Previous</button>
      <button onClick={pay} className="w-1/4  bg-orange-500 px-4 py-2 text-md text-white hover:bg-black hover:scale-110">Pay Ksh {finalTotal}</button>
      </div>
    </>
}