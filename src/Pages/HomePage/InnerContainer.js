import { Routes, Route } from "react-router-dom";
import Cards from "./Cards";
import AdminCards from "./AdminCards";
import AdminUpcomingPage from "./AdminUpcomingPage"; 

const InnerContainer = () => {
  const loginType = localStorage.getItem("role");
  
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white">
      <div className="grid grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <Routes>
            <Route 
              path="/" 
              element={loginType === "Admin" ? <AdminCards /> : <Cards />} 
            />
            <Route 
              path="/add" 
              element={loginType === "Admin" ? <AdminUpcomingPage /> : <Cards />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default InnerContainer;