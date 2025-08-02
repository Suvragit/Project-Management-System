import OptiAssign from '../../Assets/OptiAssign.png'; 
import { Link, useNavigate } from "react-router-dom";
import React,{useState} from 'react';
import jsonData from '../../Utility/Api.json'

const Login =() =>{
    const[loginType,setloginType]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!loginType||!email||!password){
        setError("All fields are required!");
        return;
        }
        const userList=jsonData[loginType];
       const matchedUser = jsonData.find(
  (user) =>
    user.role.toLowerCase() === loginType.toLowerCase() &&
    user.email === email &&
    user.password === password
    );

        if(matchedUser){
            localStorage.setItem('email',matchedUser.email);
            navigate('/Home');
        }else{
            setError('Invalid Email or Password');
        }
    };

    return(
        <div>
        <img src ={OptiAssign} className="w-72 h-72 mx-auto -mt-16 -mb-7" />
        <h2 className=" text-xl font-sans font-semibold grid place-items-center -mt-16 ">
            ALIGN | ASSIGN | ACHIEVE
            </h2>
        <div className="bg-[#77CAFD] rounded-md  p-8 w-[430px] mx-auto mt-9 h-auto border-2 border-black">
            <form className="grid place-items-center"
            onSubmit={handleSubmit}>
                <select value={loginType}
                onChange={(e) => setloginType(e.target.value)}
                 className="w-[290px] rounded-md mb-10 h-[30px] pl-2 border-2 border-black ">
                    <option value="" disabled hidden>Select Login Type</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
                <input className="mx-10 mb-10 py-1 rounded-md w-[290px] pl-3 border-2 border-black "
                 type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                <input className="mx-10 mb-10 py-1 rounded-md w-[290px] pl-3 border-2 border-black "
                  type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
                
                <button className=" bg-[#2c45ffe9] text-white w-[100px] mt-4 mx-20 rounded-md py-1 border border-black hover:bg-[#0051F2]"
                 type="submit">
                    Login
                   </button>
                   
                
            </form>
        </div>
        </div>
        
    )
};
export default Login;