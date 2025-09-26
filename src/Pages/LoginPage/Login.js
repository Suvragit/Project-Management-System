import OptiAssign from '../../Assets/OptiAssign.png'; 
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { X_MASTER_KEY,USERS_BIN_ID} from "D:/PMS/pms_react/pms/src/Utility/Constant.js";

const Login = () => {
    const [loginType, setloginType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();    

    const JSONBIN_URL = USERS_BIN_ID;
    const JSONBIN_KEY = X_MASTER_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!loginType || !email || !password) {
            setError("All fields are required!");
            setLoading(false);
            return;
        }

        try {
            
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_URL}`, {
                headers: {
                    'X-Master-Key': JSONBIN_KEY
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const data = await response.json();
            const jsonData = data.record;
            
            
            const matchedUser = jsonData.find(
                (user) =>
                user.role.toLowerCase() === loginType.toLowerCase() &&
                user.email === email &&
                user.password === password
            );

            if (matchedUser) {
                localStorage.setItem('userId', matchedUser.id);
                localStorage.setItem('email', matchedUser.email);
                localStorage.setItem('name', matchedUser.name);
                localStorage.setItem('role', matchedUser.role);
                
                navigate('/home');
            } else {
                setError('Invalid Email or Password');
            }
        } catch (error) {
            console.error("Error loading user data:", error);
            setError('Failed to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <img src={OptiAssign} alt="logo" className="w-72 h-72 mx-auto -mt-16 -mb-7" />
            <h2 className="text-xl font-sans font-semibold grid place-items-center -mt-16">
                ALIGN | ASSIGN | ACHIEVE
            </h2>
            <div className="bg-[#77CAFD] rounded-md p-8 w-[430px] mx-auto mt-9 h-auto border-2 border-black">
                <form className="grid place-items-center" onSubmit={handleSubmit}>
                    <select 
                        value={loginType}
                        onChange={(e) => setloginType(e.target.value)}
                        className="w-[290px] rounded-md mb-10 h-[30px] pl-2 border-2 border-black"
                    >
                        <option value="" disabled hidden>Select Login Type</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    
                    <input 
                        className="mx-10 mb-10 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <input 
                        className="mx-10 mb-10 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {error && (
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                    )}
                    
                    <button 
                        className="bg-[#2c45ffe9] text-white w-[100px] mt-4 rounded-md py-1 border border-black hover:bg-[#0051F2] disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    
                    <Link 
                        to="/signup" 
                        className="text-blue-700 hover:underline mt-3"
                    >
                        Don’t have an account? Sign Up
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
