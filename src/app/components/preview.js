import { CartContext } from "@/sections/payment";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { data } from "@/utils/helpers";
import CustomLoader from "./customloader";
export default function Preview(){
    const {total,manual,dispatch,items,values,setValues,setItems} = useContext(CartContext);
    const [loading,setLoading] = useState(false);
    const dataarry = items.filter((item) => item.qnty > 0);
    const pay = () => {
    setLoading(true)
     axios.post('https://ebook-server.vercel.app/api/stkpush',{
        phone: values.phone.slice(1),
        amount:total
      }).then((response) => {
         setTimeout(() => {
          axios.post('https://ebook-server.vercel.app/api/stkpushquery',{
            CheckoutRequestID: response.data.CheckoutRequestID
          }).then((res)=>{
             if (res.data.ResultCode === "0"){
                  axios.post('https://ebook-server.vercel.app/api/order',{
                    fullname:values.fullname,
                    email:values.email,
                    phone:values.phone
                 }).then((res)=>{
                   setLoading(false)
                   Swal.fire({
                    title:"Success",
                    text:"Your payment has been processed successfully. We will be in touch shortly with delivery details.",
                    showCloseButton:true,
                    icon:"success",
                  });
                 });
                  setValues({
                    fullname:"",
                    postaladdress:"",
                    phone:"",
                    email:""
                  });
                  setItems(data)
                  dispatch({type:"Reset"})     
                              
             } else if (response.data.ResultCode === 1032) {
                  Swal.fire('Error', 'Request cancelled', 'error')
                  setLoading(false)
             } else if (response.errorCode === "500.001.1001") {
                  Swal.fire('Error', 'You entered the wrong pin', 'error')
                  setLoading(false)
             } else {
                  Swal.fire('Error', 'An error occured. Please try again', 'error')
                  setLoading(false)
                }
          }).catch((err) => {
            Swal.fire('Error', 'An error occurred', 'error')
            setLoading(false)
          })
         }, 30000)
      });
    }
    return <>
    {loading &&
    <div className=" relative">
     <div className="w-full p-12 bg-slate-100 absolute left-1/2 top-40  transform -translate-x-1/2 flex flex-col justify-center items-center">Initializing payment do not exit this page...<CustomLoader/></div>
    </div>}
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
      {dataarry.map((item)=>{
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
        <p className="font-bold">Total</p>
        <p>Ksh {total && total.toLocaleString()}</p>
    </div>
    <p className="font-bold text-xs text-orange-500">N/B: Upon payment, we will be in contact with delivery details</p>
    <div className="flex flex-wrap justify-between">
      {!loading && <button  onClick={()=>dispatch({type:'Prev'})} className="w-1/4  bg-black px-4 py-2  text-white hover:bg-black hover:scale-110">Previous</button>}
      <button onClick={pay} disabled={loading} className={`w-1/4 ${loading ? 'bg-slate-200 self-end' : 'bg-orange-500'}  px-4 py-2 text-md text-white hover:bg-black hover:scale-110`}>Pay Ksh {total && total.toLocaleString()}</button>
      </div>
    </>
}