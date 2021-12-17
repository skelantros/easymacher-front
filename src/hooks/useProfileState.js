import { useEffect, useState } from "react"
import { getProfile } from "../API/users"
import { useFetching } from "./useFetching"
import { useTokenRequest } from "./useTokenRequest"

export const useProfileState = () => {
    const [profile, setProfile] = useState({})
    const [makeRequest] = useTokenRequest()
    const [fetch, isLoading, setError] = useFetching(async () => {
        const profData = await makeRequest(getProfile)
        setProfile(profData)
    })

    useEffect(() => {
        fetch()
    }, [])

    return [profile, isLoading]
}