import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import { Box, Button, Fade, Grid, Icon, MenuItem, Popover, Popper, Tooltip, Typography, tooltipClasses, useMediaQuery } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch, useCategories } from "../AppContext";
import FirstImg from "./milkImg.svg";
import { CategoryExpand } from "./CategoryExpand";
import { styled, useTheme } from '@mui/material/styles';



export function CategoryBar() {

  const theme = useTheme();
  const onlyBiglScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const onlyMediumSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const categoriesState = useCategories()

  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '1000px',
      backgroundColor: "#cccccc",
    },
  });

  

    // {categoriesState.categories!==null &&
    //   categoriesState.categories.map((category) => {console.log(category)} )}

    if(onlyBiglScreen) {
    return(
        <>
        {categoriesState.categories!==null ?
        categoriesState.categories.map((category) =>  
        <Grid item key={category.category.id} xs="1">
        <NoMaxWidthTooltip key={category.category.id} arrow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',}} 
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
              flex: '1',
              minWidth: 0,
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
            </Grid>
        )
        :
        <p>Loading...</p>
        }


        </>
    )
      }

      
    if(onlyMediumSmallScreen) {
      return(
          <>
          {categoriesState.categories!==null ?
          categoriesState.categories.map((category) =>  
          <Grid item key={category.category.id} xs="1">
          <NoMaxWidthTooltip key={category.category.id} arrow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} 
          title={<div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CategoryExpand category={category}/>
        </div>}
        TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}>
            <NavLink key={category.category.id} to={`products/${category.category.name.split(' ').join('-')}/`} 
                    state={{data: {"sc2_id":category.category.id}}}
                    color='textPrimary'  style={{  textDecoration: 'inherit'}} className='nav-link'>
            <Button
              onClick={(e) => e.currentTarget.blur()}
              sx={{
                fontSize: "11px",
                minHeight: '90px',
                flex: '1',
                minWidth: 0,
                backgroundColor: '#fff',
                borderRadius: '30px',
                color: '#777',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#eee',
                },
              }}> 
              <img src={FirstImg} alt="Milk" style={{ marginRight: "1px", height: "20px" }} />
              {category.category.name}
              </Button>
              </NavLink>
              </NoMaxWidthTooltip>
              </Grid>
          )
          :
          <p>Loading...</p>
          }
  
  
          </>
      )
        }

    
}



