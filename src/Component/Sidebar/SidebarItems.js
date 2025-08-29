import { useNavigate, useLocation } from "react-router-dom";

const SidebarItems = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path) => {
    navigate(path);
  };

  const menuItems = [
    { name: "Home", path: "/Home" },
    { name: "Projects Completed", path: "/completed" },
    { name: "Ongoing Projects", path: "/ongoing" },
    { name: "Upcoming Projects", path: "/upcoming" },
    { name: "Skillset", path: "/skillset" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Notice Board", path: "/notice" },
    { name: "Badges Earned", path: "/badges" },
    { name: "Email Notification", path: "/notifications" },
    { name: "Contact us", path: "/contact" }
  ];

  return (
    <div className="space-y-1 p-4">
      {menuItems.map((item, index) => (
        <div 
          key={index}
          onClick={() => handleItemClick(item.path)}
          className={`px-3 py-2 rounded-lg font-medium cursor-pointer
            ${
              location.pathname === item.path
                ? "bg-[#BDD292] text-white"
                : "text-black "
            }`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SidebarItems;