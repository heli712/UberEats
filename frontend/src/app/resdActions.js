export function addingResturant(payload) {
    return {
        type: "ADDING_RESTURANT",
        payload
    }
}

export function removingResturant() {
    return {
        type: "REMOVING_RESTURANT"
    }
}