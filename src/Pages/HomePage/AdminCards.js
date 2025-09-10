import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

const UPCOMING_BIN_ID = "689a1f7e43b1c97be91be549"; // Upcoming projects bin
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const AdminCards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("name"); // project coordinator’s name

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
          // Filter projects based on coordinator === username
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

  return (
    <div className="w-full flex-1 bg-white overflow-y-auto p-6">
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

            {/* Bell Icon */}
            <div className="absolute top-4 right-4 flex items-center">
              <FaBell className="text-yellow-500 w-6 h-6" />
              <span className="ml-1 text-red-600 font-bold text-sm">1</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCards;
