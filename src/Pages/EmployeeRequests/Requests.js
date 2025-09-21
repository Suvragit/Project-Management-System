import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BIN_ID = "68caf85a43b1c97be9465eed";
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const name = localStorage.getItem("name");
  const projectName = localStorage.getItem("projectName");

  useEffect(() => {
    if (!name || !projectName) {
      navigate("/home");
    }
  }, [name, projectName, navigate]);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const data = await response.json();

        if (!data?.record?.requests) {
          setRequests([]);
          setLoading(false);
          return;
        }

        const filteredRequests = data.record.requests.filter(
          (req) =>
            req.handledBy === name &&
            req.projectName === projectName &&
            (req.status.toLowerCase() === "pending" || req.status.toLowerCase() === "accepted")
        );

        setRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name && projectName) fetchRequests();
  }, [name, projectName]);

  const handleAction = async (requestId, action) => {
    try {
      const resp = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await resp.json();

      const updated = data.record.requests.map((r) =>
        r.requestId === requestId ? { ...r, status: action } : r
      );

      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify({ requests: updated }),
      });

      setRequests((prev) =>
        prev.map((r) => (r.requestId === requestId ? { ...r, status: action } : r))
      );
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  return (
    <div className="flex-1 relative p-6 overflow-y-auto">
      {/* Back button relative to this content area */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            localStorage.removeItem("projectName");
            navigate("/home");
          }}
          className="border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200"
        >
          Back
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Requests for Project: <span className="text-black">{projectName}</span>
      </h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No pending or accepted requests found.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => {
            const isPending = req.status.toLowerCase() === "pending";
            const isAccepted = req.status.toLowerCase() === "accepted";

            return (
              <div
                key={req.requestId}
                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow relative bg-[#BDD292]"
              >
                <p><span className="font-semibold">Request ID:</span> {req.requestId}</p>
                <p><span className="font-semibold">User ID:</span> {req.userId}</p>
                <p><span className="font-semibold">Username:</span> {req.username}</p>
                <p><span className="font-semibold">Project Name:</span> {req.projectName}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={`font-bold ${isAccepted ? "text-green-600" : "text-yellow-600"}`}>
                    {req.status}
                  </span>
                </p>
                <p><span className="font-semibold">Handled By:</span> {req.handledBy}</p>
                <p><span className="font-semibold">Handled Role:</span> {req.handledRole}</p>

                {isPending && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleAction(req.requestId, "accepted")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req.requestId, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
