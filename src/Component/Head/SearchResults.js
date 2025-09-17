import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const BIN_ID = "689a1f7e43b1c97be91be549";
const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`; // fixed template string

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) ?? "";
}

const SearchResults = () => {
  const [query] = useState(() => getQueryParam("name").trim());
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchAndFind = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(JSONBIN_URL, {
          headers: {
            "X-Master-Key": MASTER_KEY,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`); // fixed template string
        const data = await res.json();
        const record = data.record ?? data;
        const upcoming = record["upcoming project"] ?? [];

        const found = upcoming.find((p) =>
          (p["Project name"] || "").toLowerCase().includes(query.toLowerCase())
        );

        setProject(found || null);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFind();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto my-5 p-5 font-sans">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-black">Search Results</h1>
        <Link
          to="/home"
          className="text-black text-sm cursor-pointer bg-transparent hover:underline"
        >
          ← Home
        </Link>
      </div>

      {loading && <div className="text-black mt-4">Loading project details…</div>}
      {err && <div className="text-black font-semibold mt-4">Error: {err}</div>}

      {!loading && !err && (
        <>
          {!query ? (
            <div className="text-black mt-4">
              No search query provided. Use the search bar and click 🔍.
            </div>
          ) : project ? (
            <div className="bg-[#BDD292] p-6 rounded-xl mb-6 shadow-md mt-4 text-black">
              <h2 className="text-xl font-extrabold mb-4">{project["Project name"]}</h2>
              <p className="mb-4">{project["Project info"]}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-md p-3 border border-gray-300 text-black">
                  <strong>Skills Required:</strong> <div>{project["Skills required"]}</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-gray-300 text-black">
                  <strong>Coordinator:</strong> <div>{project["Project coordinator"]}</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-gray-300 text-black">
                  <strong>Members Required:</strong> <div>{project["Members required"]}</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-gray-300 text-black">
                  <strong>Duration:</strong> <div>{project["Project duration"]}</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-gray-300 text-black">
                  <strong>Deadline:</strong> <div>{project["Deadline to join"]}</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-gray-300 text-black">
                  <strong>Credit:</strong> <div>{project["Project credit"]}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 rounded-lg bg-red-300 border border-red-700 text-black font-bold">
              Project not found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
