import jsonData from '../../Utility/Api.json';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const ViewSkill = () => {
    const[val,setval]=useState([]);

    useEffect(()=>{
    const selectedemail = localStorage.getItem("email");
    if(selectedemail){
    const employee = jsonData.find(emp => emp.email === selectedemail);
    
        if (employee) {
      const OngoingProject = employee['skills'];
      setval(OngoingProject);
        }
    console.log(val);
    }},[])



    return (
        <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">

            <div className="flex flex-1 justify-end ">
                <Link to="/skillset/addskills">
                <button className=" border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200">
                    ADD SKILL
                </button>
                </Link>
            </div>

            <div className="bg-[#c2d697] rounded-3xl p-6 shadow-md my-10  ">
                <h1 className="font-bold text-xl underline text-center">
                    Skillset
                </h1>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                    {
                    val.map((i)=>(
                    <li className="font-bold">{i}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default ViewSkill;
