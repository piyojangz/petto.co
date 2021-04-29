import { 
    SET_LANGUAGE
} from "../constants/ActionTypes";


const initialState = {
    trans: {}
};

const langReducer = (state = initialState, action) => {   
    switch (action.type) { 
        case SET_LANGUAGE:   
            return {
                ...state,
                trans: action.jsonlang
            }; 
        default:
            return state;
    }
};
export default langReducer;