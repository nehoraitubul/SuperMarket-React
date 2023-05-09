import { Box, Button, Fade, Grid, Popper, Typography, createMuiTheme } from "@mui/material";
import { useEffect } from "react";
import { useCategories } from "../AppContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI"',
    ],
  },
});



export function CategoryExpand({category}) {

    
    return (
      <>
      <Grid container direction="row" alignItems="flex-start" justifyContent="flex-end">
      {category.sub_sub_categories.map((subCategory) => (
        
        <Grid item xs={category.sub_sub_categories.length === 1 ? 12 : category.sub_sub_categories.length <= 4 ? 6 : 4} 
        >
        <Box dir="rtl">
        {/* {console.log('dffdf', category.sub_sub_categories)} */}


          <ThemeProvider theme={theme}>
          <NavLink key={subCategory.id} to={`products/${subCategory.name.split(' ').join('-')}/`} state={{data: {"sc3_id":subCategory.id}}}
            style={{ fontSize: '25px' ,color: 'inherit', textDecoration: 'inherit'}} 
            className='nav-link'>
            <Typography color={'red'} fontSize='1rem' mt={1}>{subCategory.name}</Typography>
          </NavLink>
          </ThemeProvider>

          <div style={{ display: "flex" , flexDirection: 'column'}}>
            {subCategory.sub_sub_sub_categories.map(subSubCategory => (

              <div style={{ display: "inline-block", marginRight: "10px" }}>

                <NavLink key={subSubCategory.id} to={`products/${subSubCategory.name.split(' ').join('-')}/`} 
                  state={{data: {"sc4_id":subSubCategory.id}}}
                  color='textPrimary' style={{ fontSize: '15px' ,color: 'inherit', textDecoration: 'inherit'}} className='nav-link'>
                
                <Typography color={'white'}>{subSubCategory.name}</Typography>
                </NavLink>
              </div>

            ))}
          </div>
        </Box>
        </Grid>
      ))}

      
      </Grid>

    </>
    );
}