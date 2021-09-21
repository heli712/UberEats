const initialState = {
    userDetails : {},
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case "ADDING_DETAILS" :
            console.log('adding details');
            return { ...state, userDetails: action.payload};
        case "REMOVING_DETAILS":
            return { ...state, userDetails: null} 
        default:
            return state;
    }
};

export default reducer;
/*import { createSlice } from '@reduxjs/toolkit';

export const detailsSlice = createSlice({
    name: "details",
    initialState: {
        details: null,
    },
    reducers: {
        addingDetails: (state, action) => {
            state.details = action.payload;
        },
        removingDetails : (state) => {
            state.details = null;
        },
    },
});

export const { addingDetails, removingDetails } = detailsSlice.actions;

export const selectDetails = (state) => state.details.details;

export default detailsSlice.reducer;*/