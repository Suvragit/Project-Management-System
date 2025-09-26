import { useEffect, useState } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { X_MASTER_KEY,USERS_BIN_ID,UPCOMING_BIN_ID, REQUESTS_BIN_ID} from "D:/PMS/pms_react/pms/src/Utility/Constant.js";

const U_BIN_ID = UPCOMING_BIN_ID; 
const USER_BIN_ID = USERS_BIN_ID; 
const R_BIN_ID = REQUESTS_BIN_ID; 
const MASTER_KEY = X_MASTER_KEY;

const AdminCards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movingIndex, setMovingIndex] = useState(null);
  const navigate = useNavigate();

  
  const username = localStorage.getItem("name");

  
  let storedUserRaw = null;
  try {
    storedUserRaw = localStorage.getItem("user");
  } catch (e) {
    storedUserRaw = null;
  }
  let storedUser = null;
  try {
    if (storedUserRaw) storedUser = JSON.parse(storedUserRaw);
  } catch (e) {
    storedUser = null;
  }

  useEffect(() => {
    const fetchProjects = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${U_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        if (!res.ok) throw new Error("Failed to fetch upcoming bin");
        const json = await res.json();
        const record = json?.record ?? json;

        if (record && Array.isArray(record["upcoming project"])) {
          const userProjects = record["upcoming project"]
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
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching upcoming projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  const handleAddProject = () => {
    navigate("/home/add");
  };

  const handleBellClick = (projectName) => {
    localStorage.setItem("projectName", projectName);
    navigate("/requests");
  };

  
  const handleStartProject = async (project, idx) => {
    if (!username) {
      alert("No username found in localStorage.");
      return;
    }

    setMovingIndex(idx);

    
    const storedUserId = storedUser?.id ?? storedUser?.userId ?? null;
    const storedUserUsername = storedUser?.username ?? storedUser?.name ?? null;

    try {
      
      const upRes = await fetch(`https://api.jsonbin.io/v3/b/${U_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });
      if (!upRes.ok) throw new Error("Failed to read upcoming bin");
      const upJson = await upRes.json();
      const upRecord = upJson?.record ?? upJson;

      if (!upRecord || !Array.isArray(upRecord["upcoming project"])) {
        throw new Error("Invalid upcoming bin structure");
      }

      const targetName = (project.name || "").toString().trim().toLowerCase();

      
      const reqRes = await fetch(`https://api.jsonbin.io/v3/b/${R_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });
      if (!reqRes.ok) throw new Error("Failed to read requests bin");
      const reqJson = await reqRes.json();
      const reqRecord = reqJson?.record ?? reqJson;

      const acceptedUsers = new Set();
      if (reqRecord && Array.isArray(reqRecord.requests)) {
        reqRecord.requests.forEach((r) => {
          if (!r) return;
          const rProject = ((r.projectName || "") + "").toString().trim().toLowerCase();
          if (rProject === targetName && String(r.status).toLowerCase() === "accepted") {
            if (r.username) acceptedUsers.add(`uname:${r.username}`);
            if (r.userId !== undefined && r.userId !== null) acceptedUsers.add(`uid:${r.userId}`);
          }
        });
      }

      
      upRecord["upcoming project"] = upRecord["upcoming project"].filter((p) => {
        const nameLower = ((p["Project name"] || "") + "").toString().trim().toLowerCase();
        return nameLower !== targetName;
      });

      
      const putUpRes = await fetch(`https://api.jsonbin.io/v3/b/${U_BIN_ID}`, {
        method: "PUT",
        headers: {
          "X-Master-Key": MASTER_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upRecord),
      });
      if (!putUpRes.ok) throw new Error("Failed to update upcoming bin");

      
      const usersRes = await fetch(`https://api.jsonbin.io/v3/b/${USER_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });
      if (!usersRes.ok) throw new Error("Failed to read users bin");
      const usersJson = await usersRes.json();
      const usersRecord = usersJson?.record ?? usersJson;

      if (!Array.isArray(usersRecord)) {
        throw new Error("Users bin should be an array of user objects");
      }

      
      const ongoingObj = {
        "Project Name": project.name,
        "Project Info": project.info,
        "Skills Required": project.skills,
        "Project Coordinator": project.coordinator,
        "Members": project.members,
        "Project Duration": project.duration,
        "Project Credit": project.credit,
      };

      
      for (let i = 0; i < usersRecord.length; i++) {
        const user = usersRecord[i];
        if (!user) continue;

        const matchedByUsername = user.username && acceptedUsers.has(`uname:${user.username}`);
        const matchedByName = user.name && acceptedUsers.has(`uname:${user.name}`);
        const matchedById = (user.id !== undefined && user.id !== null) && acceptedUsers.has(`uid:${user.id}`);

        if (matchedByUsername || matchedByName || matchedById) {
          if (!Array.isArray(user["ongoing project"])) user["ongoing project"] = [];

          const already = user["ongoing project"].some((op) => {
            return ((op["Project Name"] || "") + "").toString().trim().toLowerCase() === targetName;
          });
          if (!already) {
            user["ongoing project"].push(ongoingObj);
          }
        }
      }

      
      const coordinatorIndex = usersRecord.findIndex(
        (u) => u?.username === username || u?.name === username
      );
      if (coordinatorIndex !== -1) {
        const coordUser = usersRecord[coordinatorIndex];
        if (!Array.isArray(coordUser["ongoing project"])) coordUser["ongoing project"] = [];

        const coordAlready = coordUser["ongoing project"].some((op) => {
          return ((op["Project Name"] || "") + "").toString().trim().toLowerCase() === targetName;
        });

        if (!coordAlready) {
          coordUser["ongoing project"].push(ongoingObj);
        }
      } else {
        console.warn(`Coordinator "${username}" not found in users bin; skipped adding to their ongoing project.`);
      }

     
      if (storedUser) {
        
        let storedIndex = -1;
        if (storedUserId !== null) {
          storedIndex = usersRecord.findIndex((u) => u?.id === storedUserId);
        }
        if (storedIndex === -1 && storedUserUsername) {
          storedIndex = usersRecord.findIndex((u) => u?.username === storedUserUsername || u?.name === storedUserUsername);
        }

        if (storedIndex !== -1) {
          const su = usersRecord[storedIndex];
          if (!Array.isArray(su["ongoing project"])) su["ongoing project"] = [];

          const storedAlready = su["ongoing project"].some((op) => {
            return ((op["Project Name"] || "") + "").toString().trim().toLowerCase() === targetName;
          });

          if (!storedAlready) {
            su["ongoing project"].push(ongoingObj);
          }
        } else {
          console.warn("Stored user (from localStorage.key 'user') not found in users bin; skipped adding to their ongoing project.");
        }
      }

      
      const putUsersRes = await fetch(`https://api.jsonbin.io/v3/b/${USER_BIN_ID}`, {
        method: "PUT",
        headers: {
          "X-Master-Key": MASTER_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usersRecord),
      });
      if (!putUsersRes.ok) throw new Error("Failed to update users bin");

      
      setProjects((prev) => prev.filter((p) => ((p.name || "") + "").toString().trim().toLowerCase() !== targetName));

      alert(`Project "${project.name}" started.`);
    } catch (err) {
      console.error("Error while starting project:", err);
      alert("Failed to start project — check console for details.");
    } finally {
      setMovingIndex(null);
    }
  };

  return (
    <div className="w-full flex-1 bg-white overflow-y-auto p-6">
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
              <p><strong>Project Duration(months):</strong> {project.duration}</p>
              <p><strong>Deadline to join:</strong> {project.deadline}</p>
              <p><strong>Project Credit:</strong> {project.credit}</p>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center space-x-3">
              <button onClick={() => handleBellClick(project.name)}>
                <FaBell className="text-yellow-500 w-6 h-6 cursor-pointer" />
              </button>

              <button
                onClick={() => handleStartProject(project, index)}
                disabled={movingIndex === index}
                className="bg-blue-600 border border-black rounded-md px-3 py-1 text-sm text-white shadow hover:bg-blue-400 disabled:opacity-60"
                title="Start Project"
              >
                {movingIndex === index ? "Starting..." : "Start Project"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCards;
