import InnerContainer from "./InnerContainer";
import Sidebar from "../../Component/Sidebar/Sidebar";

const MainContainer = () => {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] #00246B">
      <Sidebar />
      <InnerContainer />
    </div>
  );
};

export default MainContainer;