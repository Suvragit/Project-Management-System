import MainContainer from "./MainContainer";
import InnerContainer from "./InnerContainer";
import Cards from "./Cards";

const Home = () => {
  
  const loggedInUserId = localStorage.getItem('userId') || 1; 
  
  return (
    <MainContainer>
      <InnerContainer>
        <Cards userId={loggedInUserId} />
      </InnerContainer>
    </MainContainer>
  );
};

export default Home;