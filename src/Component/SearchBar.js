

const SearchBar=()=>{
    return(
        <div className="flex-1 items-center">
            <input className="w-80 border border-black rounded-l-md p-1" type="text" placeholder="Search"/>
            <button className="border border-black rounded-r-md p-1 bg-white hover:bg-slate-600">🔍</button>
        </div>
    )
}

export default SearchBar;