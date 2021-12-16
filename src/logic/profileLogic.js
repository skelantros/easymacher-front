
export const canEditGroup = (profile, group) => {
    return profile.id === group.owner || profile.role === 'admin'
}

export const canSeeGroup = (profile, group) => {
    return group.isShared || canEditGroup(profile, group)
}

export const canEditUser = (profile, user) => {
    return profile.id === user.id || profile.role === 'admin'
}