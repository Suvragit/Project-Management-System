import React, { useEffect, useState } from 'react';

const BIN_ID = "689a1f61d0ea881f4056ccf5";
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const OngoingPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOngoingProjects();
  }, []);

  const fetchOngoingProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Master-Key": MASTER_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const employees = data.record;

      const selectedEmail = localStorage.getItem("email");
      if (selectedEmail) {
        const employee = employees.find(emp => emp.email === selectedEmail);

        if (employee && employee["ongoing project"]?.length > 0) {
          const ongoingProjects = employee["ongoing project"].map(proj => ({
            name: proj["Project Name"],
            info: proj["Project Info"],
            skills: proj["Skills Required"],
            coordinator: proj["Project Coordinator"],
            members: proj["Members"],
            duration: proj["Project Duration"],
            credit: proj["Project Credit"],
          }));
          setProjects(ongoingProjects);
        } else {
          setProjects([]);
        }
      }
    } catch (err) {
      console.error("Error fetching ongoing projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markProjectComplete = async (projectToComplete) => {
    try {
      const response = await fetch(API_URL, {
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await response.json();
      const allUsers = data.record;

      const userEmail = localStorage.getItem("email");
      const currentUser = allUsers.find(user => user.email === userEmail);

      if (!currentUser) {
        alert("User not found!");
        return;
      }

      const updatedOngoing = currentUser["ongoing project"].filter(
        proj => proj["Project Name"] !== projectToComplete.name
      );

      const completedProject = {
        "Project Name": projectToComplete.name,
        "Project Info": projectToComplete.info,
        "Skills Required": projectToComplete.skills,
        "Project Coordinator": projectToComplete.coordinator,
        "Members": projectToComplete.members,
        "Project Duration": projectToComplete.duration,
        "Project Credit": projectToComplete.credit,
        "Completion Date": new Date().toLocaleDateString()
      };

      const updatedCompleted = [
        ...(currentUser["completed project"] || []),
        completedProject
      ];

      const updatedUser = {
        ...currentUser,
        "ongoing project": updatedOngoing,
        "completed project": updatedCompleted
      };

      const updatedUsers = allUsers.map(user => 
        user.email === userEmail ? updatedUser : user
      );

      const updateResponse = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(updatedUsers),
      });

      if (updateResponse.ok) {
        alert("Project marked as completed!");
        fetchOngoingProjects();
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error completing project:", error);
      alert("Failed to complete project. Please try again.");
    }
  };

  return (
    <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">
      {loading ? (
        <p className="text-black text-center mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : projects.length === 0 ? (
        <p className="text-black font-bold text-center mt-4">No ongoing projects found.</p>
      ) : (
        projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-[#BDD292] text-black p-6 rounded-xl mb-6 shadow-md"
          >
            <p><strong>Project Name:</strong> {project.name}</p>
            <p><strong>Project Info:</strong> {project.info}</p>
            <p><strong>Skills Required:</strong> {project.skills}</p>
            <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
            <p><strong>Members:</strong> {project.members}</p>
            <p><strong>Project Duration(months):</strong> {project.duration}</p>
            <p><strong>Project Credit:</strong> {project.credit}</p>

            <button
              onClick={() => markProjectComplete(project)}
              className="absolute bottom-4 right-4 border  rounded-md px-4 py-1 bg-[#308528] text-white hover:bg-[#9EBD5F] transition-colors duration-200"
            >
              Complete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OngoingPage;