
export function setAllUsers(users){
    return{
        type:"SET_ALL_USERS",
        payload:users
    }
}

export function setCurrentUser(user){
    return{
        type:"SET_CURRENT_USER",
        payload:user
    }
}

