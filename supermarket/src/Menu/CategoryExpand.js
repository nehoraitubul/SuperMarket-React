import { Box, Button, Fade, Grid, Popper, Typography, createMuiTheme } from "@mui/material";
import { useEffect } from "react";
import { useCategories } from "../AppContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';





export function CategoryExpand({category}) {

    
    return (
      <>
      <Grid container dir={"rtl"} direction="row" alignItems="flex-start" justifyContent="flex-start">
      {category.sub_sub_categories.map((subCategory) => (
        
        <Grid item xs={category.sub_sub_categories.length === 1 ? 12 : category.sub_sub_categories.length <= 4 ? 6 : 4}>
        <Box key={subCategory.id} dir="rtl" sx={{backgroundColor: "white", ml: 1, borderRadius: '10px'}}>
          
          <NavLink onClick={(e) => e.currentTarget.blur()} key={subCategory.id} to={`products/${subCategory.name.split(' ').join('-')}/?sc=${'sc3_id'}&category_id=${subCategory.id}`} state={{data: {"sc3_id":subCategory.id}}}
            style={{ fontSize: '25px' ,color: 'inherit', textDecoration: 'inherit'}} 
            className='nav-link'>
            <Typography fontWeight={'bold'} fontSize='1rem' mt={1} sx={{mr: "10px", color: "#333333"}}>{subCategory.name}</Typography>
          </NavLink>
          

          <div style={{ display: "flex" , flexDirection: 'column'}}>
            {subCategory.sub_sub_sub_categories.map(subSubCategory => (

              <div key={subSubCategory.id} style={{ display: "inline-block", marginRight: "10px" }}>

                <NavLink onClick={(e) => e.currentTarget.blur()} key={subSubCategory.id} to={`products/${subSubCategory.name.split(' ').join('-')}/?sc=${'sc4_id'}&category_id=${subSubCategory.id}`} 
                  state={{data: {"sc4_id":subSubCategory.id}}}
                  style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    borderRadius: '3px',
                    padding: '6px 12px',
                    backgroundColor: '#ffffff',
                    color: '#555555',
                    fontSize: '15px',
                    marginBottom: 3,
                    transition: 'background-color 0.5s, color 0.5s',
                  }} 
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#626262";
                    e.target.style.color = "#f4f4f4";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.color = "#555555";
                  }}
                  className='nav-link'>
                
                <Typography >{subSubCategory.name}</Typography>
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