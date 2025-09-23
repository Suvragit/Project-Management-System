import { useEffect, useState } from "react";

const REQUESTS_BIN_ID = "68caf85a43b1c97be9465eed"; // Requests bin
const MASTER_KEY =
  "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

const EmailNotification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); // must be stored on login

  useEffect(() => {
    const fetchRequests = async () => {
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

        // Only keep requests for the logged-in user & exclude pending
        const userRequests = allRequests.filter(
          (req) =>
            req.userId === Number(userId) &&
            req.status?.trim().toLowerCase() !== "pending"
        );

        setRequests(userRequests);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start p-6 pt-20">
      {/* Added pt-20 to push content down from top */}

      {loading ? (
        <p className="text-black">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-black">No notifications available.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {requests.map((req, index) => (
            <div
              key={index}
              className="bg-[#BDD292] text-black p-4 rounded-xl shadow-md"
            >
              <p>
                <strong>Project Name:</strong> {req.projectName}
              </p>
              <p>
                <strong>Project Coordinator:</strong> {req.handledBy}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    req.status?.toLowerCase() === "accepted"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {req.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailNotification;
