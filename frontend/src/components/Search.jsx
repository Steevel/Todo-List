import React, { useContext, useState } from "react";
import SearchIcon from "../assets/searchstatus.svg";
import LogoutIcon from "../assets/power.svg";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { search, getTodos } = useContext(TodoContext);
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleInput = (e) => {
        if (e.key === "Enter") {
            if (query !== "") {
                handleSearch();
            } else {
                getTodos();
            }
        } else {
            setQuery(e.target.value);
        }
    };

    const handleSearch = () => {
        if (query.trim() !== "") {
            search(query);
        }
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="flex flex-row justify-between items-center">
            <div className="w-2/5 ">
                <label className="relative block">
                    {/* Search input*/}
                    <input
                        className="placeholder:italic placeholder:grayshade placeholder:text-base block w-full bg-secondary rounded-full py-2 pl-4 pr-3 h-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-grayshade focus:ring-1 sm:text-sm"
                        placeholder="Search Todo/Task..."
                        type="text"
                        name="search"
                        defaultValue={query}
                        onKeyUp={(e) => handleInput(e)}
                    />
                    {/* Search icon*/}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <img src={SearchIcon} alt="Search Icon" onClick={handleSearch} />
                    </span>
                </label>
            </div>
            {/* <button
                className="border-1 py-1 my-1 px-4 rounded-lg bg-btntextcolor text-white"
                onClick={logoutUser}
            >
                Log Out
            </button> */}
            <img className="bg-secondary hover:bg-[#FEE2E2] rounded-full w-9 h-9 p-1" src={LogoutIcon} alt="Search Icon" onClick={logoutUser} />
        </div>
    );
};

export default Search;
