import CompanyIcon from "./CompanyIcon";
import LightDarkMode from "./LightDarkMode";
import ProfileSettings from "./ProfileSettings";
import SearchBar from "./SearchBar"
import UserIcon from "./UserIcon"


const Head=()=>{
    return(
        <div className=" h-14 flex w-full items-center bg-[#FFAC1C]">
            <CompanyIcon/>
            <SearchBar/>
            <LightDarkMode/>
            <ProfileSettings/>
            <UserIcon/>
        </div>

    )
}

export default Head;