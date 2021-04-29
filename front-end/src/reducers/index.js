import { combineReducers } from "redux";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";

// Import custom components
import productReducer from "./products";
import categoryReducer from "./category";
import cartReducer from "./cart";
import filtersReducer from "./filters";
import wishlistReducer from "./wishlist";
import compareReducer from "./compare";
import shoplistReducer from "./shoplist";
import langReducer from "./lang";
import loadingReducer from "./loading";
const rootReducer = combineReducers({
  data: productReducer,
  categoryList: categoryReducer,
  cartList: cartReducer,
  filters: filtersReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  shops: shoplistReducer,
  lang: langReducer,
  loading:loadingReducer,
  Intl,
});

export default rootReducer;
