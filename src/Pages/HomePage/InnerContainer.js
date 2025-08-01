import Cards from "./Cards";

const InnerContainer = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#5A9CA0]">Dashboard</h1>
      <div className="grid grid-cols-1  gap-6">
        <div className="lg:col-span-2">
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default InnerContainer;
