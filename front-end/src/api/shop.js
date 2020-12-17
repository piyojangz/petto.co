/**
 * Mocking client-server processing
 */
import _products from './data.json'
import _category from './category.json'
import _shoplist from './shoplist.json'
const TIMEOUT = 100

export default {
    getShop: (cb, timeout) => setTimeout(() => cb(_category), timeout || TIMEOUT),
    getCategory: (cb, timeout) => setTimeout(() => cb(_category), timeout || TIMEOUT),
    getShoplist: (cb, timeout) => setTimeout(() => cb(_shoplist), timeout || TIMEOUT),
    getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
