import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Box, Button, Fade, Icon, MenuItem, Popover, Popper, Tooltip, Typography, tooltipClasses } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch, useCategories } from "../AppContext";
import FirstImg from "./milkImg.svg";
import { CategoryExpand } from "./CategoryExpand";
import { styled } from '@mui/material/styles';



export function CategoryBar() {

  const categoriesState = useCategories()

  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '800px',
    },
  });
  


    {categoriesState.categories!==null &&
      categoriesState.categories.map((category) => {console.log(category)} )}


    return(
        <>
        {categoriesState.categories!==null ?
        categoriesState.categories.map((category) => 
        <NoMaxWidthTooltip arrow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '1000px' }} 
        title={<div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CategoryExpand category={category}/>
      </div>} 
      TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}>
          <Button
            sx={{
              minWidth: '150px',
              backgroundColor: '#fff',
              borderRadius: '30px',
              color: '#777',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#eee',
              },
            }}> 
            <img src={FirstImg} alt="Milk" style={{ marginRight: "10px", height: "20px" }} />
            {category.category.name}
            </Button>
            </NoMaxWidthTooltip>
        )
        :
        <p>Loading...</p>
        }


        </>
    )
}
