export function addToCart(payload){
    return{
        type: "ADD_TO_CART",
        payload
    }
}

export function removeFromCart() {
    return{
        type: "REMOVE_FROM_CART"
    }
}