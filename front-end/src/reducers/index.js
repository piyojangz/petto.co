import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import productReducer from './products';
import categoryReducer from './category';
import cartReducer from './cart';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import shoplistReducer from './shoplist';


const rootReducer = combineReducers({
    data: productReducer,
    categoryList: categoryReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    shops:shoplistReducer,
    Intl
});

export default rootReducer;