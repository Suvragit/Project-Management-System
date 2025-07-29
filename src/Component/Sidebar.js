import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <div className="w-1/6 text-white p-4 overflow-y-auto shadow-[5px_0_15px_-3px_rgba(0,0,0,0.2)] z-20">
      <SidebarItems />
    </div>
  );
};
export default Sidebar;