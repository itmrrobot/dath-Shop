import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

function FilterProvider({children}) {
    const [filterId,setFilterId] = useState([]);
    const [searchContent,setSearchContent] = useState('');
    return (
        <FilterContext.Provider value={{filterId,setFilterId,searchContent,setSearchContent}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterProvider;

export const FilterState = () => {
    return useContext(FilterContext);
}