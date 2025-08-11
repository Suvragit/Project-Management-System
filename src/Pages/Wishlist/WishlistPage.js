import React, { useState, useEffect } from "react";
import Head from "../../Component/Head/Head";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { FaTrash } from "react-icons/fa";
import jsonData from "../../Utility/Upcomingproject.json";

const WishlistPage = () => {
  const [projects, setProjects] = useState([]);

 
  useEffect(() => {
    if (jsonData["upcoming project"]) {
      const upcomingProjects = jsonData["upcoming project"].map((proj) => ({
        name: proj["Project name"],
        info: proj["Project info"],
        skills: proj["Skills required"],
        coordinator: proj["Project coordinator"],
        members: proj["Members required"],
        duration: proj["Project duration"],
        deadline: proj["Deadline to join"],
        credit: proj["Project credit"],
      }));
      setProjects(upcomingProjects);
    }
  }, []);

  const handleDelete = (projectName) => {
    setProjects((prev) =>
      prev.filter((project) => project.name !== projectName)
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Head />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10 bg-white overflow-y-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative bg-[#BDD292] p-4 rounded-lg shadow mb-6 text-black"
            >
              <p><strong>Project Name:</strong> {project.name}</p>
              <p><strong>Project Info:</strong> {project.info}</p>
              <p><strong>Skills Required:</strong> {project.skills}</p>
              <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
              <p><strong>Members:</strong> {project.members}</p>
              <p><strong>Project Duration:</strong> {project.duration}</p>
              <p><strong>Deadline to Join:</strong> {project.deadline}</p>
              <p><strong>Project Credit:</strong> {project.credit}</p>

              <button
                onClick={() => handleDelete(project.name)}
                className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
