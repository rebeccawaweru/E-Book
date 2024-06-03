export default function Input(props){
    return   <div className="flex flex-col space-y-2">
    <label>{props.label}</label>
    <input {...props} className="border border-solid border-black p-2 rounded-md focus:outline-none focus:border-orange-500" required/>
</div>
}