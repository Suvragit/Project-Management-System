import CompanyIcon from "./CompanyIcon";
import LightDarkMode from "./LightDarkMode";
import ProfileSettings from "./ProfileSettings";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";

const Head = () => {
    return (
      <div className="h-14 flex w-full items-center bg-[#f4dc53] shadow-md">
        <CompanyIcon />
        <SearchBar />
        <div className="flex items-center ml-auto space-x-4 mr-4">
          <LightDarkMode />
          <ProfileSettings />
          <UserIcon />
        </div>
      </div>
    );
  };

export default Head;