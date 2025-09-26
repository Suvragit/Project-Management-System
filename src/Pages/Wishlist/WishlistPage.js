import React,{useState,useEffect} from "react";
import { FaTrash } from "react-icons/fa";
import { X_MASTER_KEY, USERS_BIN_ID } from "D:/PMS/pms_react/pms/src/Utility/Constant.js"; 

const WISHLIST_BIN_ID = USERS_BIN_ID; 
const MASTER_KEY = X_MASTER_KEY;

const WishlistPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true); 

        const email = localStorage.getItem("email");
        setSelectedEmail(email || "");
        if (!email) {
          console.error("No email found in localStorage");
          setLoading(false);
          return;
        }

        const res = await fetch(`https://api.jsonbin.io/v3/b/${WISHLIST_BIN_ID}`, {
          method: "GET",
          headers: {
            "X-Master-Key": MASTER_KEY,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch wishlist data");

        const data = await res.json();
        const users = Array.isArray(data) ? data : data.record;
        const user = users.find((u) => u.email === email);

        if (user && Array.isArray(user.wishlist)) {
          const formattedWishlist = user.wishlist.map((proj) => ({
            name: proj["Project Name"] || proj.name || "",
            info: proj["Project Info"] || proj.info || "",
            skills: proj["Skills Required"] || proj.skills || "",
            coordinator: proj["Project Coordinator"] || proj.coordinator || "",
            members: proj["Members"] || proj.members || "",
            duration: proj["Project Duration"] || proj.duration || "",
            deadline: proj["Deadline to Join"] || proj.deadline || "",
            credit: proj["Project Credit"] || proj.credit || "",
          }));
          setProjects(formattedWishlist);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchWishlist();
  }, []);

 
  const handleRemove = async (index) => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${WISHLIST_BIN_ID}`, {
        method: "GET",
        headers: { "X-Master-Key": MASTER_KEY },
      });

      const data = await res.json();
      const users = Array.isArray(data) ? data : data.record;

      const userIndex = users.findIndex((u) => u.email === selectedEmail);
      if (userIndex === -1) return;

      users[userIndex].wishlist.splice(index, 1);

      await fetch(`https://api.jsonbin.io/v3/b/${WISHLIST_BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(users),
      });

      setProjects((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };

  return (
    
        <div className="flex-1 p-10 bg-white overflow-y-auto">
          {loading ? (
            <p className="text-center text-black mt-4">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-black">No wishlist items found.</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="relative bg-[#BDD292] p-4 rounded-lg shadow mb-6 text-black"
              >
                
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
                >
                  <FaTrash size={18} />
                </button>

                <p><strong>Project Name:</strong> {project.name}</p>
                <p><strong>Project Info:</strong> {project.info}</p>
                <p><strong>Skills Required:</strong> {project.skills}</p>
                <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
                <p><strong>Members:</strong> {project.members}</p>
                <p><strong>Project Duration:</strong> {project.duration}</p>
                <p><strong>Deadline to Join:</strong> {project.deadline}</p>
                <p><strong>Project Credit:</strong> {project.credit}</p>
              </div>
            ))
          )}
        </div>
  );
};

export default WishlistPage;
