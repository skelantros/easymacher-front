import { useEffect, useState } from "react"
import { editUser, getUserById } from "../API/users"
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

    const updateUser = async (username = null, firstName = null, lastName = null, errorCallback) => {
        const request = t => editUser(t, user.id, username, null, firstName, lastName).catch((e) => errorCallback(e.response.data))
        const newUser = await makeRequest(request)
        setUser(newUser)
    }

    const removeUser = async () => {
        // TODO
    }

    const getGroups = async () => {
        return await makeRequest(t => getWordGroupsByOwner(t, id))
    }

    return [user, isUserLoading, isUserError, groups, isGroupsLoading, updateUser, removeUser]
}