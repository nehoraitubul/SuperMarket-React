// const HOSTNAME = 'http://localhost:8000/api'
const HOSTNAME = 'http://ec2-13-48-123-33.eu-north-1.compute.amazonaws.com:8000/api'

export const ME = `${HOSTNAME}/auth/me`

export const SIGNUP = `${HOSTNAME}/auth/signup/`
export const LOGIN = `${HOSTNAME}/auth/token/`
export const REFRESH = `${HOSTNAME}/auth/token/refresh`

export const CATEGORIES = `${HOSTNAME}/categories/`

export const SEARCH_CATEGORIES = `${HOSTNAME}/search/category`

export const PRODUCT_DETAILS = `${HOSTNAME}/product/`

export const MAIN_PAGE_PRODUCTS = `${HOSTNAME}/main/`