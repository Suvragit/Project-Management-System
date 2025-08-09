import Companyicon from '../../Assets/logo.png'

const SettingsPage = () => {
    return (
        <div>
            <img className="flex items-center w-80 mx-auto my-14" src={Companyicon} />
            <img className="flex items-center mx-auto my-20 border rounded-full border-white w-36 h-36 object-cover overflow-hidden" />
            <div className='flex items-center mx-auto my-25 border-2 rounded-xl border-black w-1/3 h-64 bg-orange-300 p-2 overflow-hidden'>
            </div>
        </div>
    )
}

export default SettingsPage;