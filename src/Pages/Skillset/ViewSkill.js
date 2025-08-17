import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewSkill = () => {
  const [val, setVal] = useState([]);
  const [loading, setLoading] = useState(true);

  const BIN_ID = "689a1f61d0ea881f4056ccf5"; 
  const MASTER_KEY = "$2a$10$s/5LWeaJ3ZnHZupGV3N.V.FQEuqtCPQeuUgpX9DePVQMEIo4WC5YS";

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const selectedEmail = localStorage.getItem("email");

        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          method: "GET",
          headers: {
            "X-Master-Key": MASTER_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from JSONBin");
        }

        const data = await response.json();
        const employees = data.record; // ensure JSON structure matches

        if (selectedEmail) {
          const employee = employees.find(emp => emp.email === selectedEmail);
          if (employee) {
            setVal(employee.skills || []);
          }
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">
      <div className="flex flex-1 justify-end">
        <Link to="/skillset/addskills">
          <button className="border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200">
            ADD SKILL
          </button>
        </Link>
      </div>

      <div className="bg-[#c2d697] rounded-3xl p-6 shadow-md my-10">
        <h1 className="font-bold text-xl underline text-center">Skillset</h1>

        {loading ? (
          <p className="text-center mt-4">Loading skills...</p>
        ) : val.length > 0 ? (
          <ul className="mt-4 space-y-2 list-disc list-inside">
            {val.map((skill, index) => (
              <li key={index} className="font-bold">
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-4">No skills found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewSkill;
