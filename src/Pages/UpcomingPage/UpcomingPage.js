import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

const UPCOMING_BIN_ID = "689a1f7e43b1c97be91be549"; // Upcoming projects bin
const WISHLIST_BIN_ID = "689a1f61d0ea881f4056ccf5"; // Wishlist bin
const REQUESTS_BIN_ID = "68caf85a43b1c97be9465eed"; // Requests bin
const MASTER_KEY =
  "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const UpcomingPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]); // track applied projects

  const userEmail = localStorage.getItem("email");
  const username = localStorage.getItem("name");
  const userId = localStorage.getItem("userId"); // must be stored on login

  // Fetch upcoming projects
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${UPCOMING_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await res.json();

        if (data?.record?.["upcoming project"]) {
          const UpcomingProject = data.record["upcoming project"].map((proj) => ({
            name: proj["Project name"],
            info: proj["Project info"],
            skills: proj["Skills required"],
            coordinator: proj["Project coordinator"],
            members: proj["Members required"],
            duration: proj["Project duration"],
            deadline: proj["Deadline to join"],
            credit: proj["Project credit"],
          }));
          setProjects(UpcomingProject);
        }
      } catch (err) {
        console.error("Error fetching upcoming projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  // Fetch wishlist
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

  // Fetch applied projects for the logged-in user
  useEffect(() => {
    const fetchAppliedProjects = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${REQUESTS_BIN_ID}`, {
          method: "GET",
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await res.json();

        const allRequests = Array.isArray(data?.record?.requests)
          ? data.record.requests
          : [];

        const userApplied = allRequests
          .filter((req) => req.userId === Number(userId))
          .map((req) => req.projectName);

        setAppliedProjects(userApplied);
      } catch (err) {
        console.error("Error fetching applied projects:", err);
      }
    };

    fetchAppliedProjects();
  }, [userId]);

  // Wishlist handler
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

  // Apply handler
  const handleApply = async (project) => {
    if (!userEmail || !username || !userId) {
      alert("User not logged in!");
      return;
    }

    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${REQUESTS_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await res.json();

      let allRequests = Array.isArray(data?.record?.requests)
        ? data.record.requests
        : [];

      // prevent duplicate applications
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

      await fetch(`https://api.jsonbin.io/v3/b/${REQUESTS_BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify({ requests: allRequests }),
      });

      // Update applied projects state to hide the apply button
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
                {/* Upload icon works as Apply button; hide if already applied */}
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
