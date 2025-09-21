import React, { useEffect, useState } from "react";

const BIN_ID = "689a1f61d0ea881f4056ccf5";
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const UserIcon = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const selectedEmail = localStorage.getItem("email");
      if (!selectedEmail) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: {
            "X-Master-Key": MASTER_KEY,
          },
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const json = await res.json();
        // JSON structure: the array is at json.record
        const users = Array.isArray(json.record) ? json.record : [];

        const employee = users.find((u) => u.email === selectedEmail);

        if (employee) {
          setPhoto(employee.image || "");
          setName(employee.name || "");
        } else {
          // no matching user found
          setPhoto("");
          setName("");
        }
      } catch (err) {
        console.error("Error fetching user icon:", err);
        setPhoto("");
        setName("");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // derive initials for fallback
  const initials = (nameStr) => {
    if (!nameStr) return "U";
    return nameStr
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  // on image error -> fallback to initials
  const handleImgError = (e) => {
    e.currentTarget.style.display = "none";
    setPhoto("");
  };

  if (loading) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-sm text-gray-600">...</span>
      </div>
    );
  }

  return (
    <>
      {photo ? (
        <div className="w-12 h-12 rounded-full overflow-hidden border border-white my-2 mx-2">
          <img
            src={photo}
            alt={name ? `${name} profile` : "User profile"}
            className="w-full h-full object-cover"
            onError={handleImgError}
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-500 text-white font-semibold my-2 mx-2 border border-white">
          <span>{initials(name)}</span>
        </div>
      )}
    </>
  );
};

export default UserIcon;
