import {
    FETCH_CATEGORY_BEGIN,
    FETCH_SINGLE_CATEGORY,
    RECEIVE_CATEGORY
} from "../constants/ActionTypes";


const initialState = {
    category: []
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CATEGORY:
            return {
                ...state,
                category: action.category
            }; 
        default:
            return state;
    }
};
export default categoryReducer;