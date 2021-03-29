import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREMENT_QTY,
    DECREMENT_QTY
} from "../constants/ActionTypes";


export default function cartReducer(state = {
    cart: []
}, action) {
    // console.log('action.type',action.type)
    switch (action.type) { 
        case ADD_TO_CART:
            const productId = action.product.id 
            if (state.cart.findIndex(product => product.id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => { 
                    if (product.id === productId) {
                        cartAcc.push({ ...product, qty: product.qty + 1, sum: (parseFloat(product.discount) > 0 ? parseFloat(product.discount) : parseFloat(product.price)) * (product.qty + 1) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            } 
            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (parseFloat(action.product.discount) > 0 ? parseFloat(action.product.discount) : parseFloat(action.product.price)) * action.qty }] }

        case DECREMENT_QTY:

            if (state.cart.findIndex(product => product.id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === action.productId && product.qty > 1) {
                        cartAcc.push({ ...product, qty: product.qty - 1, sum: (parseFloat(product.discount) > 0 ? parseFloat(product.discount) : parseFloat(product.price))* (product.qty - 1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (parseFloat(action.product.discount) > 0 ? parseFloat(action.product.discount) : parseFloat(action.product.price)) * action.qty }] }

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item.id !== action.product_id.id)
            }

        default:
    }
    return state;
}
