import { useState } from "react"

const useTableFilter=(inputValue:string)=>{
    const [searchValue,setSearchValue]=useState(inputValue);

    return {searchValue,setSearchValue};
}

export default useTableFilter;

