import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const StatsGrid = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/data/stats.json');
        const data = await response.json();
        setStatsData(data);
      } catch (error) {
        console.error("Error loading stats data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardTemplates = [
    { 
      title: "Projects Completed",
      key: "projectsCompleted",
      path: "/completed" 
    },
    { 
      title: "Credits Achieved", 
      key: "creditsAchieved",
      path: "/credits" 
    },
    { 
      title: "Ongoing Projects",
      key: "ongoingProjects",
      path: "/ongoing" 
    },
    { 
      title: "Days In Bench",
      key: "daysInBench",
      subtitleKey: "annualBenchDays",
      footer: "Days Left",
      path: "/bench" 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cardTemplates.map((template, index) => {
        const cardData = statsData.find(item => item.key === template.key);
        const subtitleData = template.subtitleKey 
          ? statsData.find(item => item.key === template.subtitleKey)
          : null;

        return (
          <div 
            key={index}
            className="bg-[#D1ECF1] rounded-xl shadow-md p-6 h-48 flex flex-col items-center justify-center
                      hover:shadow-lg transition-all cursor-pointer"
            onClick={() => navigate(template.path)}
          >
            <h3 className="text-lg font-bold text-center mb-2">{template.title}</h3>
            <p className="text-4xl font-bold text-[#5A9CA0] mb-2">
              {cardData?.value || ""}
            </p>
            {template.subtitleKey && (
              <p className="text-sm text-gray-500 text-center">
                ({subtitleData?.value || ""} days Annually)
              </p>
            )}
            {template.footer && (
              <p className="text-sm font-medium text-[#5A9CA0] mt-2 text-center">
                {template.footer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;