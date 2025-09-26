import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X_MASTER_KEY,USERS_BIN_ID } from "D:/PMS/pms_react/pms/src/Utility/Constant.js"; 


const BIN_ID = USERS_BIN_ID;
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const MASTER_KEY = X_MASTER_KEY;

const EditSkill = () => {
  const [newSkill, setNewSkill] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      setMessage("⚠️ Please enter a skill.");
      return;
    }

    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        setMessage("⚠️ User not logged in.");
        return;
      }

      const res = await fetch(API_URL, {
        headers: {
          "X-Master-Key": MASTER_KEY,
        },
      });
      const data = await res.json();
      let users = data.record;

      const userIndex = users.findIndex((u) => u.email === userEmail);
      if (userIndex === -1) {
        setMessage("⚠️ User not found.");
        return;
      }

      if (users[userIndex].skills.includes(newSkill)) {
        setMessage("⚠️ Skill already exists.");
        return;
      }

      users[userIndex].skills.push(newSkill);

      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(users),
      });

      setMessage("Skill added successfully!");
      setNewSkill("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to add skill.");
    }
  };

  return (
    <div className="w-2/3 bg-white overflow-y-auto p-10 relative">

      <button
        onClick={() => navigate("/skillset")}
        className="absolute top-4 right-4 border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200"
      >
        Back
      </button>


      {/* Add Skill Section */}
      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Enter a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="w-full max-w-md h-10 p-2 border border-black rounded-l-md"
        />
        <button
          onClick={handleAddSkill}
          className="h-10 border border-black rounded-r-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200"
        >
          ADD
        </button>
      </div>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}

      {/* Certificates Section */}
      <h1 className="mt-48 text-2xl font-bold"> ADD CERTIFICATES </h1>

      <div className="flex flex-col justify-center items-center border-2 border-black rounded-md w-auto h-80 mt-6 mx-auto">
        <h1 className="text-xl font-bold mb-8"> UPLOAD CERTIFICATES </h1>
        <input type="file" className="mb-4" />
        <button className="h-10 border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200">
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default EditSkill;
