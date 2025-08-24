import React, { useEffect, useState } from 'react';

const BIN_ID = "689a1f61d0ea881f4056ccf5";
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

const OngoingPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  useEffect(() => {
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
        const employees = data.record; // JSONBIN stores the actual array inside "record"

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
            setProjects([]); // no ongoing projects
          }
        }
      } catch (err) {
        console.error("Error fetching ongoing projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingProjects();
  }, []);

  return (
    <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">
      {loading ? (
        <p className="text-black  text-center mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : projects.length === 0 ? (
        <p className="text-black font-bold text-center mt-4">No ongoing projects found.</p>
      ) : (
        projects.map((project, index) => (
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
        ))
      )}
    </div>
  );
};

export default OngoingPage;