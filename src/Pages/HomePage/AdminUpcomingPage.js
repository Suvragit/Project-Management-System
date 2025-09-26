import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X_MASTER_KEY,UPCOMING_BIN_ID} from "D:/PMS/pms_react/pms/src/Utility/Constant.js";

const U_BIN_ID = UPCOMING_BIN_ID;
const MASTER_KEY = X_MASTER_KEY;

const AdminUpcomingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    projectInfo: "",
    skillsRequired: "",
    coordinator: localStorage.getItem("name") || "",
    members: "",
    duration: "",
    deadline: "",
    credit: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${U_BIN_ID}`, {
        headers: { "X-Master-Key": MASTER_KEY },
      });
      
      const data = await response.json();
      const existingProjects = data.record["upcoming project"] || [];

      const newProject = {
        "Project name": formData.projectName,
        "Project info": formData.projectInfo,
        "Skills required": formData.skillsRequired,
        "Project coordinator": formData.coordinator,
        "Members required": formData.members,
        "Project duration": formData.duration,
        "Deadline to join": formData.deadline,
        "Project credit": formData.credit
      };

      const updatedProjects = [...existingProjects, newProject];

      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${U_BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify({
          "upcoming project": updatedProjects
        }),
      });

      if (updateResponse.ok) {
        alert("Project added successfully!");
        navigate("/home");
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 bg-white overflow-y-auto p-6">
      <h1 className="text-2xl font-bold text-[#9EBD5F] mb-6">ADD PROJECT</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
          <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} placeholder="Type Here..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
          <textarea name="projectInfo" value={formData.projectInfo} onChange={handleInputChange} placeholder="Type Here..." rows="3" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills Required</label>
          <input type="text" name="skillsRequired" value={formData.skillsRequired} onChange={handleInputChange} placeholder="Type Here..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coordinator Name</label>
          <input type="text" name="coordinator" value={formData.coordinator} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Members Required</label>
          <input type="text" name="members" value={formData.members} onChange={handleInputChange} placeholder="Type Here..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Duration(months)</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Type Here..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline to Join</label>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Credit</label>
          <input type="number" name="credit" value={formData.credit} onChange={handleInputChange} placeholder="Type Here..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
            {loading ? "Saving..." : "Save Project"}
          </button>
          <button type="button" onClick={() => navigate("/home")} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpcomingPage;