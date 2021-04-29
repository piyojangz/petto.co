import { 
    SET_LOADING
} from "../constants/ActionTypes";


const initialState = {
    isloading: false
};

const loadingReducer = (state = initialState, action) => {   
    switch (action.type) { 
        case SET_LOADING:   
            return {
                ...state,
                isloading: action.isload
            }; 
        default:
            return state;
    }
};
export default loadingReducer;