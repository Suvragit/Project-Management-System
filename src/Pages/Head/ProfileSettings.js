import Settingsicon from "../../Assets/settingsicon.png";
import { Link } from "react-router-dom";

const ProfileSettings=()=>{
    return(
        <Link to="/Home/Settings">
        <button className="w-10 h-10 mx-12 my-2 border rounded-full bg-white "><img src={Settingsicon}/></button>
        </Link>
    )
}
export default ProfileSettings;