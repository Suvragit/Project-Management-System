import CompanyIcon from "./CompanyIcon";
import LogOut from "./LogOut";
import ProfileSettings from "./ProfileSettings";
import SearchBar from "./SearchBar";
import UserIcon from "./UserIcon";

const Head = () => {
    return (
      <div className="h-14 flex w-full items-center bg-[#9EBD5F] shadow-md">
        <CompanyIcon />
        <SearchBar />
        <div className="flex items-center ml-auto space-x-10 mr-4">
          <ProfileSettings />
          <UserIcon />
          <LogOut />
        </div>
      </div>
    );
  };

export default Head;