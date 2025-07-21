import { useNavigate } from "react-router-dom";

const NewsCard = () => {
  const navigate = useNavigate();

  const newsItems = [
    { title: "New company policy update", time: "2 hours ago", path: "/news/1" },
    { title: "Team building event next week", time: "1 day ago", path: "/news/2" }
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">3PC News</h3>
      <div className="space-y-2">
        {newsItems.map((item, index) => (
          <div 
            key={index}
            onClick={() => navigate(item.path)}
            className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer
                      transition-colors duration-200 active:bg-gray-100"
          >
            <p className="text-sm font-medium text-gray-700">{item.title}</p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;