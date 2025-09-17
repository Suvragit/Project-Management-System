import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BIN_ID = "689a1f61d0ea881f4056ccf5";
const MASTER_KEY =
  "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

const MemberDetails = () => {
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const storedProject = localStorage.getItem("selectedProject");
        if (!storedProject) {
          setLoading(false);
          return;
        }

        const selectedProject = JSON.parse(storedProject);
        setProject(selectedProject);

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "X-Master-Key": MASTER_KEY,
          },
        });

        const data = await response.json();
        const employees = data.record;

        // find employees working on this project
        const projectMembers = employees.filter((emp) =>
          emp["ongoing project"]?.some(
            (p) =>
              p["Project Name"].trim().toLowerCase() ===
              selectedProject.name.trim().toLowerCase()
          )
        );

        setMembers(projectMembers);
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!project) return <p className="text-center mt-4">No project selected.</p>;

  return (
    <div className="bg-[#c2d697] rounded-lg shadow-md p-6 w-2/3 mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Team Members</h1>

      {/* Header */}
      <div className="grid grid-cols-2 text-center font-bold px-10 py-2 ">
        <span>Name</span>
        <span>Role</span>
      </div>

      {/* Coordinator */}
      <div className="grid grid-cols-2 text-center py-2 px-10">
        <span>{project.coordinator}</span>
        <span>Co-ordinator</span>
      </div>

      {/* Members */}
      {members
        .filter((m) => m.name !== project.coordinator)
        .map((m, idx) => (
          <div
            key={idx}
            className="grid grid-cols-2 text-center px-10 py-2 "
          >
            <span>{m.name}</span>
            <span>Member</span>
          </div>
        ))}

      {/* Back button */}
      <div className="flex justify-center mt-8">
        <Link to="/ongoingproject">
          <button
            onClick={() => localStorage.removeItem("selectedProject")}
            className="border border-black rounded-md px-6 py-2 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200"
          >
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MemberDetails;
