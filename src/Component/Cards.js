import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  const progressItems = [
    { label: "Projects Completed:", value: "12", path: "/completed" },
    { label: "Ongoing Projects:", value: "3", path: "/ongoing" },
    { label: "Credits Achieved:", value: "45", path: "/credits" },
    { label: "Days in Bench (Annually):", value: "15", path: "/bench" }
  ];

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary-500
                hover:shadow-lg transition-shadow duration-300"
    >
     <h2 className="text-xl font-bold mb-4 text-gray-800">Progress Overview</h2>
      <div className="space-y-3">
        {progressItems.map((item, index) => (
          <div 
            key={index}
            onClick={() => navigate(item.path)}
            className="flex justify-between items-center p-2 rounded-lg
                      hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          >
            <span className="text-gray-1000">{item.label}</span>
            <span className="font-bold text-primary-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;