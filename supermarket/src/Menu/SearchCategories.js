import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch } from "../AppContext";



export function SearchCategories({ handleMenuItemClick, HandleOpenMenu }) {

    const searchState = useSearch()
    const dispatch = useSearchDispatch()

    const [categories, setCategories] = useState([]);


    const getCategories = async () => {
        const response = await axios.get(CATEGORIES)
        if(response.status === 200){
            const allCategories = response.data
            console.log("allCategories", allCategories);
            const categoryNames = allCategories.map((item) => item);
            setCategories(categoryNames)
            HandleOpenMenu()
        }
    };


    useEffect(() => {
        getCategories()
    }, []);

    
    return(
        <>
        <MenuItem key={"all"} sx={{fontSize:10, pt:'2px', pb:'2px'}} 
                                                    dir='rtl' disableRipple onClick={() => {dispatch({
                                                        type: SEARCH_ACTIONS.CLEAR_CATEGORY,
                                                        selectedCategory: "הכול"
                                                    })
                                                    handleMenuItemClick({id: 999, category:"הכול"})
                                                }
                                                }>
                                            הכול
                                     </MenuItem >
        {categories.length > 0 &&
        categories.map((category) => <MenuItem key={category.id} sx={{fontSize:10, pt:'2px', pb:'2px'}} 
                                                    dir='rtl' disableRipple onClick={() => {dispatch({
                                                        type: SEARCH_ACTIONS.SELECT_CAREGORY,
                                                        selectedCategory: category.name
                                                    })
                                                    handleMenuItemClick(category)
                                                    }
                                                }>
                                            {category.name}
                                     </MenuItem >)}
        </>
// handleMenuItemClick(category)

    )

}