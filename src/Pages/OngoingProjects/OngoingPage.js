import jsonData from '../../Utility/Api.json';
import React, { useEffect, useState } from 'react';

const OngoingPage=()=>{
    const[val,setval]=useState([]);

    useEffect(()=>{
        const employeeId=1
        const employee = jsonData.Employee.find(emp => emp.id === employeeId);

        if (employee) {
      const OngoingProject = employee['ongoing project'].map(proj => ({
        name: proj['Project Name'],
        info: proj['Project Info'],
        skills: proj['Skills Required'],
        coordinator: proj['Project Coordinator'],
        members: proj['Members'],
        duration: proj['Project Duration'],
        credit: proj['Project Credit'],
      }));
      setval(OngoingProject);
    }
},[])


    return(
            <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">
          {val.map((project, index) => (
            <div
              key={index}
              className="bg-sky-100 text-black p-6 rounded-xl mb-6 shadow-md"
            >
              <p><strong>Project Name:</strong> {project.name}</p>
              <p><strong>Project Info:</strong> {project.info}</p>
              <p><strong>Skills Required:</strong> {project.skills}</p>
              <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
              <p><strong>Members:</strong> {project.members}</p>
              <p><strong>Project Duration:</strong> {project.duration}</p>
              <p><strong>Project Credit:</strong> {project.credit}</p>
            </div>
          ))}
        </div>

    )
}

export default OngoingPage;