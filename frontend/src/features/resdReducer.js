const initialState = {
    restDetails : {},
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case "ADDING_RESTURANT" :
            console.log('adding details');
            return { ...state, restDetails: action.payload};
        case "REMOVING_RESTURANT":
            return { ...state, restDetails: null} 
        default:
            return state;
    }
};

export default reducer;