import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { X_MASTER_KEY, REQUESTS_BIN_ID,UPCOMING_BIN_ID,USERS_BIN_ID } from "D:/PMS/pms_react/pms/src/Utility/Constant.js"; 

const U_BIN_ID = UPCOMING_BIN_ID; 
const WISHLIST_BIN_ID = USERS_BIN_ID; 
const R_BIN_ID = REQUESTS_BIN_ID; 
const MASTER_KEY =X_MASTER_KEY;

const UpcomingPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]); 
  const userEmail = localStorage.getItem("email");
  const username = localStorage.getItem("name");
  const userId = localStorage.getItem("userId"); 

 
  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${R_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await res.json();

        const allRequests = Array.isArray(data?.record?.requests)
          ? data.record.requests
          : [];

        const userRequests = allRequests.filter((req) => req.userId === Number(userId));

        const userApplied = userRequests
          .filter((req) => req.status !== "rejected")
          .map((req) => req.projectName);

        const userRejected = userRequests
          .filter((req) => req.status === "rejected")
          .map((req) => req.projectName);

        setAppliedProjects(userApplied);
        setRejectedProjects(userRejected);
      } catch (err) {
        console.error("Error fetching applied/rejected projects:", err);
      }
    };

    fetchRequests();
  }, [userId]);

  
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${U_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await res.json();

        if (data?.record?.["upcoming project"]) {
          let UpcomingProject = data.record["upcoming project"].map((proj) => ({
            name: proj["Project name"],
            info: proj["Project info"],
            skills: proj["Skills required"],
            coordinator: proj["Project coordinator"],
            members: proj["Members required"],
            duration: proj["Project duration"],
            deadline: proj["Deadline to join"],
            credit: proj["Project credit"],
          }));

         
          UpcomingProject = UpcomingProject.filter(
            (proj) => !rejectedProjects.includes(proj.name)
          );

          setProjects(UpcomingProject);
        }
      } catch (err) {
        console.error("Error fetching upcoming projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, [rejectedProjects]); 

  
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userEmail) return;

      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${WISHLIST_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await res.json();

        if (Array.isArray(data?.record)) {
          const userEntry = data.record.find((item) => item.email === userEmail);
          setWishlist(userEntry?.wishlist || []);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [userEmail]);

  
  const handleWishlist = async (project) => {
    if (!userEmail) {
      alert("User not logged in!");
      return;
    }

    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${WISHLIST_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await res.json();
      let allUsers = Array.isArray(data?.record) ? data.record : [];

      const userIndex = allUsers.findIndex((item) => item.email === userEmail);

      if (userIndex !== -1) {
        const exists = allUsers[userIndex].wishlist.some(
          (item) => item.name === project.name
        );
        if (!exists) {
          allUsers[userIndex].wishlist.push(project);
        }
      } else {
        allUsers.push({
          email: userEmail,
          wishlist: [project],
        });
      }

      await fetch(`https://api.jsonbin.io/v3/b/${WISHLIST_BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(allUsers),
      });

      setWishlist((prev) =>
        prev.some((item) => item.name === project.name)
          ? prev
          : [...prev, project]
      );
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  
  const handleApply = async (project) => {
    if (!userEmail || !username || !userId) {
      alert("User not logged in!");
      return;
    }

    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${R_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await res.json();

      let allRequests = Array.isArray(data?.record?.requests)
        ? data.record.requests
        : [];

      const alreadyApplied = allRequests.some(
        (req) =>
          req.userId === Number(userId) && req.projectName === project.name
      );
      if (alreadyApplied) {
        alert(`You already applied for ${project.name}`);
        return;
      }

      const userRequests = allRequests.filter((r) => r.userId === Number(userId));
      const nextCount = userRequests.length + 1;
      const newRequestId = `REQ-U${userId}-${String(nextCount).padStart(3, "0")}`;

      const newRequest = {
        requestId: newRequestId,
        userId: Number(userId),
        username: username,
        projectName: project.name,
        status: "pending",
        handledBy: project.coordinator,
        handledRole: "Admin",
      };

      allRequests.push(newRequest);

      await fetch(`https://api.jsonbin.io/v3/b/${R_BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify({ requests: allRequests }),
      });

      setAppliedProjects((prev) => [...prev, project.name]);

      alert(`Applied successfully for ${project.name}`);
    } catch (err) {
      console.error("Error applying for project:", err);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">
      {loading ? (
        <p className="text-center text-black mt-4">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-black mt-4">No Upcoming Projects Found.</p>
      ) : (
        projects.map((project, index) => {
          const isWishlisted = wishlist.some((item) => item.name === project.name);
          const isApplied = appliedProjects.includes(project.name);

          return (
            <div
              key={index}
              className="relative bg-[#BDD292] text-black p-6 rounded-xl mb-6 shadow-md"
            >
              <p><strong>Project Name:</strong> {project.name}</p>
              <p><strong>Project Info:</strong> {project.info}</p>
              <p><strong>Skills Required:</strong> {project.skills}</p>
              <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
              <p><strong>Members:</strong> {project.members}</p>
              <p><strong>Project Duration:</strong> {project.duration}</p>
              <p><strong>Deadline to join:</strong> {project.deadline}</p>
              <p><strong>Project Credit:</strong> {project.credit}</p>

              <div className="absolute bottom-4 right-4 flex gap-3">
                {!isApplied && (
                  <button
                    className="p-1"
                    onClick={() => handleApply(project)}
                    title="Apply"
                  >
                    <FiUpload size={28} />
                  </button>
                )}

                <button
                  className="relative w-8 h-8 flex items-center justify-center"
                  onClick={() => handleWishlist(project)}
                  title="Add to Wishlist"
                >
                  {isWishlisted ? (
                    <AiFillStar className="text-yellow-300 w-full h-full" />
                  ) : (
                    <AiOutlineStar className="text-black w-full h-full" />
                  )}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UpcomingPage;
