import React, { useEffect, useState } from 'react';
import jsonData from '../../Utility/Api.json';

const UserIcon = () => {

    const [photo, setPhoto]=useState("");
    
    useEffect(()=>{
        const selectedemail=localStorage.getItem("email")
        if(selectedemail){
            const employee = jsonData.find(emp => emp.email === selectedemail);
            if(employee){
                setPhoto(employee.image);
            }
            
        }

    },[])
    return(
        <div className='w-12 h-12 border rounded-full border-white my-2 mx-2 overflow-hidden'>
            <img 
              className="w-full h-full object-cover" 
              src={photo} 
              alt="User profile"
            />
        </div>
    )
}
export default UserIcon;