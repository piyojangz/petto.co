/**
 * Mocking client-server processing
 */
import _products from './data.json'
import _category from './category.json'
const TIMEOUT = 100

export default {
    getCategory: (cb, timeout) => setTimeout(() => cb(_category), timeout || TIMEOUT),
    getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
