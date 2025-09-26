import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X_MASTER_KEY, USERS_BIN_ID } from "D:/PMS/pms_react/pms/src/Utility/Constant.js"; 

const BIN_ID = USERS_BIN_ID;
const MASTER_KEY = X_MASTER_KEY;
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const SettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email'); 
    if (!storedEmail) {
      navigate('/login'); 
      return;
    }
    fetchUserByEmail(storedEmail);
  }, [navigate]);

  const fetchUserByEmail = async (email) => {
    try {
      const res = await fetch(JSONBIN_URL, {
        headers: { 'X-Master-Key': MASTER_KEY }
      });
      const data = await res.json();
      const users = data.record;

      const foundUser = users.find(u => u.email === email);
      if (foundUser) setUser(foundUser);
      else setMessage('User not found');
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch user data');
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }

    if (currentPassword !== user.password) {
      setMessage("Current password is incorrect!");
      return;
    }

    try {
      const res = await fetch(JSONBIN_URL, { headers: { 'X-Master-Key': MASTER_KEY } });
      const data = await res.json();
      const users = data.record;

      const index = users.findIndex(u => u.id.toString() === user.id.toString());
      users[index].password = newPassword;

      const updateRes = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': MASTER_KEY,
          'X-Bin-Versioning': 'false'
        },
        body: JSON.stringify(users)
      });

      if (updateRes.ok) {
        setMessage('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage('Failed to update password');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6 relative">
       <h1 className="absolute top-6  text-3xl font-bold  text-gray-800">Change Password</h1>
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 right-6 border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200"
      >
        Back
      </button>

    
      <div className="bg-white shadow-md rounded-2xl p-8 mt-48 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {user && (
            <h2 className="text-2xl font-semibold text-gray-800">
                {user.username} (ID: {user.id})
            </h2>
          )}
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="mt-6 w-full border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200"
        >
          Update Password
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
