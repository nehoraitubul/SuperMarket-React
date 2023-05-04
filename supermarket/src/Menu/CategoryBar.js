import axios from "axios"
import { CATEGORIES } from "../URLS"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Box, Button, Fade, Icon, MenuItem, Popper, Tooltip } from "@mui/material";
import { SEARCH_ACTIONS, useSearch, useSearchDispatch, useCategories } from "../AppContext";
import FirstImg from "./milkImg.svg";
import { CategoryExpand } from "./CategoryExpand";



export function CategoryBar() {

  const categoriesState = useCategories()

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;



    {categoriesState.categories!==null &&
      categoriesState.categories.map((category) => {console.log(category.category.name)} )}


    return(
        <>
        {categoriesState.categories!==null ?
        categoriesState.categories.map((category) => 
          <Button 
          onClick={handleClick}
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
)
        :
        <p>Loading...</p>
        }
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              The content of the Popper.
            </Box>
          </Fade>
        )}
      </Popper>
        
        </>
    )
}
