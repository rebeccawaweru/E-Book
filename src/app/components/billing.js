import { useContext} from "react"
import Input from "./input"
import { CartContext } from "@/sections/payment"
export default function Billing(){
    const {manual,dispatch,values,handleChange} = useContext(CartContext);
    const handleSubmit = (e) => {
        e.preventDefault()
        const formElement = e.target;
        const isValid = formElement.checkValidity();
        if (isValid){
            dispatch({type:"Next"})
        }
    }
    return <form onSubmit={handleSubmit} className="space-y-6">
    <p className="font-bold">Please complete the purchase by providing payment details</p>
    <hr className="border-slate-300"></hr>
    <Input label="Full Name" type="text"  name="fullname" value={values.fullname} onChange={handleChange}/>
   <Input label="Mpesa Phone Number" type="text" placeholder="e.g 07xxxxxx" pattern="\d{10}" title="Should be a 10 digit number" name="phone" value={values.phone} onChange={handleChange} />
   <Input label="Email Address" type="email" placeholder="e.g johndone@gmail.com" name="email" value={values.email} onChange={handleChange}  />
   <div className="flex flex-wrap justify-between">
     <button onClick={()=>dispatch({type:'Prev'})} className="w-1/4 bg-black px-4 py-2  text-white hover:bg-black hover:scale-110">Previous</button>
     <button type="submit" className="w-1/4  bg-orange-500 px-4 py-2 text-white hover:bg-black hover:scale-110">Next</button> 
      </div>
    </form>
}