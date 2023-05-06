const initialState ={
    currentUser: null,
}

export const currentUser = (state=initialState,action)=>{
    switch(action.type){
        case "SET_CURRENT_USER":
            return{
                ...state,
                currentUser: action.payload,
            }
        default:
            return state;
    }
}
