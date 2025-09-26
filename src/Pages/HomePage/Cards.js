import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { X_MASTER_KEY,USERS_BIN_ID} from "D:/PMS/pms_react/pms/src/Utility/Constant.js";

const USER_BIN_ID = USERS_BIN_ID;  
const MASTER_KEY = X_MASTER_KEY;

const Cards = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projectsCompleted: 0,
    creditsAchieved: 0,
    ongoingProjects: 0,
    daysInBench: 0,
    annualBenchDays: 60
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          console.error('No user ID found in localStorage');
          setLoading(false);
          return;
        }

      
        const response = await fetch(`https://api.jsonbin.io/v3/b/${USER_BIN_ID}`, {
          headers: {
            'X-Master-Key': MASTER_KEY
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        const users = data.record;
        
        
        const currentUser = users.find(user => user.id.toString() === userId.toString());
        
        if (currentUser) {
          
          const completedProjects = currentUser['completed project'] || [];
          const ongoingProjects = currentUser['ongoing project'] || [];
          
          const completedCount = completedProjects.length;
          const ongoingCount = ongoingProjects.length;
          
          
          const totalCredits = completedProjects.reduce((sum, project) => {
            return sum + (project['Project Credit'] || 0);
          }, 0);
          
          
          const benchDays = parseInt(currentUser.bench) || 0;
          const daysLeft = 60 - benchDays;
          
          setStats({
            projectsCompleted: completedCount,
            creditsAchieved: totalCredits,
            ongoingProjects: ongoingCount,
            daysInBench: benchDays,
            annualBenchDays: 60,
            daysLeft: daysLeft
          });
        } else {
          console.error('User not found with ID:', userId);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const cardTemplates = [
    { 
      title: "Projects Completed",
      key: "projectsCompleted",
      path: "/completed" 
    },
    { 
      title: "Credits Achieved", 
      key: "creditsAchieved"
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
      footerKey: "daysLeft"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cardTemplates.map((template, index) => (
          <div 
            key={index}
            className="bg-[#BDD292] rounded-xl shadow-md p-6 h-48 flex flex-col items-center justify-center"
          >
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cardTemplates.map((template, index) => {
        const value = stats[template.key];
        const subtitle = template.subtitleKey ? stats[template.subtitleKey] : null;
        const footer = template.footerKey ? stats[template.footerKey] : null;

        return (
          <div 
            key={index}
            className="bg-[#BDD292] rounded-xl shadow-md p-6 h-48 flex flex-col items-center justify-center
                      hover:shadow-lg transition-all cursor-pointer"
            onClick={() => navigate(template.path)}
          >
            <h3 className="text-lg font-bold text-center mb-2">{template.title}</h3>
            <p className="text-4xl font-bold text-[#000000] mb-2">
              {value}
            </p>
            {subtitle !== null && (
              <p className="text-sm text-black text-center">
                ({subtitle} days Annually)
              </p>
            )}
            {footer !== null && (
              <p className="text-sm font-medium text-red-500 mt-2 text-center">
                {footer} Days Left
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;