import { createContext, useContext, useReducer } from "react"

// SEARCH

const SEARCH_ARGS = {
  category: "הכול",
  text: "",
  loading: false,
  errorMsg: null,
}

export const SEARCH_ACTIONS = {
  SEARCH_FETCH_START: "searchFetchStart",
  SEARCH_FETCH_SUCCESS: "searchFetchSuccess",
  SEARCH_FETCH_ERROR: "searchFetchError",
  SELECT_CAREGORY: "selectCategory",
  TYPE_SEARCH_BAR: "typeSearchBar",
  CLEAR_CATEGORY: "clearCategory",
}

function searchReducer(searchState, action) {
  switch(action.type) {

    case SEARCH_ACTIONS.SEARCH_FETCH_START: {
      return {
        ...searchState,
        loading: true,
        errorMsg: null,
      }
    }

    case SEARCH_ACTIONS.SEARCH_FETCH_SUCCESS: {
      return {
        ...searchState,
        loading: false,
        text: "",
        errorMsg: null,
      }
    }

    case SEARCH_ACTIONS.SEARCH_FETCH_ERROR: {
      return {
        ...searchState,
        loading: false,
        errorMsg: action.msg,
      }
    }

    case SEARCH_ACTIONS.SELECT_CAREGORY: {
      return {
        ...searchState,
        loading: false,
        errorMsg: null,
        category: action.selectedCategory, // !
      }
    }

    case SEARCH_ACTIONS.TYPE_SEARCH_BAR: {
      return {
        ...searchState,
        loading: false,
        errorMsg: null,
        text: action.textRecieved, // !
      }
    }

    case SEARCH_ACTIONS.CLEAR_CATEGORY: {
      return {
        ...searchState,
        category: "הכול"
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }

  }
}

const SearchContext = createContext(SEARCH_ARGS)
const SearchDispatchContext = createContext(null)

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}

  


// CATEGORIES
const CATEGORIES_ARGS = {
  categories: null,
  loading: false,
  errorMsg: null,
}

export const CATEGORIES_ACTIONS = {
  CATEGORIES_FETCH_START: "categoriesFetchStart",
  CATEGORIES_FETCH_SUCCESS: "categoriesFetchSuccess",
  CATEGORIES_FETCH_ERROR: "categoriesFetchError",
}


function categoriesReducer(categoriesState, action) {
  switch(action.type) {

    case CATEGORIES_ACTIONS.CATEGORIES_FETCH_START: {
      return {
        ...categoriesState,
        loading: true,
        errorMsg: null,
      }
    }

    case CATEGORIES_ACTIONS.CATEGORIES_FETCH_SUCCESS: {
      return {
        ...categoriesState,
        loading: false,
        errorMsg: null,
        categories: action.dataRecieved, // !
      }
    }

    case CATEGORIES_ACTIONS.CATEGORIES_FETCH_ERROR: {
      return {
        ...categoriesState,
        loading: false,
        errorMsg: action.msg,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }

    
  }}



const CategoriesContext = createContext(CATEGORIES_ARGS)
const CategoriesDispatchContext = createContext(null)


export function useCategories() {
  return useContext(CategoriesContext);
}

export function useCategoriesDispatch() {
  return useContext(CategoriesDispatchContext);
}




 // CART

 const CART_ARGS = {
  products: {},
  loading: false,
  errorMsg: null,
  empty: true,
}

export const CART_ACTIONS = {
  CART_ADD_TO_CART: "cartAddToCart",
  CART_REDUCE_QTY: "cartReduceQty",
  CART_ADD_QTY: "cartAddQty",
}


function cartReducer(cartState, action) {
  switch(action.type) {

    case CART_ACTIONS.CART_ADD_TO_CART: {
      let newProducts = {...cartState.products, [action.addedProduct]: 
        {'quantity': 1, 'img': action.productImg, 'name': action.productName, 'unit':action.productUnit } }
      return {
        ...cartState,
        loading: false,
        errorMsg: null,
        products: newProducts,
        empty: false,
      }
    }

    case CART_ACTIONS.CART_REDUCE_QTY: {
      const { addedProduct } = action;
      const currentQty = cartState.products[addedProduct]["quantity"];
      const newQty = currentQty - 1;
      let newProducts = null;
      let emptyState = false
      if (newQty == 0){
        const { [addedProduct]: _, ...restProducts } = cartState.products;
        newProducts = restProducts;
        if (newProducts === null){
          newProducts = {}
          emptyState = true
        }
      } else {
        newProducts = {...cartState.products, [action.addedProduct]: {...cartState.products[action.addedProduct], 'quantity': newQty}}
      }
      return {
        ...cartState,
        loading: false,
        errorMsg: null,
        products: newProducts,
        empty: emptyState,
      }
    }

    case CART_ACTIONS.CART_ADD_QTY: {
      const { addedProduct } = action;
      const currentQty = cartState.products[addedProduct]["quantity"];
      const newQty = currentQty + 1;
      let newProducts = {...cartState.products, [action.addedProduct]: {...cartState.products[action.addedProduct], 'quantity': newQty}}
      return {
        ...cartState,
        loading: false,
        errorMsg: null,
        products: newProducts,
        empty: false,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }

    
  }}


 const CartContext = createContext(CART_ARGS)
 const CartDispatchContext = createContext(null)


 export function useCart() {
  return useContext(CartContext);
}

 export function useCartDispatch() {
  return useContext(CartDispatchContext);
}


export function AppProvider({ children }){

  const [searchState, dispatch] = useReducer(
    searchReducer,
    SEARCH_ARGS
  )

  const [categoriesState, categoriesDispatch] = useReducer(
    categoriesReducer,
    CATEGORIES_ARGS
  )

  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    CART_ARGS
  )

  


  return(
    <CategoriesContext.Provider value={categoriesState}>
      <CategoriesDispatchContext.Provider value={categoriesDispatch}>

        <SearchContext.Provider value={searchState}>
          <SearchDispatchContext.Provider value={dispatch}>

            <CartContext.Provider value={cartState}>
              <CartDispatchContext.Provider value={cartDispatch}>

              {children}

            </CartDispatchContext.Provider> 
              </CartContext.Provider>

          </SearchDispatchContext.Provider>
        </SearchContext.Provider>

      </CategoriesDispatchContext.Provider>
    </CategoriesContext.Provider>

  )
}