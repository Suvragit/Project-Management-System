import { useEffect, useState } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UPCOMING_BIN_ID = "689a1f7e43b1c97be91be549";
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const AdminCards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add navigation

  const username = localStorage.getItem("name");

  useEffect(() => {
    const fetchProjects = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${UPCOMING_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await res.json();

        if (data?.record?.["upcoming project"]) {
          const userProjects = data.record["upcoming project"]
            .filter((proj) => proj["Project coordinator"] === username)
            .map((proj) => ({
              name: proj["Project name"],
              info: proj["Project info"],
              skills: proj["Skills required"],
              coordinator: proj["Project coordinator"],
              members: proj["Members required"],
              duration: proj["Project duration"],
              deadline: proj["Deadline to join"],
              credit: proj["Project credit"],
            }));

          setProjects(userProjects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  const handleAddProject = () => {
    navigate("/home/add"); // Navigate to add project page
  };

  return (
    <div className="w-full flex-1 bg-white overflow-y-auto p-6">
      {/* Blue + Button */}
      <button 
        onClick={handleAddProject}
        className="fixed bottom-6 right-6 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-10"
      >
        <FaPlus className="w-6 h-6" />
      </button>

      {loading ? (
        <p className="text-center text-black mt-4">Loading...</p>
      ) : !username ? (
        <p className="text-center text-black mt-4">No username found in local storage.</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-black mt-4">
          No projects found for coordinator: <strong>{username}</strong>
        </p>
      ) : (
        projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full bg-[#BDD292] text-black p-6 rounded-xl mb-6 shadow-md flex items-center justify-between"
          >
            <div className="pr-10">
              <p><strong>Project Name:</strong> {project.name}</p>
              <p><strong>Project Info:</strong> {project.info}</p>
              <p><strong>Skills Required:</strong> {project.skills}</p>
              <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
              <p><strong>Members:</strong> {project.members}</p>
              <p><strong>Project Duration:</strong> {project.duration}</p>
              <p><strong>Deadline to join:</strong> {project.deadline}</p>
              <p><strong>Project Credit:</strong> {project.credit}</p>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center">
              <FaBell className="text-yellow-500 w-6 h-6" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCards;