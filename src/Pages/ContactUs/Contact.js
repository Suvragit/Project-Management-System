import { FaEnvelope, FaPhoneSquare, FaGlobe } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="p-6 w-full">

            <div className="mb-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    🏢 Office Address
                </h1>
                <p className="not-italic text-gray-700 mt-2 ml-6">
                    OptiAssign Pvt. Ltd.<br />
                    Sector V, Salt Lake <br />
                    Kolkata, West Bengal – 700091<br />
                    India
                </p>
            </div>


            <div className="mb-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FaEnvelope /> Email
                </h1>
                <ul className="ml-6 mt-2 text-gray-700">
                    <li>General inquiries: <strong>info@OptiAssign.com</strong></li>
                    <li>Support: <strong>support@OptiAssign.com</strong></li>
                    <li>Careers: <a href="mailto:careers@OptiAssign.com" className="text-blue-600 underline">careers@OptiAssign.com</a></li>
                </ul>
            </div>


            <div className="mb-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FaPhoneSquare /> Phone
                </h1>
                <div className="ml-6 mt-2 text-gray-700">
                    <p><a href="tel:+919876543200" className="hover:underline">+91-9876543200</a></p>
                    <p>(Monday to Friday, 9:00 AM – 6:00 PM IST)</p>
                </div>
            </div>


            <div className="mb-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FaGlobe /> Follow Us
                </h1>
                <div className="ml-6 mt-2 text-gray-700">
                    <p>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a> |
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline ml-1">Twitter</a> |
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline ml-1">Instagram</a> |
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline ml-1">Facebook</a>
                    </p>
                    <p className="mt-1">
                        <a href="https://twitter.com/JPMSOfficial" target="_blank" rel="noreferrer" className="text-blue-600 underline">@OptiAssignOfficial</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
