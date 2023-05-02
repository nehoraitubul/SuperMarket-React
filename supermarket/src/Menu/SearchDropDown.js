import React, { useState } from 'react';
import { Box, Button, IconButton, InputBase, InputLabel, Menu, MenuItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SearchCategories } from './SearchCategories';
import { SEARCH_ACTIONS, useSearch, useSearchDispatch } from '../AppContext';


export function SearchDropDown() {

    const searchState = useSearch()
    const dispatch = useSearchDispatch()

    const [anchorEl, setAnchorEl] = useState(null);

    let open = Boolean(anchorEl);

    // let triggerOpenClick = null
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(searchState.text);
        // triggerOpenClick = true
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (category) => {
        console.log(`Selected category ID: ${category.id}`);
        console.log(searchState.category);
        // do something with the selected category ID
        handleClose();
    };

    const HandleOpenMenu = () => {
        console.log("inside HandleOpenMenu");
        // const open = Boolean(anchorEl);
        // setAnchorEl(triggerOpenClick);
    }



  return (
    <div style={{
      backgroundColor: '#ffffff',
    }}>
        {/* Desktop Preview */}
        <Box sx={{ display: { xs: 'none', md: 'inline-flex'}}}>
        <IconButton type="button" sx={{ p: '10px', }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 6, flex: 1,  width: '350px', pr: "10px" }} 
            dir='rtl' type='search'
            placeholder='חיפוש פריט, קטגוריה, מק"ט..'
            onChange={(event) => {dispatch({
                type: SEARCH_ACTIONS.TYPE_SEARCH_BAR,
                textRecieved: event.target.value,
            })}}

            // onChange={(event) => {console.log(event.target.value)}}
        />
        <Button sx={{":hover": {bgcolor: "#555"}, ml: '10px', maxHeight: "44px"}} 
            // aria-controls={open ? 'menu' : undefined}
            // aria-haspopup="true" 
            // aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disableRipple
            >
            {searchState.category}

            <ExpandMoreIcon />
        </Button>
        <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}

        >
            <SearchCategories handleMenuItemClick={handleMenuItemClick} HandleOpenMenu={HandleOpenMenu}/>
            
        </Menu>

        </Box>
        {/* Phone Preview */}
        <Box sx={{ display: { xs: 'inline-flex', md: 'none'}}}>
        <IconButton type="button" sx={{ p: '10px', }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 6, flex: 1, pr: "10px"}} 
            dir='rtl' type='search'
            placeholder='חיפוש פריט..'
        />
        </Box>

    </div>
  );
};
