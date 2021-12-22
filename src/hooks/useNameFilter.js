import { useEffect, useState } from "react"

export const useNameFilter = (array, nameFunc, filter) => {
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if(filter === '')
            setFiltered(array)
        else
            setFiltered(array.filter(x => nameFunc(x).includes(filter)))
    }, [filter, array])

    return [filtered]
}