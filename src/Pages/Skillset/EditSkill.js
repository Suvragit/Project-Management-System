const EditSkill = () => {

    return (
        <div className="w-2/3 bg-white overflow-y-auto p-10">
            
            <div className="flex justify-center ">
                <input
                    type="text"
                    placeholder="Enter a skill"
                    className="w-full max-w-md h-10 p-2 border border-black rounded-l-md"
                />
                <button className="h-10 border border-black rounded-r-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200">
                    ADD
                </button>
            </div>
            <h1 className="mt-48 text-2xl font-bold"> ADD CERTIFICATES </h1>

            <div className="flex flex-col justify-center items-center border-2 border-black rounded-md w-auto h-80 mt-6 mx-auto">
                <h1 className="text-xl font-bold mb-8"> UPLOAD CERTIFICATES </h1>
                <input
                    type="file"
                    className="mb-4"
                />
                <button className="h-10 border border-black rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-400 hover:text-black transition-colors duration-200">
                    UPLOAD
                </button>
            </div>
        </div>
    );
}

export default EditSkill;
