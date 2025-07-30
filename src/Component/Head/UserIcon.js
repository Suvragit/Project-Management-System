import Profilephoto from '../../Assets/profilephoto.jpg';

const UserIcon = () => {
    return(
        <div className='w-12 h-12 border rounded-full border-white my-2 mx-2 overflow-hidden'>
            <img 
              className="w-full h-full object-cover" 
              src={Profilephoto} 
              alt="User profile"  // Add this
            />
        </div>
    )
}
export default UserIcon;