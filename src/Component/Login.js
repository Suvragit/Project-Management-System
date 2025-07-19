import React from "react";
import OptiAssign from '../Assets/OptiAssign.png'; 
export default function Login(){
    return(
        <div>
        <img src ={OptiAssign} className="w-72 h-72 mx-auto -mt-16 -mb-7" />
        <h2 className=" text-xl font-sans font-semibold grid place-items-center -mt-16 ">
            ALIGN | ASSIGN | ACHIEVE
            </h2>
        <div className="bg-[#93CDDD] rounded-md  p-8 w-[430px] mx-auto mt-9 h-80 border-2 border-black">
            <form className="grid place-items-center">
                <select defaultValue="select" className="w-[290px] rounded-md mb-10 h-[30px] pl-2 border-2 border-orange-400 ">
                    <option value="" disabledhidden>Select Login Type</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
                <input className="mx-10 mb-10 py-1 rounded-md w-[290px] pl-3 border-2 border-orange-400 " type="email" placeholder="Email"/>
                <input className="mx-10 mb-10 py-1 rounded-md w-[290px] pl-3 border-2 border-orange-400 "  type="password" placeholder="Password" />
                <button className=" bg-lime-500 w-[100px] mt-4 mx-20 rounded-md py-1 border border-black hover:bg-lime-600" type="submit"  >Login</button>
            </form>
        </div>
        </div>
        
    )
}