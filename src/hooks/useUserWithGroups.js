import { useEffect, useState } from "react"
import { editUser, getUserById, removeUser as removeUserFromDb } from "../API/users"
import { getWordGroupsByOwner } from "../API/wordGroups"
import { useBoolFetching } from "./useBoolFetching"
import { useTokenRequest } from "./useTokenRequest"

export const useUserWithGroups = (id) => {
    const [user, setUser] = useState({})
    const [groups, setGroups] = useState([])
    const [makeRequest] = useTokenRequest()

    const [fetchUser, isUserLoading, isUserError] = useBoolFetching(async () => {
        const userData = await makeRequest(t => getUserById(t, id))
        setUser(userData)
    })

    const [fetchGroups, isGroupsLoading, isGroupsError] = useBoolFetching(async () => {
        const groupsData = await makeRequest(t => getWordGroupsByOwner(t, id))
        setGroups(groupsData)
    })

    useEffect(() => {
        fetchUser()
        fetchGroups()
    }, [])

    const updateUser = async (username = null, firstName = null, lastName = null) => {
        const request = t => editUser(t, user.id, username, null, firstName, lastName)
        const newUser = await makeRequest(request)
        setUser(newUser)
    }

    const removeUser = async () => {
        const request = t => removeUserFromDb(t, id)
        await makeRequest(request)
    }

    return [user, isUserLoading, isUserError, groups, isGroupsLoading, updateUser, removeUser]
}