import { createSlice } from '@reduxjs/toolkit';

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

export default detailsSlice.reducer;