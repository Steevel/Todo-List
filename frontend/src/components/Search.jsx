import React, { useContext, useState } from 'react'
import SearchIcon from '../assets/searchstatus.svg'
import { TodoContext } from '../context/TodoContext'

const Search = () => {
    const [query, setQuery] = useState('')
    const { search } = useContext(TodoContext)

    const handleInput = (e) => {

        if (e.key === 'Enter') {
            search(query)
        } else {
            setQuery(e.target.value)
        }
    }

    const handleSearch = () => {
        search(query)
    }

    return (
        <div className='w-2/5 '>
            <label className="relative block">
                {/* Search input*/}
                <input className="placeholder:italic placeholder:grayshade placeholder:text-base block w-full bg-secondary rounded-full py-2 pl-9 pr-3 h-12 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-grayshade focus:ring-1 sm:text-sm" placeholder="Search Task..." type="text" name="search" defaultValue={query} onKeyUp={(e) => handleInput(e)} />
                {/* Search icon*/}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4" >
                    <img src={SearchIcon} alt="Search Icon" onClick={handleSearch} />
                </span>
            </label>
        </div>
    )
}

export default Search