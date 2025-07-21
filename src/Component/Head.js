import CompanyIcon from "./CompanyIcon";
import LightDarkMode from "./LightDarkMode";
import ProfileSettings from "./ProfileSettings";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";

const Head = () => {
    return (
      <div className="h-14 flex w-full items-center bg-primary shadow-md">
        <CompanyIcon />
        <SearchBar />
        <div className="flex items-center ml-auto space-x-4 mr-4">
          <div className="text-sm bg-white text-primary-dark px-3 py-1 rounded-full font-medium">
            Hazard
          </div>
          <div className="text-sm bg-white text-primary-dark px-3 py-1 rounded-full font-medium">
            33°C
          </div>
          <LightDarkMode />
          <ProfileSettings />
          <UserIcon />
        </div>
      </div>
    );
  };

export default Head;