import {
    FETCH_CATEGORY_BEGIN,
    FETCH_SINGLE_CATEGORY,
    RECEIVE_SHOPLIST
} from "../constants/ActionTypes";


const initialState = {
    shoplist: []
};

const shoplistReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SHOPLIST:
            return {
                ...state,
                shoplist: action.shoplist
            }; 
        default:
            return state;
    }
};
export default shoplistReducer;