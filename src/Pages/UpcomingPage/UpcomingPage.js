import { useEffect, useState } from "react";
import jsonData from '../../Utility/Upcomingproject.json';

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
                        className="bg-[#BDD292] text-black p-6 rounded-xl mb-6 shadow-md"
                    >
                        <p><strong>Project Name:</strong> {project.name}</p>
                        <p><strong>Project Info:</strong> {project.info}</p>
                        <p><strong>Skills Required:</strong> {project.skills}</p>
                        <p><strong>Project Coordinator:</strong> {project.coordinator}</p>
                        <p><strong>Members:</strong> {project.members}</p>
                        <p><strong>Project Duration:</strong> {project.duration}</p>
                        <p><strong>Deadline to join:</strong> {project.deadline}</p>
                        <p><strong>Project Credit:</strong> {project.credit}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default UpcomingPage;
