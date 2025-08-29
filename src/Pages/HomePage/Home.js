import MainContainer from "./MainContainer";
import InnerContainer from "./InnerContainer";
import Cards from "./Cards";

const Home = () => {
  // Get the logged-in user's ID from your authentication system
  // This could be from localStorage, context, or props
  const loggedInUserId = localStorage.getItem('userId') || 1; // Default to 1 if not set
  
  return (
    <MainContainer>
      <InnerContainer>
        <Cards userId={loggedInUserId} /> {/* Pass userId as prop */}
      </InnerContainer>
    </MainContainer>
  );
};

export default Home;