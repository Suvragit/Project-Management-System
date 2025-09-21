import { Link } from "react-router-dom";
import Companyicon from '../../Assets/logo.png';

const CompanyIcon = () => {
  return (
    <div className="flex-1 items-start">
      <Link to="/home">
        <img
          className="h-9 w-auto mr-56 mx-2 my-2 cursor-pointer"
          src={Companyicon}
          alt="Company Logo"
        />
      </Link>
    </div>
  );
};

export default CompanyIcon;
