import StatsCard from "./StatsCard";
import { useNavigate } from "react-router-dom";

const StatsGrid = () => {
  const navigate = useNavigate();

  const cards = [
    { 
      title: "Projects Completed", 
      value: "03",
      onClick: () => navigate('/completed')
    },
    { 
      title: "Credits Achieved", 
      value: "12",
      onClick: () => navigate('/credits')
    },
    { 
      title: "Ongoing Projects", 
      value: "02",
      onClick: () => navigate('/ongoing')
    },
    { 
      title: "Days In Bench", 
      value: "07", 
      subtitle: "53 days Annually",
      footer: "Days Left",
      onClick: () => navigate('/bench')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          footer={card.footer}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
};

export default StatsGrid;