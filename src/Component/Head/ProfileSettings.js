import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

const ProfileSettings = () => {
    return (
        <Link to="/Home/Settings">
            <button 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                title="Settings"
            >
                <FiSettings className="w-8 h-8 text-green-800" />
            </button>
        </Link>
    )
}
export default ProfileSettings;