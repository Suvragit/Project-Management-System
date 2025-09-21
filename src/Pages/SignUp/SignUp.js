import React, { useState } from "react";
import OptiAssign from '../../Assets/OptiAssign.png';

import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    role: "",
    name: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.phone || !formData.username || !formData.password || !formData.role || !formData.name) {
      setError("All fields are required!");
      return;
    }

    try {
      // Fetch existing users from JSONBin
      const res = await fetch("https://api.jsonbin.io/v3/b/689a1f61d0ea881f4056ccf5/latest", {
        headers: {
          "X-Master-Key": "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS",
        },
      });

      const data = await res.json();
      const users = data.record;

      // Generate new ID
      const numericIds = users.filter(u => !isNaN(u.id)).map(u => u.id);
      const newId = numericIds.length ? Math.max(...numericIds) + 1 : 1;

      // New user object
      const newUser = {
        id: newId,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        name: formData.name,
        image: "https://dummyjson.com/icon/sophiab/128",
        skills: [],
        wishlist: [],
        bench: "0",
        "ongoing project": [],
        "completed project": []
      };

      // Update JSONBin
      const updatedUsers = [...users, newUser];
      await fetch("https://api.jsonbin.io/v3/b/689a1f61d0ea881f4056ccf5", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS",
        },
        body: JSON.stringify(updatedUsers),
      });

      alert("Sign Up Successful! Redirecting to Login...");
      navigate("/login");

    } catch (err) {
      console.error("Error during signup:", err);
      alert("Signup failed. Try again!");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center ">
        <img src={OptiAssign} alt="logo" className="w-72 h-72 mx-auto -mt-16 -mb-3" />
        <h2 className="text-xl font-sans font-semibold grid place-items-center -mt-16 mb-7">
          ALIGN | ASSIGN | ACHIEVE
        </h2>
        <h3 className="text-3xl font-sans font-semibold mb-2">CREATE YOUR ACCOUNT</h3>
      </div>



      <div className="bg-[#77CAFD] rounded-md p-8 w-[430px] mx-auto mt-6 h-auto border-2 border-black">
        <form className="grid place-items-center" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="mx-10 mb-6 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="mx-10 mb-6 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mx-10 mb-6 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="mx-10 mb-6 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mx-10 mb-6 py-1 rounded-md w-[290px] pl-3 border-2 border-black"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-[290px] rounded-md mb-6 h-[30px] pl-2 border-2 border-black"
          >
            <option value="" disabled hidden>Select Role</option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white w-[100px] mt-4 rounded-md py-1 border border-black hover:bg-green-700"
          >
            Sign Up
          </button>

          <p className="text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
