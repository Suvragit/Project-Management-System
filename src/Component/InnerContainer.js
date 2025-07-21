import StatsGrid from "./StatsGrid";
import Cards from "./Cards";
import NewsCard from "./NewsCard";

const InnerContainer = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto #00246B">
      <h1 className="text-2xl font-bold mb-6 text-grey-700">Dashboard</h1>
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Cards />
        </div>
        <div className="lg:col-span-1">
          <NewsCard />
        </div>
      </div>
    </div>
  );
};

export default InnerContainer;