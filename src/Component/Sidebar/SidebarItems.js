import { useNavigate } from "react-router-dom";

const SidebarItems = () => {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      title: "PROJECTS",
      items: [
        { name: "Completed Projects", path: "/completed" },
        { name: "Ongoing Projects", path: "/ongoing" },
        { name: "Upcoming Projects", path: "/upcoming" }
      ]
    },
    {
      title: "PERSONAL",
      items: [
        { name: "Wishlist", path: "/wishlist" },
        { name: "Notice Board", path: "/notice" },
        { name: "Badges Earned", path: "/badges" }
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { name: "Email Notification", path: "/notifications" },
        { name: "Contact Us", path: "/contact" }
      ]
    }
  ];

  return (
    <div className="space-y-6 p-4">
      {menuItems.map((section, index) => (
        <div key={index}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-black">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li 
              key={idx}
              onClick={() => handleItemClick(item.path)}
              className="px-3 py-2 rounded-lg hover:bg-[#D1ECF1] text-[#5A9CA0] hover:text-[black] 
                        font-medium cursor-pointer"
            >
              {item.name}
            </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SidebarItems;