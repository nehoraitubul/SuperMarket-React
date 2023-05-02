import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Button, MenuItem } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch } from "../AppContext";



export function CategoryBar() {

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
        }
    };


    useEffect(() => {
        getCategories()
    }, []);


    return(
        <>
        {categories.length > 0 ?
        categories.map((category) => <Button>{category.name}</Button>)
        :
        <p>Loading...</p>
        }
        
        </>
    )
}
