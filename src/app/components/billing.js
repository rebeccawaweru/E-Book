import Input from "./input"
export default function Billing(){
    return <form className="space-y-6">
    <p className="font-bold">Please complete the purchase by providing payment details</p>
    <hr className="border-slate-300"></hr>
   <Input label="Mpesa Phone Number" placeholder="e.g 07xxxxxx" />
   <Input label="Email Address" placeholder="e.g johndone@gmail.com" />

    <div className="flex justify-between items-center text-sm">
        <p>Subtotal</p>
        <p>Ksh 2, 800</p>
    </div>
    <div className="flex justify-between items-center text-sm">
        <p>Delivery Fee</p>
        <p>Ksh 200</p>
    </div>
    <div className="flex justify-between items-center text-sm">
        <p className="font-bold">Total</p>
        <p>Ksh 3, 000</p>
    </div>
    </form>
}