export function addingDetails(payload) {
    return {
        type: "ADDING_DETAILS",
        payload
    }
}

export function removingDetails() {
    return {
        type: "REMOVING_DETAILS"
    }
}