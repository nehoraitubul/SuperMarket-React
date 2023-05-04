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




export function AppProvider({ children }){

  const [searchState, dispatch] = useReducer(
    searchReducer,
    SEARCH_ARGS
  )

  const [categoriesState, categoriesDispatch] = useReducer(
    categoriesReducer,
    CATEGORIES_ARGS
  )

  


  return(
    <CategoriesContext.Provider value={categoriesState}>
      <CategoriesDispatchContext.Provider value={categoriesDispatch}>

        <SearchContext.Provider value={searchState}>
          <SearchDispatchContext.Provider value={dispatch}>

            {children}

          </SearchDispatchContext.Provider>
        </SearchContext.Provider>

      </CategoriesDispatchContext.Provider>
    </CategoriesContext.Provider>

  )
}