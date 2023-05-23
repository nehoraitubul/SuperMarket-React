const HOSTNAME = 'http://localhost:8000/api'
// const HOSTNAME = 'http://ec2-44-211-201-85.compute-1.amazonaws.com/api'

export const ME = `${HOSTNAME}/auth/me`

export const LOGIN = `${HOSTNAME}/auth/token/`
export const REFRESH = `${HOSTNAME}/auth/token/refresh`

export const CATEGORIES = `${HOSTNAME}/categories/`

export const SEARCH_CATEGORIES = `${HOSTNAME}/search/category`

export const PRODUCT_DETAILS = `${HOSTNAME}/product/`