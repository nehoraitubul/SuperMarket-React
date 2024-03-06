import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import { Box, Button, Fade, Grid, Icon, IconButton, MenuItem, Popover, Popper, Slide, Tooltip, Typography, tooltipClasses, useMediaQuery } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch, useCategories } from "../AppContext";
import FirstImg from "./milkImg.svg";
import { CategoryExpand } from "./CategoryExpand";
import { createTheme, styled, useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



export function CategoryBar({ isMobile, closeSliders }) {

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        lg1750: 1750,
        xl: 1920,
      },
    },
  });
  const onlyBiglScreen = useMediaQuery(theme.breakpoints.up("lg1750"));
  const onlyMediumSmallScreen = useMediaQuery(theme.breakpoints.down("lg1750"));

  const categoriesState = useCategories()

  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '1000px',
      backgroundColor: "#cccccc",
    },
  });



   // State variable to manage the open category ID
   const [openCategory, setOpenCategory] = useState(null);

   // Function to handle category button click and toggle category expansion
   const handleCategoryClick = (categoryId) => {
     setOpenCategory(openCategory === categoryId ? null : categoryId);
   };

  

    // {categoriesState.categories!==null &&
    //   categoriesState.categories.map((category) => {console.log(category)} )}

    if(onlyBiglScreen && !isMobile) {
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
          <NavLink key={category.category.id} to={`products/${category.category.name.split(' ').join('-')}/?sc=${'sc2_id'}&category_id=${category.category.id}`} 
                  state={{data: {"sc2_id":category.category.id}}}
                  color='textPrimary' style={{  textDecoration: 'inherit'}} className='nav-link'>
          <Button
           onClick={(e) => e.currentTarget.blur()}
            sx={{
              fontSize: '14px',
              minHeight: '110px',
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

      
    if(onlyMediumSmallScreen && !isMobile) {
      return(
          <>
          {categoriesState.categories!==null ?
          categoriesState.categories.map((category) =>  
          <Grid item key={category.category.id} xs="1">
          <NoMaxWidthTooltip key={category.category.id} arrow sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} 
          title={<div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CategoryExpand category={category} closeSliders={closeSliders}/>
        </div>}
        TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}>
            <NavLink key={category.category.id} to={`products/${category.category.name.split(' ').join('-')}/?sc=${'sc2_id'}&category_id=${category.category.id}`} 
                  state={{data: {"sc2_id":category.category.id}}}
                  color='textPrimary' style={{  textDecoration: 'inherit'}} className='nav-link'>
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




        if (isMobile) {
          return (
            <Box dir="rtl">
              {/* Mobile layout */}
              {categoriesState.categories !== null ? (
                categoriesState.categories.map((category) => (
                  <Grid item key={category.category.id} xs="1">
                     {!openCategory && (
                    <Button
                      key={category.category.id}
                      onClick={() => handleCategoryClick(category.category.id)}
                      sx={{
                        fontSize: "16px",
                        minHeight: "90px",
                        width: "1000px",
                        flex: "1",
                        minWidth: 0,
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        color: "#777",
                        fontWeight: "bold",
                        justifyContent: "flex-start",
                      }}
                    >
                      <img
                        src={FirstImg}
                        alt="Milk"
                        style={{ marginRight: "1px", height: "20px" }}
                      />
                      {category.category.name}
                    </Button>
                    )}
                    {openCategory === category.category.id && (
                      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                        <Box sx={{position: 'fixed', top: "81px", right: 0, width: '100%', height: '95%', overflowX: "hidden"}} >
                        <IconButton onClick={() => { setOpenCategory(null) }} sx={{ marginTop: "10px" }}>
                          <ArrowForwardIcon />
                        </IconButton>
                          <CategoryExpand category={category} isMobile={isMobile} />
                        </Box>
                      </Slide>
                    )}
                  </Grid>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </Box>
          );
        }
    
}



