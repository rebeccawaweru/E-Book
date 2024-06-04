import { useContext} from "react"
import Input from "./input"
import { CartContext } from "@/sections/payment"
export default function Billing(){
    const { total,manual,finalTotal} = useContext(CartContext);
    return <form className="space-y-6">
    <p className="font-bold">Please complete the purchase by providing payment details</p>
    <hr className="border-slate-300"></hr>
    {!manual && <div className="grid grid-cols-2 gap-2">
    <Input label="Full Name" />
    <Input label="Postal Address" />
    </div>
    }
   <Input label="Mpesa Phone Number" placeholder="e.g 07xxxxxx" />
   <Input label="Email Address" placeholder="e.g johndone@gmail.com" />

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
    </form>
}