import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom";
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
  

    // {categoriesState.categories!==null &&
    //   categoriesState.categories.map((category) => {console.log(category)} )}


    return(
        <>
        {categoriesState.categories!==null ?
        categoriesState.categories.map((category) =>  
        <NoMaxWidthTooltip key={category.category.id} arrow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '1000px' }} 
        title={<div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CategoryExpand category={category}/>
      </div>}
      TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}>
          <NavLink key={category.category.id} to={`products/${category.category.name.split(' ').join('-')}/`} 
                  state={{data: {"sc2_id":category.category.id}}}
                  color='textPrimary' style={{  textDecoration: 'inherit'}} className='nav-link'>
          <Button
           onClick={(e) => e.currentTarget.blur()}
            sx={{
              minHeight: '61px',
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
            </NavLink>
            </NoMaxWidthTooltip>
        )
        :
        <p>Loading...</p>
        }


        </>
    )
}
