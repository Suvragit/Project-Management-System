import React, { useEffect, useState } from 'react';
import Head from '../../Component/Head/Head';
import Sidebar from '../../Component/Sidebar/Sidebar';
import jsonData from '../../Utility/Api.json';

const ProjectsCompleted = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const selectedemail = localStorage.getItem("email");
    if(selectedemail){
    const employee = jsonData.find(emp => emp.email === selectedemail);

    if (employee) {
      const completedProjects = employee['completed project'].map(proj => ({
        name: proj['Project Name'],
        info: proj['Project Info'],
        skills: proj['Skills Required'],
        coordinator: proj['Project Coordinator'],
        members: proj['Members'],
        duration: proj['Project Duration'],
        credit: proj['Project Credit'],
      }));
      setProjects(completedProjects);
    }
  }}, []);
  return (
    <div className="h-screen flex flex-col">
      <Head title="Projects Completed" />

      <div className="flex flex-1">
        <Sidebar activePage="Completed Projects" />

        <div className="flex-1 bg-white overflow-y-auto p-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#BDD292] text-black p-6 rounded-xl mb-6 shadow-md"
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
      </div>
    </div>
  );
};

export default ProjectsCompleted;
