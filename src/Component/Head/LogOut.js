import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2"
      title="Logout"
    >
      <FiLogOut className="w-4 h-4" />
      <span className="text-sm">LOGOUT</span>
    </button>
  );
};

export default LogOut;