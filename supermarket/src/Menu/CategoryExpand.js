import { Box, Button, Fade, Grid, IconButton, Popper, Slide, Typography, createMuiTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useCategories } from "../AppContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




export function CategoryExpand({category, isMobile, closeSliders}) {

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleSubCategoryClick = (subCategoryId) => {
    setSelectedSubCategory(selectedSubCategory === subCategoryId ? null : subCategoryId);
  };

    if(!isMobile){
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


  if(isMobile){
    return (
      <>
      <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start">
      {category.sub_sub_categories.map((subCategory) => (
        <Grid item key={subCategory.id} xs={1}>
          {!selectedSubCategory && (
          <Box sx={{ 
            backgroundColor: "white", 
            borderRadius: '10px', 
            mb: 1,
            width: "1000px",
            minHeight: "70px",
          }}>
          <NavLink
            onClick={() => handleSubCategoryClick(subCategory.id)}
            to={`products/${subCategory.name.split(' ').join('-')}/?sc=${'sc3_id'}&category_id=${subCategory.id}`}
            style={{ textDecoration: 'inherit', color: '#777', minWidth: '100%' }}
            className='nav-link'
          >
              <Typography fontWeight={'bold'} fontSize='1rem' sx={{mr: "10px", color: "#777" }}>{subCategory.name}</Typography>
            </NavLink>
            </Box>
            )} 
            {selectedSubCategory === subCategory.id && (
            <Slide direction="left" in={selectedSubCategory === subCategory.id} mountOnEnter unmountOnExit>

            <Box sx={{ position: 'fixed', top: "81px", right: 0, width: '100%', height: '100%', }}>
            <IconButton onClick={() => { setSelectedSubCategory(null) }} sx={{ marginTop: "10px" }}>
              <ArrowForwardIcon />
            </IconButton>
              {subCategory.sub_sub_sub_categories.map(subSubCategory => (
                <NavLink
                  key={subSubCategory.id}
                  to={`products/${subSubCategory.name.split(' ').join('-')}/?sc=${'sc4_id'}&category_id=${subSubCategory.id}`}
                  style={{textDecoration: 'none', }}
                  className='nav-link'
                  onClick={{closeSliders}}
                >
                  <Typography sx={{
                    backgroundColor: "white", 
                    borderRadius: '10px', 
                    mb: 1,
                    minWidth: 0,
                    fontSize: "1rem",
                    minHeight: "70px",
                    flex: "1",
                    color: "#777",
                    fontWeight: "bold",
                    justifyContent: "flex-start",
                    mr: "10px",
                    mt: 1}}
                  >
                    {subSubCategory.name}
                  </Typography>
                </NavLink>
              ))}
            </Box>
            </Slide>
            )}
          
           
        </Grid>
      ))}
    </Grid>

    </>
    );
                
}



}