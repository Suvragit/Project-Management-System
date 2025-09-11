import Cards from "./Cards";
import AdminCards from "./AdminCards";

const InnerContainer = () => {
  const loginType = localStorage.getItem("role");
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#9EBD5F]"></h1>
      <div className="grid grid-cols-1  gap-6">
        <div className="lg:col-span-2">
          {loginType === "Admin" ? <AdminCards /> : <Cards />}
          
        </div>
      </div>
    </div>
  );
};

export default InnerContainer;
