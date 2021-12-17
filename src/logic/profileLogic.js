
export const canEditGroup = (profile, group) => {
    return profile.id === group.owner || isAdmin(profile)
}

export const canSeeGroup = (profile, group) => {
    return group.isShared || canEditGroup(profile, group)
}

export const canEditUser = (profile, user) => {
    return profile.id === user.id || isAdmin(profile)
}

export const isAdmin = (profile) => {
    return profile.role === 'admin'
}