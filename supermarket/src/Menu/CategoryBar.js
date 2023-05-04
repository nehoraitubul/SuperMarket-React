import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Button, Icon, MenuItem } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch } from "../AppContext";
import FirstImg from "./milkImg.svg";



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
        categories.map((category) => <Button sx={{
            marginLeft: 0,
            minWidth: '150px',
            backgroundColor: '#fff',
            borderRadius: '30px',
            color: '#777',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#eee',
            },
            '& .MuiButton-startIcon': {
              marginRight: '10px',
            },
          }}> <img src={FirstImg} alt="Milk" style={{ marginRight: "10px", height: "20px" }} />
          {category.name}</Button>)
        :
        <p>Loading...</p>
        }
        
        </>
    )
}
