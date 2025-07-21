import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-primary-dark to-primary 
                  text-white p-4 overflow-y-auto shadow-xl">
      <SidebarItems />
    </div>
  );
};
export default Sidebar;