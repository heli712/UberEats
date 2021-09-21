const initialState = {
    user:{},
    errMsg : "",
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case "LOGIN_REQUEST" :
            console.log('login req');
            return state;
        case "LOGIN_SUCCESS":
            console.log('login success');
            return { ...state, user: action.payload};
        case "LOGIN_FAILURE":
            console.log('login failure');
            return {...state, errMsg : action.payload}
        case "LOGOUT":
            return { ...state, user:null}
        default:
            return state;
    }
};

export default reducer;



/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {user:null};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state,action) => {
            state.user = action.payload;
        },
    },
});



export const {login} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
*/