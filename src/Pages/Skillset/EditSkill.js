import { useState } from "react";

const BIN_ID = "689a1f61d0ea881f4056ccf5";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const EditSkill = () => {
  const [newSkill, setNewSkill] = useState("");
  const [message, setMessage] = useState("");

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

      // Find the user
      const userIndex = users.findIndex((u) => u.email === userEmail);
      if (userIndex === -1) {
        setMessage("⚠️ User not found.");
        return;
      }

      // Check for duplicate skill
      if (users[userIndex].skills.includes(newSkill)) {
        setMessage("⚠️ Skill already exists.");
        return;
      }

      // Add new skill
      users[userIndex].skills.push(newSkill);

      // Update JSONBin
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(users),
      });

      setMessage("✅ Skill added successfully!");
      setNewSkill(""); // clear input
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add skill.");
    }
  };

  return (
    <div className="w-2/3 bg-white overflow-y-auto p-10">
      <div className="flex justify-center ">
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
