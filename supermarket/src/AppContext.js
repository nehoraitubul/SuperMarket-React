import { createContext, useContext, useReducer } from "react"

export const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  };

  const PARTIAL_SEARCH = {
    selectedCategoryId: null
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_SELECTED_CATEGORY':
        return {
          selectedCategoryId: action.payload
        };
      default:
        return state;
    }
  }


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
      console.log("SELECT_CAREGORY")
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
      console.log("CLEAR_CATEGORY")
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

  


const SettingsThemeContext = createContext(themes.dark)

export function AppProvider({ children }){

  const [searchState, dispatch] = useReducer(
    searchReducer,
    SEARCH_ARGS
  )


  return(
      // <SettingsThemeContext.Provider>
      <SearchContext.Provider value={searchState}>
        <SearchDispatchContext.Provider value={dispatch}>
          {children}
        </SearchDispatchContext.Provider>
      </SearchContext.Provider>
      // </SettingsThemeContext.Provider>
  )
}