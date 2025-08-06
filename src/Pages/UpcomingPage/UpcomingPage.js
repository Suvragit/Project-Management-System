import { useEffect, useState } from "react";
import jsonData from '../../Utility/Upcomingproject.json';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

const UpcomingPage = () => {
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (jsonData['upcoming project']) {
            const UpcomingProject = jsonData['upcoming project'].map(proj => ({
                name: proj['Project name'],
                info: proj['Project info'],
                skills: proj['Skills required'],
                coordinator: proj['Project coordinator'],
                members: proj['Members required'],
                duration: proj['Project duration'],
                deadline: proj['Deadline to join'],
                credit: proj['Project credit'],
            }));
            setValue(UpcomingProject);
        }
    }, []);

    return (
        <div className="w-2/3 flex-1 bg-white overflow-y-auto p-10">
            {value.length === 0 ? (
                <p className="text-center text-gray-600 mt-4">No Upcoming Projects Found.</p>
            ) : (
                value.map((project, index) => (
                    <div
                        key={index}
                        className="relative bg-[#BDD292] text-black p-6 rounded-xl mb-6 shadow-md"
                    >
                        {/* Project Content */}
                        <p><strong>Project Name:</strong> {project.name}</p>
                        <p><strong>Project Info:</strong> {project.info}</p>
                        <p><strong>Skills Required:</strong> {project.skills}</p>
                        <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
                        <p><strong>Members:</strong> {project.members}</p>
                        <p><strong>Project Duration:</strong> {project.duration}</p>
                        <p><strong>Deadline to join:</strong> {project.deadline}</p>
                        <p><strong>Project Credit:</strong> {project.credit}</p>

                        {/* Icon Buttons - Bottom Right */}
                        <div className="absolute bottom-4 right-4 flex gap-3">
                            <button className="p-1">
                                <FiUpload size={28} />
                            </button>

                            {/* Star with Black Border */}
                            <button className="relative w-8 h-8 flex items-center justify-center">
 
                                <AiOutlineStar className="text-black w-full h-full" />
                                <AiFillStar className="text-yellow-300 w-5/6 h-5/6 absolute" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default UpcomingPage;
